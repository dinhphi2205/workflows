import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {texts} from '../i18n';
import {themes} from '../themes';
import {useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '../navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type Props = NativeStackNavigationProp<AppStackParamList, 'ListScreen'>;

export const ListScreen = () => {
  const [listWorkflow, setListWorkFlow] = useState<string[]>([]);
  const {navigate} = useNavigation<Props>();

  const renderItem = useCallback(({item}: {item: string}) => {
    return (
      <View>
        <Text> {item}</Text>
        <Text> Last update</Text>
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={listWorkflow}
        keyExtractor={(item, index) => `${item}_${index}`}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: themes.spaces.lg},
  centerHorizontal: {alignItems: 'center'},
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
});
