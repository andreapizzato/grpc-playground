import { ForkEffect, GenericAllEffect } from "redux-saga/effects";
import { watchFilesSaga } from "app/store/files/files.saga";

interface ISagaMiddlewares {
  [key: string]: () => IterableIterator<ForkEffect | GenericAllEffect<any>>;
}

const middlewares: ISagaMiddlewares = {
  watchFilesSaga: watchFilesSaga,
};

export default middlewares;
