/* eslint-disable react/no-unstable-nested-components */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useRef, useState} from 'react';
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
import {Alert, Button, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from '../components/core';
import {NodeModal} from '../components/modals';
import {useWorkFlow} from '../hooks/useWorkflow';

type Props = NativeStackScreenProps<AppStackParamList, 'WorkflowScreen'>;

export const WorkflowScreen = ({route, navigation}: Props) => {
  const actionSheet = useRef<ActionSheet>(null);
  const [currentNode, setCurrentNode] = useState<WFNode>();
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const currentWf = route.params.workflow;
  const {nodes, addNode, updateName, deleteNode, saveWorkflow, deleteWorkflow} =
    useWorkFlow(currentWf);

  navigation.setOptions({
    title: currentWf ? currentWf.name : texts.newWF,
    headerBackTitleVisible: false,
    headerRight: () => <Button title={texts.save} onPress={saveWorkflow} />,
  });

  const treeMap = d3.tree().size([graphWidth, graphHeight]);
  console.log('node ', nodes);
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

  const onPressNode = (node: d3.HierarchyPointNode<WFNode>) => () => {
    setCurrentNode(_ => {
      setTimeout(() => {
        actionSheet.current?.show();
      }, 0);
      return node.data;
    });
  };

  const onPressIndex = (index: number) => {
    if (index === ActionSheetAction.updateName) {
      setShowModal(true);
    } else if (index === ActionSheetAction.delete) {
      Alert.alert('', texts.deleteWarning, [
        {
          text: texts.yes,
          style: 'destructive',
          onPress: () => {
            deleteNode(currentNode!);
          },
        },
        {
          text: texts.cancel,
          style: 'cancel',
        },
      ]);
    }
  };
  return (
    <View style={[styles.flex, {paddingTop: 16}]}>
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
        <Text type="Caption" style={styles.textCenter}>
          {texts.addNode}
        </Text>
      </TouchableOpacity>
      {currentWf && (
        <TouchableOpacity
          style={styles.floatButtonDelete}
          onPress={deleteWorkflow}>
          <Text type="Small" style={[styles.textCenter, styles.textWhite]}>
            {texts.deleteWF}
          </Text>
        </TouchableOpacity>
      )}
      <NodeModal
        type="Add"
        allNodes={nodes}
        onSubmit={data => {
          addNode(data);
          setShowAddModal(false);
        }}
        onCancel={() => setShowAddModal(false)}
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
      />
      <NodeModal
        type="UpdateName"
        data={currentNode}
        allNodes={nodes}
        onSubmit={data => {
          updateName(currentNode!, data.name);
          setShowModal(false);
        }}
        onCancel={() => setShowModal(false)}
        visible={showModal}
        animationType="slide"
        presentationStyle="pageSheet"
      />
      <ActionSheet
        ref={actionSheet}
        title={currentNode?.name}
        tintColor={themes.colors.primary}
        options={[texts.changeName, texts.delelete, texts.cancel]}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        onPress={onPressIndex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  floatButton: {
    position: 'absolute',
    bottom: themes.spaces.xl,
    right: themes.spaces.lg,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themes.colors.primary,
    borderWidth: 1,
    borderColor: themes.colors.grey3,
  },
  floatButtonDelete: {
    position: 'absolute',
    bottom: themes.spaces.xl,
    left: themes.spaces.lg,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: themes.colors.grey3,
  },
  rowButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textCenter: {
    textAlign: 'center',
  },
  textWhite: {
    color: themes.colors.white,
  },
});
