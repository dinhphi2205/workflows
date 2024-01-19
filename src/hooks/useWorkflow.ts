import {useState} from 'react';
import {WFNode, WorkFlow} from '../utils/types';
import {useDispatch} from 'react-redux';
import {assignCurrentWF} from '../redux/workflowSlices';

export const useWorkFlow = (currentWF?: WorkFlow) => {
  const dispatch = useDispatch();
  const [nodes, setNodes] = useState<WFNode[]>(
    currentWF ? currentWF.nodes : [{name: 'Init', type: 'init', parent: null}],
  );

  const addNode = (node: WFNode) => {
    setNodes(wfnodes => [...wfnodes, node]);
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
  const saveWorkflow = () => {
    if (currentWF?.name) {
      dispatch(assignCurrentWF({name: currentWF?.name, nodes}));
    } else {
      dispatch(assignCurrentWF({name: '1', nodes}));
    }
  };

  return {nodes, addNode, updateName, deleteNode, saveWorkflow};
};
