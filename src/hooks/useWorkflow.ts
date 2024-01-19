import {useState} from 'react';
import {WFNode} from '../utils/types';

export const useWorkFlow = () => {
  const [nodes, setNodes] = useState<WFNode[]>([
    {name: 'Eve', type: 'init', parent: null},
  ]);

  const addNode = (node: WFNode, parent: WFNode) => {
    setNodes(wfnodes => [...wfnodes, {...node, parent}]);
  };
  const deleteNode = (node: WFNode) => {
    const filters = nodes.filter(
      wfnode => wfnode.name !== node.name || wfnode.parent?.name !== node.name,
    );
    setNodes(filters);
  };
  const updateName = (node: WFNode, newName: string) => {
    const results = nodes.map(wfNode => {
      const newNode = wfNode;
      if (wfNode.name === node.name) {
        newNode.name = newName;
      }
      if (wfNode.parent?.name === node.name) {
        newNode.parent!.name = newName;
      }
      return newNode;
    });

    setNodes(results);
  };

  return {nodes, addNode, updateName, deleteNode};
};
