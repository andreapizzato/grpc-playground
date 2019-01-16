import { call, takeLatest, all, select, put } from 'redux-saga/effects';
import * as fileActions from './files.actions';
import * as fileSelector from './files.selector';
import { processProtoFile } from '../../core/file';

export function* processFile() {
    // yield put(uiActions.showLoader(LoadersNames.fetchDealerCustomers));
    
    const file: string | null = yield select(fileSelector.getOpenedFile);

    console.log(file);
    if(!file) {
      // TODO: error state
      return;
    }

    try {
      const result = yield call(processProtoFile, file);
      yield put(
        fileActions.openFile.done({
          params: {},
          result,
        }),
      );
    } catch (err) {
      // TODO: error state
      console.error("ERROR: ", err);
    }
    // yield put(uiActions.hideLoader(LoadersNames.fetchDealerCustomers));
}

export function* watchFilesSaga() {
  yield all([
    yield takeLatest(fileActions.openFile.started, processFile),
  ]);
}
