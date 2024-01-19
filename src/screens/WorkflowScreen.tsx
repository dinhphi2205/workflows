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
import {Alert, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from '../components/core';
import {NodeModal} from '../components/modals';
import {useWorkFlow} from '../hooks/useWorkflow';

type Props = NativeStackNavigationProp<AppStackParamList, 'WorkflowScreen'>;

export const WorkflowScreen = () => {
  const actionSheet = useRef<ActionSheet>(null);
  const [currentNode, setCurrentNode] =
    useState<d3.HierarchyPointNode<WFNode> | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const {nodes, addNode} = useWorkFlow();

  const treeMap = d3.tree().size([graphWidth, graphHeight]);
  const root = d3
    .stratify<WFNode>()
    .id(d => d.name)
    .parentId(d => d.parent?.name)(nodes);

  const treeData = treeMap(root);
  let maxDepth = 0;
  treeData.each(node => {
    maxDepth = Math.max(maxDepth, node.depth);
    node.y = 100 * node.depth;
  });
  const drawNodes = treeData.descendants() as d3.HierarchyPointNode<WFNode>[];
  console.log('nodes ', drawNodes);
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
    <SafeAreaView style={styles.flex}>
      <Svg width={SVGWidth} height={SVGHeight}>
        {/* render link from leaves node to end node */}
        {renderLinks(tempLinks, true)}
        {renderLinks(links)}
        {renderNodes(drawNodes, onPressNode)}
        {renderNodes([endNode])}
      </Svg>
      <TouchableOpacity
        style={styles.floatButton}
        onPress={() => setShowAddModal(true)}>
        <Text type="Small">Add Node</Text>
      </TouchableOpacity>
      <NodeModal
        type="UpdateName"
        data={currentNode?.data}
        onSubmit={data => {
          setShowModal(false);
        }}
        onCancel={() => setShowModal(false)}
        visible={showModal}
        animationType="slide"
        presentationStyle="pageSheet"
      />
      <NodeModal
        type="Add"
        onSubmit={data => {
          setShowAddModal(false);
        }}
        onCancel={() => setShowAddModal(false)}
        visible={showAddModal}
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

const styles = StyleSheet.create({
  flex: {flex: 1},
  floatButton: {
    position: 'absolute',
    bottom: themes.spaces.xl,
    right: themes.spaces.lg,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themes.colors.primary,
    borderWidth: 1,
    borderColor: themes.colors.grey3,
  },
});
