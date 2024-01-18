export interface WFNode {
  name: string;
  type: 'init' | 'action' | 'condition' | 'end';
  children?: WFNode[];
}
