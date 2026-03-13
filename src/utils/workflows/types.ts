export type WorkflowNode = {
  id: string;
  data?: {
    label?: string;
    stepNumber?: number;
    isConfigured?: boolean;
    config?: any;
  };
};

export type WorkflowEdge = {
  id: string;
  source: string;
  target: string;
};
