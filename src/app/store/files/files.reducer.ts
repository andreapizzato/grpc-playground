import { RootState } from '../../reducers/state';
import { openFile } from './files.actions';
import { createReducer } from '../../reducers/utils';
import { Action } from 'typescript-fsa';
import { IProcessedProtoFile } from 'app/core/file';

export const initialState: RootState.FileState = {
  path: null,
  processedProto: null,
};

export const filesReducer = createReducer(initialState, {
  [openFile.started.type]: (state: RootState.FileState, action: Action<string>) => {
    return Object.assign({}, state, { path: action.payload })
  },
  [openFile.done.type]: (state: RootState.FileState, action: Action<{ result: IProcessedProtoFile }>) => {
    return Object.assign({}, state, { processedProto: action.payload.result })
  }
});