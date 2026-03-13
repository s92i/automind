"use client";

import { testWorkflow } from "@/actions/workflow/test-workflow";
import { nodeTypes } from "@/components/dashboard/workflows/custom-node";
import {
  buildInitialFlow,
  EDGE_STYLE,
  reindexStepNumber,
  TOOL_NODES,
} from "@/components/dashboard/workflows/flow-utils";
import NodeConfigurationModal from "@/components/dashboard/workflows/node-configuration-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/hooks/useUser";
import { useWorkflowRun } from "@/hooks/useWorkflowRun";
import { mockTemplates } from "@/lib/mock";
import { Play, Save } from "lucide-react";
import { useParams } from "next/navigation";
import {
  DragEvent,
  MouseEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  Node,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { toast } from "sonner";

const linkEdges = (sourceId: string, newId: string, eds: any[]) => {
  const outgoing = eds.filter((e) => e.source === sourceId);
  const remaining = eds.filter((e) => e.source !== sourceId);
  const edgeToNew = {
    id: `edge-${sourceId}-${newId}-${Date.now()}`,
    source: sourceId,
    target: newId,
    sourceHandle: "right",
    targetHandle: "left",
    animated: true,
    style: EDGE_STYLE,
  };
  const newToTargets = outgoing.map((e) => ({
    id: `edge-${newId}-${e.target}-${Date.now()}`,
    source: newId,
    target: e.target,
    sourceHandle: "right",
    targetHandle: "left",
    animated: true,
    style: EDGE_STYLE,
  }));
  return [...remaining, edgeToNew, ...newToTargets];
};

const findProviderMeta = (label: string) => {
  const category = TOOL_NODES?.find((cat) =>
    cat.items?.some((i) => i.name === label),
  );
  const item = category?.items?.find((i) => i.name === label);

  return {
    category: category?.category ?? "custom",
    item,
    providerId: item?.id ?? null,
  };
};

const renderKVGrid = (pairs: Array<[string, ReactNode]>) => (
  <div className="grid grid-cols-2 gap-3 text-sm">
    {pairs?.map(([k, v]) => (
      <div key={k}>
        <div className="text-gray-400">{k}</div>
        <div className="text-white font-medium">{v}</div>
      </div>
    ))}
  </div>
);

const Page = () => {
  const params = useParams();
  const slug = params.slug as string;
  const { user } = useUser();
  const { runSequence, runningStepNumber, isRunning, stop } = useWorkflowRun();

  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [template, setTemplate] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalNodeData, setModalNodeData] = useState<any>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [nodeErrors, setNodeErrors] = useState<Record<string, string | null>>(
    {},
  );
  const [configuredSteps, setConfiguredSteps] = useState<
    Record<number, boolean>
  >({});
  const [userConnections, setUserConnections] = useState<any[]>([]);
  const [connLoading, setConnLoading] = useState(false);

  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const nodesWithRunning = nodes?.map((n) => ({
    ...n,
    data: {
      ...(n.data as any),
      isRunning: Number(
        (n.data as any)?.stepNumber === Number(runningStepNumber ?? -1),
      ),
      hasError: Boolean(nodeErrors[n.id]),
    },
  }));

  const handleNodesChange = useCallback(
    (changes: any) => {
      onNodesChange(changes);
      setNodes((nds) => reindexStepNumber(nds, edges));
    },
    [onNodesChange, setNodes, edges],
  );

  const onDragStart = useCallback((event: DragEvent, nodeType: any) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(nodeType),
    );
    event.dataTransfer.effectAllowed = "move";
  }, []);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setConnLoading(true);
        const res = await fetch("/api/connections/get-user-connections");
        if (!res.ok) return;
        const data = await res.json();
        if (mounted) setUserConnections(data.connections ?? []);
      } catch {
      } finally {
        if (mounted) setConnLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const allNodesConfigured = useCallback(() => {
    const configured = new Set(Object.keys(configuredSteps).map(Number));
    return nodes
      .filter((n) => typeof (n.data as any)?.stepNumber === "number")
      .every((n) => configured.has((n.data as any).stepNumber));
  }, [nodes, configuredSteps]);

  const buildWorkflowData = useCallback(() => {
    return {
      templateId: slug,
      name: template?.name || slug,
      description: template?.description || "",
      nodes: nodes.map((n) => ({
        id: n.id,
        type: typeof n.type === "string" ? n.type : "custom",
        position: { x: Number(n.position.x), y: Number(n.position.y) },
        data: {
          label: (n.data as any)?.label ?? "",
          description: (n.data as any)?.description ?? "",
          icon: (n.data as any)?.icon ?? "",
          stepNumber: Number((n.data as any)?.stepNumber ?? 0),
          isConfigured: Boolean((n.data as any)?.isConfigured),
          config: (n.data as any)?.config ?? null,
        },
      })),
      edges: edges.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        sourceHandle: e.sourceHandle ?? null,
        targetHandle: e.targetHandle ?? null,
      })),
    };
  }, [slug, template, nodes, edges]);

  const handleTestWorkflow = useCallback(async () => {
    if (isRunning) return;

    const workflowData = buildWorkflowData();

    if (!allNodesConfigured()) {
      const missingSteps = nodes
        .filter((n) => typeof (n.data as any)?.stepNumber === "number")
        .filter((n) => !configuredSteps[(n.data as any).stepNumber])
        .map((n) => (n.data as any).stepNumber);
      toast.error(
        `Please configure all nodes before testing. Missing steps: ${missingSteps}`,
      );
      return;
    }

    try {
      setNodeErrors({});
      const serverRun = testWorkflow({ workflowData, user });
      runSequence(workflowData.nodes, workflowData.edges, { delayMs: 800 });

      const result = await serverRun;

      if (
        result &&
        result.ok &&
        "steps" in result &&
        Array.isArray(result.steps)
      ) {
        const errMap: Record<string, string | null> = {};
        for (const s of result.steps) {
          if (s?.status === "error") {
            errMap[s.nodeId] = s.error || "Step failed";
          }
        }
        setNodeErrors(errMap);
      } else if (result && !result.ok && "error" in result) {
        toast.error(result.error || "Workflow run failed");
      }
      stop();
      toast.success("Workflow is working");
    } catch (err) {
      toast.error("Failed to test workflow");
      console.error(err);
    }
  }, [
    buildWorkflowData,
    user,
    runSequence,
    stop,
    allNodesConfigured,
    nodes,
    configuredSteps,
  ]);

  const handleSaveWorkflow = useCallback(async () => {}, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const nodeData = JSON.parse(
        event.dataTransfer.getData("application/reactflow"),
      );
      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });
      const newId = `${nodeData.id}-${Date.now()}`;

      setNodes((nds) => {
        const selectedStep = (selectedNode?.data as any)?.stepNumber ?? null;
        const currentStepCount = nds.reduce(
          (count, n) =>
            typeof (n.data as any)?.stepNumber === "number" ? count + 1 : count,
          0,
        );
        const insertionStep =
          selectedStep !== null ? selectedStep + 1 : currentStepCount + 1;

        const shifted = nds.map((n) => {
          const sn = (n.data as any)?.stepNumber;
          return typeof sn === "number" && sn >= insertionStep
            ? { ...n, data: { ...n.data, stepNumber: sn + 1 } }
            : n;
        });

        const newNode = {
          id: newId,
          type: "custom",
          position,
          data: {
            label: nodeData.name,
            description: nodeData.description,
            icon: nodeData.icon,
            stepNumber: insertionStep,
            isConfigured: false,
            config: null,
          },
        };

        return reindexStepNumber(shifted.concat(newNode), edges);
      });

      if (selectedNode) {
        setEdges((eds) => {
          const newEdges = linkEdges(selectedNode.id, newId, eds);
          setNodes((nds) => reindexStepNumber(nds, newEdges));
          return newEdges;
        });
      }
    },
    [reactFlowInstance, selectedNode, edges, setEdges, setNodes],
  );

  const onConnect = useCallback(
    (params: Connection) => {
      const edgeId = `edge-${params.source}-${params.target}-${Date.now()}`;
      setEdges((eds) =>
        addEdge(
          { ...params, id: edgeId, animated: true, style: EDGE_STYLE },
          eds,
        ),
      );
    },
    [setEdges],
  );

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onNodeClick = useCallback((event: MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const openModal = useCallback((nodeData: any) => {
    setModalNodeData(nodeData);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setModalNodeData(null);
  }, []);

  const onNodeDoubleClick = useCallback(
    (event: MouseEvent, node: Node) => {
      openModal(node.data);
    },
    [openModal],
  );

  const markStepConfigured = useCallback((stepNumber: number, config: any) => {
    setNodes((prev) =>
      prev.map((n) => {
        const sn = Number((n.data as any)?.stepNumber);
        if (sn === stepNumber) {
          return {
            ...n,
            data: {
              ...(n.data as any),
              isConfigured: true,
              config: config ?? (n.data as any)?.config ?? null,
            },
          };
        }
        return n;
      }),
    );
    setConfiguredSteps((prev) => ({ ...prev, [stepNumber]: true }));
  }, []);

  useEffect(() => {
    if (selectedNode) {
      const updated = nodes.find((n) => n.id === selectedNode.id);
      if (
        updated &&
        Boolean((updated.data as any)?.isConfigured) !==
          Boolean((selectedNode.data as any)?.isConfigured)
      ) {
        setSelectedNode(updated);
      }
    }
  }, [nodes, selectedNode]);

  useEffect(() => {
    const foundTemplate = mockTemplates.find((t) => t.id === slug);
    if (!foundTemplate) return;

    setTemplate(foundTemplate);

    const { nodes: initialNodes, edges: initialEdges } = buildInitialFlow(
      foundTemplate,
      configuredSteps,
    );

    setNodes(reindexStepNumber(initialNodes, initialEdges));
    setEdges(initialEdges);
  }, [slug]);

  return (
    <div className="flex h-full">
      <div className="flex-1 p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Edit Template: {template?.name || slug}
            </h1>
            <p className="text-gray-400">
              {template?.description ||
                "Design your workflow by connecting nodes"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {isRunning && (
              <Badge
                variant="outline"
                className="border-green-400 text-green-400"
              >
                Running step: {runningStepNumber ?? "-"}
              </Badge>
            )}
            {[
              {
                icon: Play,
                text: "Test",
                variant: "outline",
                onClick: handleTestWorkflow,
              },
              {
                icon: Save,
                text: "Save",
                variant: "default",
                onClick: handleSaveWorkflow,
              },
            ].map(({ icon: Icon, text, variant, onClick }) => (
              <Button
                key={text}
                variant={variant as any}
                disabled={text === "Test" && isRunning}
                className={
                  variant === "outline"
                    ? "border-[#334155] text-gray-300 hover:bg-[#1E293B] hover:text-white"
                    : "bg-green-500 hover:bg-green-600 text-black font-medium"
                }
                onClick={onClick}
              >
                <Icon className="w-4 h-4 mr-2" />
                {text}
              </Button>
            ))}
          </div>
        </div>
        <Card className="bg-[#121826] border-[#1E293B] flex-1 relative">
          <CardContent className="p-0 h-full">
            <div ref={reactFlowWrapper} className="h-full w-full">
              <ReactFlow
                nodes={nodesWithRunning}
                edges={edges}
                onNodesChange={handleNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onNodeClick={onNodeClick}
                onNodeDoubleClick={onNodeDoubleClick}
                nodeTypes={nodeTypes}
                fitView
                attributionPosition="bottom-right"
                className="bg-[#0B0F14]"
              >
                <Background color="#334155" gap={16} />
                <Controls className="bg-[#1E293B] border-[#334155] text-gray-300" />
              </ReactFlow>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-80 border-l border-[#1E293B] p-4 overflow-y-auto">
        <Tabs defaultValue="nodes">
          <TabsList className="w-full bg-[#0B0F14] mb-4">
            <TabsTrigger
              value="nodes"
              className="flex-1 data-[state=active]:bg-[#1E293B] data-[state=active]:text-green-400 cursor-pointer"
            >
              Nodes
            </TabsTrigger>
            <TabsTrigger
              value="properties"
              className="flex-1 data-[state=active]:bg-[#1E293B] data-[state=active]:text-green-400 cursor-pointer"
            >
              Properties
            </TabsTrigger>
          </TabsList>
          <TabsContent value="nodes" className="space-y-4">
            {TOOL_NODES.map((category) => (
              <div key={category.id}>
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-2">
                  {category.category}
                </h3>
                <div className="space-y-2">
                  {category.items.map((node) => (
                    <div
                      key={node.id}
                      className="flex items-center p-2 rounded-md hover:bg-[#1E293B] cursor-grab transition-colors"
                      draggable
                      onDragStart={(event) => onDragStart(event, node)}
                    >
                      <div className="w-8 h-8 rounded-md bg-[#1E293B] flex items-center justify-center mr-3">
                        <node.icon className="w-4 h-4 text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {node.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {node.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="properties">
            {selectedNode ? (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">
                  Node Properties
                </h3>
                <p className="text-gray-400">Details for the selected node</p>
                {(() => {
                  const d = selectedNode.data as any;
                  const label = d?.label ?? "";
                  const stepNumber = d?.stepNumber ?? null;
                  const { category: type, providerId } =
                    findProviderMeta(label);

                  const isConfigured =
                    typeof stepNumber === "number"
                      ? !!configuredSteps[Number(stepNumber)]
                      : false;

                  const accounts = providerId
                    ? userConnections?.filter((c) => c.platform === providerId)
                    : [];

                  const info = [
                    ["Name", label || "-"],
                    ["Step", stepNumber ?? "_"],
                    ["Type", type],
                    ["Configured", isConfigured ? "Yes" : "No"],
                  ] as Array<[string, ReactNode]>;

                  const accountsContent = connLoading ? (
                    <div className="text-gray-500 text-sm">
                      Loading accounts...
                    </div>
                  ) : providerId ? (
                    accounts?.length > 0 ? (
                      <ul className="space-y-2">
                        {accounts?.map((acc) => (
                          <li
                            key={acc.id}
                            className="flex items-center justify-between bg-[#1E293B] rounded-md p-2 border border-[#334155]"
                          >
                            <span className="text-sm text-gray-200">
                              {acc.account_name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {acc.platform}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-gray-500 text-sm">
                        No accounts connected for "{providerId}"
                      </div>
                    )
                  ) : (
                    <div className="text-gray-500 text-sm">
                      This node doesn't require an external account
                    </div>
                  );

                  return (
                    <div className="space-y-3">
                      {renderKVGrid(info)}
                      <div className="pt-2">
                        <div className="text-gray-400 mb-1">
                          Connected Accounts
                        </div>
                        {accountsContent}
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">
                  Select a node to view its properties
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      <NodeConfigurationModal
        onConfigured={markStepConfigured}
        isOpen={isModalOpen}
        onClose={closeModal}
        nodeData={modalNodeData}
      />
    </div>
  );
};

export default Page;
