type NodeType = 'init' | 'action' | 'condition' | 'end';
export interface WFNode {
  name: string;
  type: NodeType;
  parent?: WFNode | null;
  children?: WFNode[];
}
