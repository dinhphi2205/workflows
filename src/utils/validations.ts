import {Alert} from 'react-native';
import {WFNode} from './types';
import {texts} from '../i18n';

export const isValidNode = (
  node: WFNode,
  allNodes: WFNode[],
  currentNode?: WFNode,
) => {
  if (node.name.trim() === '') {
    Alert.alert(texts.oops, texts.emptyNodeName);
    return false;
  }
  if (
    allNodes.filter(
      item =>
        item.name.toLowerCase() === node.name.toLowerCase() &&
        item.name.toLowerCase() !== currentNode?.name.toLocaleLowerCase(),
    ).length > 0
  ) {
    Alert.alert(texts.oops, texts.validateNodeName);
    return false;
  }
  if ((node.type !== 'action' && node.type !== 'condition') || !node.parent) {
    Alert.alert(texts.oops, texts.validateNodeInfo);
    return false;
  }

  return true;
};
