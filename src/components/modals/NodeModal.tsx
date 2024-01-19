import React, {useRef, useState} from 'react';
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
import {WFNode} from '../../utils/types';
import {themes} from '../../themes';
import {Text} from '../core';
import {texts} from '../../i18n';
import {SafeAreaView} from 'react-native-safe-area-context';

interface NodeModal extends ModalProps {
  type: 'Add' | 'UpdateName';
  data?: WFNode;
  onSubmit: (newData: WFNode, parent?: WFNode) => void;
  onCancel: () => void;
}

export const NodeModal = ({
  type,
  data,
  onSubmit,
  onCancel,
  ...rest
}: NodeModal) => {
  const pickerTypeRef = useRef<Picker>(null);
  const pickerParentRef = useRef<Picker>(null);
  const [nodeType, setNodeType] = useState<string>('undefined');

  const nodeTypeColor =
    nodeType === 'undefined' ? themes.colors.grey3 : 'black';
  const onPressSubmit = () => {};
  return (
    <Modal {...rest}>
      <SafeAreaView style={styles.container}>
        <Text type="SubTitle">
          {type === 'Add' ? texts.addNode : texts.updateNodeName}
        </Text>
        <View>
          <Text type="Caption">{texts.name}</Text>
          <TextInput
            placeholder={texts.inputNodeName}
            underlineColorAndroid={'transaprent'}
            placeholderTextColor={themes.colors.grey3}
            style={styles.input}
          />
          {type === 'Add' && (
            <>
              <Text type="Caption">{texts.type}</Text>
              <Picker
                ref={pickerTypeRef}
                style={{viewContainer: styles.picker}}
                onValueChange={value => {
                  setNodeType(value);
                }}
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
                onValueChange={value => console.log(value)}
                placeholder={{label: texts.selectParentNode}}
                items={[
                  {label: 'Football', value: 'football'},
                  {label: 'Baseball', value: 'baseball'},
                  {label: 'Hockey', value: 'hockey'},
                ]}>
                <Text style={{color: themes.colors.grey3}}>
                  {texts.selectParentNode}
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
              onPress={onCancel}
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
