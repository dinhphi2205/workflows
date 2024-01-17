import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {ListScreen} from '../screens/ListScreen';
import {WorkflowScreen} from '../screens/WorkflowScreen';

const Stack = createNativeStackNavigator();
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
