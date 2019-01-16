import { RootState } from '../../reducers/state';
import { openFile } from './files.actions';
import { createReducer } from '../../reducers/utils';
import { Action } from 'typescript-fsa';

export const initialState: RootState.FileState = {
  path: null,
};

export const filesReducer = createReducer(initialState, {
  [openFile.type]: (state: RootState.FileState, action: Action<string>) => 
    Object.assign({}, state, { path: action.payload })
});