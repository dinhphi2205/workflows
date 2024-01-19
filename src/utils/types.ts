type NodeType = 'init' | 'action' | 'condition' | 'end';
export interface WFNode {
  name: string;
  type: NodeType;
  children?: WFNode[];
}
