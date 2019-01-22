import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'app/middleware';
import { createRootReducer } from 'app/reducers';
import createSagaMiddleware from "redux-saga";

import saga from '../saga';


import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  let middleware = applyMiddleware(
    routerMiddleware(history), // for dispatching history actions
    // ... other middlewares ...
    sagaMiddleware,
    logger,
  );

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(
    createRootReducer(history), // root reducer with router state
    compose(middleware),
  );

  // run saga middleware
  Object.keys(saga).forEach((s) => {
    sagaMiddleware.run(saga[s]);
  });

  if (module.hot && process.env.NODE_ENV !== 'production') {
    module.hot.accept('app/reducers', () => {
      const nextReducer = require('app/reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}