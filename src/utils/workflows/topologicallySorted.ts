import type { WorkflowEdge, WorkflowNode } from "./types";

export function topologicallySorted(
  nodes: WorkflowNode[],
  edges: WorkflowEdge[],
): WorkflowNode[] {
  const inDegree = new Map<string, number>();

  const adj = new Map<string, string[]>();

  for (const n of nodes) {
    inDegree.set(n.id, 0);
    adj.set(n.id, []);
  }

  for (const e of edges) {
    if (!adj.has(e.source)) adj.set(e.source, []);

    adj.get(e.source)!.push(e.target);

    inDegree.set(e.target, (inDegree.get(e.target) || 0) + 1);
  }

  const queue: string[] = [];
  for (const [id, deg] of inDegree.entries()) {
    if (deg === 0) queue.push(id);
  }

  const order: string[] = [];

  while (queue.length) {
    const id = queue.shift()!;

    order.push(id);

    for (const nxt of adj.get(id) || []) {
      const d = (inDegree.get(nxt) || 0) - 1;
      inDegree.set(nxt, d);
      if (d === 0) queue.push(nxt);
    }
  }

  if (order.length !== nodes.length) {
    const remaining = nodes
      .map((n) => n.id)
      .filter((id) => !order.includes(id));
    order.push(...remaining);
  }

  const byId = new Map(nodes.map((n) => [n.id, n]));
  return order.map((id) => byId.get(id)!).filter(Boolean);
}
