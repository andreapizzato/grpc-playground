import { RootState } from '../../reducers/state';

export const getOpenedFile = (state: RootState): string | null => {
  return state.files && state.files.path || null;
};
