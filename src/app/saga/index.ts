import { ForkEffect, GenericAllEffect } from "redux-saga/effects";
import { watchFilesSaga } from "app/store/files/files.saga";
import { watchServiceConfigSaga } from "app/store/service/service.saga";

interface ISagaMiddlewares {
  [key: string]: () => IterableIterator<ForkEffect | GenericAllEffect<any>>;
}

const middlewares: ISagaMiddlewares = {
  watchFilesSaga,
  watchServiceConfigSaga,
};

export default middlewares;
