import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {WFNode, WorkFlow} from '../utils/types';
import {RootState} from './store';

export interface WorkflowsState {
  listWF: WorkFlow[];
}

const initialState: WorkflowsState = {
  listWF: [],
};

export const workflowSlice = createSlice({
  name: 'workflow',
  initialState,
  reducers: {
    saveNewWorkflow: (state, action: PayloadAction<WFNode[]>) => {
      let name = 'WorkFlow 1';
      if (state.listWF.length > 0) {
        const lastWF = state.listWF[state.listWF.length - 1];
        name = `WorkFlow ${parseInt(lastWF.name.split(' ')[1], 10) + 1}`;
      }
      state.listWF = [...state.listWF, {name, nodes: action.payload}];
    },
    saveCurrentWorkFlow: (state, action: PayloadAction<WorkFlow>) => {
      const wfIndex = state.listWF.findIndex(
        wf => wf.name === action.payload.name,
      );
      if (wfIndex > -1) {
        state.listWF = state.listWF.map((item, index) =>
          index === wfIndex ? action.payload : item,
        );
      }
    },
    deleteWorkFlow: (state, action: PayloadAction<WorkFlow>) => {
      state.listWF = state.listWF.filter(wf => wf.name !== action.payload.name);
    },
  },
});
export const {saveNewWorkflow, saveCurrentWorkFlow, deleteWorkFlow} =
  workflowSlice.actions;

export const selectListWF = (state: RootState) => state.workflow.listWF;

export default workflowSlice.reducer;
