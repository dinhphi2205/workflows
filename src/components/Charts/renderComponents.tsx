import React from 'react';
import {WFNode} from '../../utils/types';
import {
  Circle,
  Defs,
  G,
  Line,
  Marker,
  Path,
  Polygon,
  Rect,
} from 'react-native-svg';
import {themes} from '../../themes';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

const ActionItemWidth = 60;
const ActionItemHeight = 40;
const ConditionItemWidth = ActionItemWidth;
const ConditionItemHeight = ActionItemHeight;

export const GRAPH_MARGIN = 16;
export const SVGHeight = Dimensions.get('window').height - 100;
export const SVGWidth = Dimensions.get('window').width;
export const graphHeight = SVGHeight - 2 * GRAPH_MARGIN;
export const graphWidth = SVGWidth - 2 * GRAPH_MARGIN;

export const renderNodes = (
  nodes: d3.HierarchyPointNode<WFNode>[],
  onPressItem?: (item: d3.HierarchyPointNode<WFNode>) => () => void,
) => {
  return nodes.map((item, index) => {
    return (
      <G key={'tree_' + item.data.name + index}>
        {item.data.type === 'init' ? (
          <>
            <Circle
              x={item.x}
              y={item.y + 16}
              r={12}
              fill={themes.colors.primary}
            />
            <View
              style={[
                styles.textContainer,
                {
                  top: item.y - 8,
                  left: item.x - 8,
                },
              ]}>
              <Text style={styles.text}>{item.data.name}</Text>
            </View>
          </>
        ) : item.data.type === 'end' ? (
          <>
            <Circle x={item.x} y={item.y} r={12} fill={themes.colors.grey1} />
            <View
              style={[
                styles.textContainer,
                {
                  top: item.y + 16,
                  left: item.x - 8,
                },
              ]}>
              <Text style={styles.text}>{item.data.name}</Text>
            </View>
          </>
        ) : item.data.type === 'action' ? (
          <>
            <Rect
              x={item.x - ActionItemWidth / 2}
              y={item.y - ActionItemHeight / 2}
              transform={[{rotateZ: '45deg'}]}
              width={ActionItemWidth}
              height={ActionItemHeight}
              stroke={'red'}
              fill={'white'}
              onPress={onPressItem?.(item)}
            />
            <View
              style={[
                styles.textContainer,
                styles.actionTextContainer,
                {
                  top: item.y - ActionItemHeight / 2,
                  left: item.x - ActionItemWidth / 2,
                },
              ]}>
              <Text style={styles.text}>{item.data.name}</Text>
            </View>
          </>
        ) : (
          <>
            <Polygon
              points={`${item.x - ConditionItemWidth / 2},${item.y} ${item.x},${
                item.y + ConditionItemHeight / 2
              } ${item.x + ConditionItemWidth / 2},${item.y} ${item.x},${
                item.y - ConditionItemHeight / 2
              }`}
              fill={'white'}
              stroke={'red'}
              onPress={onPressItem?.(item)}
            />
            <View
              style={[
                styles.textContainer,
                styles.conditionTextContainer,
                {
                  top: item.y - ConditionItemHeight / 2,
                  left: item.x - ConditionItemWidth / 2,
                },
              ]}>
              <Text style={styles.text}>{item.data.name}</Text>
            </View>
          </>
        )}
      </G>
    );
  });
};

export const renderLinks = (
  links: d3.HierarchyPointLink<WFNode>[],
  toEnd = false,
) => {
  return links.map((item, index) => (
    <G key={'link__' + index}>
      <Defs>
        <Marker
          id="arrow"
          refX={0}
          refY={3}
          markerWidth="3"
          markerHeight="3"
          orient="auto">
          <Path
            d="M 0 0 L 6 3 L 0 6 z"
            fill={themes.colors.grey1}
            stroke={themes.colors.grey1}
            strokeWidth="2"
          />
        </Marker>
      </Defs>
      <Line
        stroke={themes.colors.grey1}
        strokeDasharray={[2, toEnd ? 2 : 0]}
        {...refineMarkerPosition(item)}
        markerEnd="url(#arrow)"
      />
    </G>
  ));
};

const refineMarkerPosition = (link: d3.HierarchyPointLink<WFNode>) => {
  const y1 =
    link.source.y +
    (link.source.data.type === 'action'
      ? ActionItemHeight / 2
      : link.source.data.type === 'condition'
      ? ConditionItemHeight / 2
      : 28);

  const y2 =
    link.target.y -
    (link.target.data.type === 'action'
      ? ActionItemHeight / 2
      : link.target.data.type === 'condition'
      ? ConditionItemHeight / 2
      : 0) -
    5;

  return {x1: link.source.x, x2: link.target.x, y1, y2};
};

const styles = StyleSheet.create({
  text: {fontSize: 10, textAlign: 'center'},
  textContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionTextContainer: {
    width: ActionItemWidth,
    height: ActionItemHeight,
  },
  conditionTextContainer: {
    width: ConditionItemWidth,
    height: ConditionItemHeight,
  },
});
