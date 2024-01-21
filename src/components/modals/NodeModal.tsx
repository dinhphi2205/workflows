import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  Dimensions,
  Modal,
  ModalProps,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Picker from 'react-native-picker-select';
import {NodeType, WFNode} from '../../utils/types';
import {themes} from '../../themes';
import {Text} from '../core';
import {texts} from '../../i18n';
import {SafeAreaView} from 'react-native-safe-area-context';
import {isValidNode} from '../../utils/validations';

interface NodeModalProps extends ModalProps {
  type: 'Add' | 'UpdateName';
  data?: WFNode;
  allNodes: WFNode[];
  onSubmit: (newData: WFNode) => void;
  onCancel: () => void;
}

export const NodeModal = ({
  type,
  data,
  allNodes,
  onSubmit,
  onCancel,
  ...rest
}: NodeModalProps) => {
  const pickerTypeRef = useRef<Picker>(null);
  const pickerParentRef = useRef<Picker>(null);
  const [nodeType, setNodeType] = useState<string>('undefined');
  const [parentNode, setParentNode] = useState<string>('undefined');
  const [nodeName, setNodeName] = useState<string>('');

  useEffect(() => {
    setNodeName(data?.name ?? '');
  }, [data?.name]);

  const nodeTypeColor =
    nodeType === 'undefined' ? themes.colors.grey3 : 'black';
  const parentNodeColor =
    parentNode === 'undefined' ? themes.colors.grey3 : 'black';
  const onPressSubmit = () => {
    const parent = data
      ? data.parent
      : allNodes.find(item => item.name === parentNode);
    const newNode: WFNode = {
      name: nodeName,
      type: data ? data.type : (nodeType.toLowerCase() as NodeType),
      parent: {name: parent!.name, type: parent!.type},
    };
    if (isValidNode(newNode, allNodes, data)) {
      onSubmit(newNode);
      clearData();
    }
  };
  const onPressCancel = () => {
    clearData();
    onCancel();
  };
  const clearData = () => {
    setNodeType('undefined');
    setParentNode('undefined');
    setNodeName(data?.name ?? '');
  };
  return (
    <Modal {...rest}>
      <SafeAreaView style={styles.container}>
        <Text type="SubTitle">
          {type === 'Add' ? texts.addNode : texts.updateNodeName}
        </Text>
        <View>
          <Text type="Caption">{texts.inputNodeName}</Text>
          <TextInput
            defaultValue={data?.name}
            placeholder={texts.inputNodeName}
            underlineColorAndroid={'transaprent'}
            placeholderTextColor={themes.colors.grey3}
            style={styles.input}
            onChangeText={setNodeName}
          />
          {type === 'Add' && (
            <>
              <Text type="Caption">{texts.type}</Text>
              <Picker
                ref={pickerTypeRef}
                style={{viewContainer: styles.picker}}
                onValueChange={setNodeType}
                placeholder={{label: texts.selectNodeType, value: undefined}}
                items={[
                  {label: 'Action', value: 'Action'},
                  {label: 'Condition', value: 'Condition'},
                ]}>
                <Text style={{color: nodeTypeColor}}>
                  {nodeType === 'undefined' ? texts.selectNodeType : nodeType}
                </Text>
              </Picker>

              <Text type="Caption">{texts.chooseParent}</Text>
              <Picker
                ref={pickerParentRef}
                style={{viewContainer: styles.picker}}
                onValueChange={setParentNode}
                placeholder={{label: texts.selectParentNode}}
                items={allNodes.map(item => ({
                  label: item.name,
                  value: item.name,
                }))}>
                <Text style={{color: parentNodeColor}}>
                  {parentNode === 'undefined'
                    ? texts.selectParentNode
                    : parentNode}
                </Text>
              </Picker>
            </>
          )}
          <View style={styles.rowcontainer}>
            <Button
              title="Apply"
              color={themes.colors.primary}
              onPress={onPressSubmit}
            />
            <Button
              title="Cancel"
              color={themes.colors.black}
              onPress={onPressCancel}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: themes.spaces.md,
  },
  space: {
    marginTop: themes.spaces.md,
  },
  rowcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: themes.spaces.md,
  },
  input: {
    height: 40,
    width: Dimensions.get('window').width - 2 * themes.spaces.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: themes.colors.grey3,
    paddingHorizontal: themes.spaces.md,
    marginBottom: themes.spaces.md,
  },
  picker: {
    height: 40,
    width: Dimensions.get('window').width - 2 * themes.spaces.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: themes.colors.grey3,
    paddingHorizontal: themes.spaces.md,
    marginBottom: themes.spaces.md,
    justifyContent: 'center',
  },
});
