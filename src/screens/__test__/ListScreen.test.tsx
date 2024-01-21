import React from 'react';
import {renderWithProviders} from '../../utils/test-ultils';
import {ListScreen} from '../ListScreen';
import {act, fireEvent, screen} from '@testing-library/react-native';
import {texts} from '../../i18n';
import {saveNewWorkflow} from '../../redux/workflowSlices';

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});
describe('ListScreen', () => {
  test('should render with empty state', () => {
    renderWithProviders(<ListScreen />);
    expect(screen.getByText(texts.noWorkFLow)).toBeOnTheScreen();
  });

  test('should render with normal state', async () => {
    const {store} = renderWithProviders(<ListScreen />);
    act(() => {
      store.dispatch(
        saveNewWorkflow([{name: 'Condition 1', type: 'condition'}]),
      );
      store.dispatch(saveNewWorkflow([{name: 'Action 1', type: 'action'}]));
    });
    expect(screen.getByText('WorkFlow 1')).toBeOnTheScreen();

    expect(screen.getByText('WorkFlow 2')).toBeOnTheScreen();
  });

  test('should go to workflow screen when press on WorkFlow 1', async () => {
    renderWithProviders(<ListScreen />);
    const item = screen.getByText('WorkFlow 1');
    fireEvent.press(item);
    expect(mockedNavigate).toHaveBeenCalledWith('WorkflowScreen', {
      workflow: {
        name: 'WorkFlow 1',
        nodes: [{name: 'Condition 1', type: 'condition'}],
      },
    });
  });

  test('should go to workflow screen when press on + button', async () => {
    renderWithProviders(<ListScreen />);
    const buttonAdd = screen.getByText('+');
    fireEvent.press(buttonAdd);
    expect(mockedNavigate).toHaveBeenCalledWith('WorkflowScreen', {});
  });
});
