import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import { filesReducer } from '../store/files/files.reducer';

const reducers = (history: History) => {
  return {
    files: filesReducer as any,
    router: connectRouter(history),
  };
};

export const createRootReducer = (history: History) => combineReducers(reducers(history));
