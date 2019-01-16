import { call, takeLatest, all, select } from 'redux-saga/effects';
import * as fileActions from './files.actions';
import * as fileSelector from './files.selector';
import { processProtoFile } from '../../core/file';

export function* processFile() {
    // yield put(uiActions.showLoader(LoadersNames.fetchDealerCustomers));
    
    const file: string | null = yield select(fileSelector.getOpenedFile);

    console.log("MINCHIAS", file);

    if(!file){
      return;
    }

    try {
      const result = yield call(processProtoFile, file);
      console.log("MINCHIA", result);
    //   yield put(
    //     customersActions.getDealerCustomerList.done({
    //       params: {},
    //       result,
    //     }),
    //   );
    } catch (err) {
      console.error("DIOC", err);
    }
    // yield put(uiActions.hideLoader(LoadersNames.fetchDealerCustomers));
}

export function* watchFilesSaga() {
  yield all([
    yield takeLatest(fileActions.openFile, processFile),
  ]);
}
