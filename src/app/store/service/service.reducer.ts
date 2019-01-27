import { RootState } from '../../reducers/state';
import { configureService } from './service.action';
import { createReducer } from '../../reducers/utils';
import { Action } from 'typescript-fsa';
import { IServiceConfig } from 'app/core/service';

export const initialState: RootState.ServiceConfigState = {
  serviceconfig: {
    host: "",
    port: 0,
  }
};

export const configServiceReducer = createReducer(initialState, {
  [configureService.type]: (state: RootState.ServiceConfigState, action: Action<{ payload: IServiceConfig }>) => {
    console.log(action, state, "configService action");
    return {
      ...state,
      serviceconfig: action.payload,
    }
  },
});