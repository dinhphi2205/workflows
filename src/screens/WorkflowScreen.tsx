import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStackParamList} from '../navigation';
import {Rect, Svg} from 'react-native-svg';
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

type Props = NativeStackNavigationProp<AppStackParamList, 'WorkflowScreen'>;

export const WorkflowScreen = () => {
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
      console.log('a ', node.data.name);
    },
    [],
  );
  return (
    <SafeAreaView>
      <Svg width={SVGWidth} height={SVGHeight}>
        {renderLinks(tempLinks, true)}
        {renderLinks(links)}
        {renderNodes(nodes, onPressNode)}
        {renderNodes([endNode])}
      </Svg>
    </SafeAreaView>
  );
};
