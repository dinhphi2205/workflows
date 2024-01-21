import {useState} from 'react';
import {WFNode, WorkFlow} from '../utils/types';
import {useDispatch} from 'react-redux';
import {
  saveNewWorkflow,
  saveCurrentWorkFlow,
  deleteWorkFlow,
} from '../redux/workflowSlices';
import {Alert} from 'react-native';
import {texts} from '../i18n';
import {useNavigation} from '@react-navigation/native';

export const useWorkFlow = (currentWF?: WorkFlow) => {
  const dispatch = useDispatch();
  const navgation = useNavigation();
  const [nodes, setNodes] = useState<WFNode[]>(
    currentWF ? currentWF.nodes : [{name: 'Init', type: 'init', parent: null}],
  );

  const addNode = (node: WFNode) => {
    setNodes(wfnodes => [...wfnodes, node]);
  };
  const deleteNode = (node: WFNode) => {
    const filters = nodes.filter(
      wfnode => wfnode.name !== node.name && wfnode.parent?.name !== node.name,
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
    if (
      nodes.filter(node => node.type === 'condition').length > 0 &&
      nodes.filter(node => node.type === 'action').length > 0
    ) {
      if (currentWF?.name) {
        dispatch(saveCurrentWorkFlow({name: currentWF?.name, nodes}));
      } else {
        dispatch(saveNewWorkflow(nodes));
      }
      Alert.alert(texts.saveSuccess);
      navgation.goBack();
    } else {
      Alert.alert(texts.saveError, texts.errorMissingAction);
    }
  };
  const deleteWorkflow = () => {
    if (currentWF) {
      Alert.alert('', texts.deleteWFQuestion, [
        {
          text: texts.cancel,
          style: 'cancel',
        },
        {
          text: texts.yes,
          style: 'destructive',
          onPress: () => {
            dispatch(deleteWorkFlow(currentWF));
            Alert.alert(texts.deleteSuccess);
            navgation.goBack();
          },
        },
      ]);
    } else {
      Alert.alert(texts.deleteError, texts.genericError);
    }
  };

  return {
    nodes,
    addNode,
    updateName,
    deleteNode,
    saveWorkflow,
    deleteWorkflow,
  };
};
