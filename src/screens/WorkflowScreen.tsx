import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStackParamList} from '../navigation';
type Props = NativeStackNavigationProp<AppStackParamList, 'WorkflowScreen'>;
export const WorkflowScreen = () => {
  return (
    <SafeAreaView>
      <Text> WorkflowScreen </Text>
    </SafeAreaView>
  );
};
