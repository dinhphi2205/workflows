import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {ListScreen} from '../screens/ListScreen';
import {WorkflowScreen} from '../screens/WorkflowScreen';
import {WorkFlow} from '../utils/types';

const Stack = createNativeStackNavigator<AppStackParamList>();
export const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ListScreen" component={ListScreen} />
        <Stack.Screen name="WorkflowScreen" component={WorkflowScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export type AppStackParamList = {
  ListScreen: undefined;
  WorkflowScreen: {workflow?: WorkFlow};
};
