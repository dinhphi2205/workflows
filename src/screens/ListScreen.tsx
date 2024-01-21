import React, {useCallback} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {texts} from '../i18n';
import {themes} from '../themes';
import {useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '../navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {selectListWF} from '../redux/workflowSlices';
import {WorkFlow} from '../utils/types';
import {Text} from '../components/core';

type Props = NativeStackNavigationProp<AppStackParamList, 'ListScreen'>;

export const ListScreen = () => {
  const listWF = useSelector(selectListWF);
  const {navigate} = useNavigation<Props>();

  const renderItem = useCallback(({item}: {item: WorkFlow}) => {
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => navigate('WorkflowScreen', {workflow: item})}>
        <Text type="Body"> {item.name}</Text>
      </TouchableOpacity>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={listWF}
        keyExtractor={(item, index) => `${item.name}_${index}`}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.centerHorizontal}>
            <Text style={styles.textCenter}>{texts.noWorkFLow}</Text>
          </View>
        }
      />
      <TouchableOpacity
        style={styles.floatButton}
        onPress={() => navigate('WorkflowScreen', {})}>
        <Text style={styles.textPlus}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  centerHorizontal: {alignItems: 'center', padding: themes.spaces.md},
  textCenter: {textAlign: 'center'},
  textPlus: {fontSize: 24, color: themes.colors.white},
  floatButton: {
    position: 'absolute',
    bottom: themes.spaces.xl,
    right: themes.spaces.lg,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themes.colors.primary,
    borderWidth: 1,
    borderColor: themes.colors.grey3,
  },
  row: {
    padding: themes.spaces.md,
    borderBottomWidth: 1,
    borderBottomColor: themes.colors.grey3,
  },
});
