import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {WorkFlow} from '../utils/types';
import {RootState} from './store';

export interface WorkflowsState {
  listWF: WorkFlow[];
  currentWF?: WorkFlow;
}

const initialState: WorkflowsState = {
  listWF: [],
  currentWF: undefined,
};

export const workflowSlice = createSlice({
  name: 'workflow',
  initialState,
  reducers: {
    assignCurrentWF: (state, action: PayloadAction<WorkFlow>) => {
      state.currentWF = action.payload;
    },
  },
});
export const {assignCurrentWF} = workflowSlice.actions;

export const selectCurrentWF = (state: RootState) => state.workflow.currentWF;
export const selectListWF = (state: RootState) => state.workflow.listWF;

export default workflowSlice.reducer;
