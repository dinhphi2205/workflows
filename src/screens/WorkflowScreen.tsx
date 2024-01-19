import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import ActionSheet from 'react-native-actionsheet';
import {AppStackParamList} from '../navigation';
import {Svg} from 'react-native-svg';
import * as d3 from 'd3';
import {
  SVGHeight,
  SVGWidth,
  graphHeight,
  graphWidth,
  renderLinks,
  renderNodes,
} from '../components/Charts/renderComponents';
import {WFNode} from '../utils/types';
import {texts} from '../i18n';
import {themes} from '../themes';
import {ActionSheetAction} from '../utils/constants';
import {Alert, Modal} from 'react-native';
import {Text} from '../components/core';
import { NodeModal } from '../components/modals';

type Props = NativeStackNavigationProp<AppStackParamList, 'WorkflowScreen'>;

export const WorkflowScreen = () => {
  const actionSheet = useRef<ActionSheet>(null);
  const [currentNode, setCurrentNode] =
    useState<d3.HierarchyPointNode<WFNode> | null>(null);
  const [showModal, setShowModal] = useState(false);
  const data: WFNode = {
    name: 'Init',
    type: 'init',
    children: [
      {name: 'Action 1', type: 'action'},
      {
        name: 'Condition 1',
        type: 'condition',
        children: [
          {name: 'Action 2', type: 'action'},
          {name: 'Action 3', type: 'action'},
        ],
      },
      {name: 'Abel', type: 'action'},
      {
        name: 'Awan',
        type: 'condition',
        children: [{name: 'Enoch', type: 'action'}],
      },
      {name: 'Azura', type: 'action'},
    ],
  };
  const treeMap = d3.tree().size([graphWidth, graphHeight]);
  const root = d3.hierarchy<WFNode>(data);

  const treeData = treeMap(root);
  let maxDepth = 0;
  treeData.each(node => {
    maxDepth = Math.max(maxDepth, node.depth);
    node.y = 100 * node.depth;
  });
  const nodes = treeData.descendants() as d3.HierarchyPointNode<WFNode>[];
  const endNode = {
    ...treeData.descendants()[0],
    y: 100 * (maxDepth + 1),
    data: {
      name: 'End',
      type: 'end',
    },
  } as d3.HierarchyPointNode<WFNode>;
  const links = treeData.links() as d3.HierarchyPointLink<WFNode>[];
  const tempLinks = treeData.leaves().map(d => ({
    source: d,
    target: endNode,
  })) as d3.HierarchyPointLink<WFNode>[];

  const onPressNode = useCallback(
    (node: d3.HierarchyPointNode<WFNode>) => () => {
      setCurrentNode(_ => {
        setTimeout(() => {
          actionSheet.current?.show();
        }, 0);
        return node;
      });
    },
    [],
  );

  const onPressIndex = (index: number) => {
    if (index === ActionSheetAction.updateName) {
      setShowModal(true);
    } else if (index === ActionSheetAction.delete) {
      Alert.alert('', texts.deleteWarning, [
        {
          text: texts.yes,
          style: 'destructive',
        },
        {
          text: texts.cancel,
          style: 'cancel',
        },
      ]);
    }
  };
  return (
    <SafeAreaView>
      <Svg width={SVGWidth} height={SVGHeight}>
        {/* render link from leaves node to end node */}
        {renderLinks(tempLinks, true)}
        {renderLinks(links)}
        {renderNodes(nodes, onPressNode)}
        {renderNodes([endNode])}
      </Svg>
      <NodeModal
        type="UpdateName"
        data={currentNode?.data}
        onSubmit={data => {}}
        onCancel={() => {}}
        visible={showModal}
        animationType="slide"
        presentationStyle="pageSheet"
      />
      <ActionSheet
        ref={actionSheet}
        title={currentNode?.data.name}
        tintColor={themes.colors.primary}
        options={[texts.changeName, texts.delelete, texts.cancel]}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        onPress={onPressIndex}
      />
    </SafeAreaView>
  );
};
