import { RootState } from '../../reducers/state';

export const getOpenedFile = (state: RootState): string | null => {
  console.log('ZAPPA', state);
  return state.files && state.files.path || null;
};
