import { takeLatest, all, select } from 'redux-saga/effects';
import { configureService as configureServiceAction } from './service.action';
// import { IServiceConfig } from 'app/core/service';

export function* configureService() {    
    yield select(configureServiceAction);
}

export function* watchServiceConfigSaga() {
  yield all([
    yield takeLatest(configureServiceAction, configureService),
  ]);
}
