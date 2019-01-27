import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import { filesReducer } from '../store/files/files.reducer';
import { configServiceReducer } from 'app/store/service/service.reducer';

const reducers = (history: History) => {
  return {
    serviceConfig: configServiceReducer,
    files: filesReducer,
    router: connectRouter(history),
  };
};

export const createRootReducer = (history: History) => combineReducers(reducers(history));
