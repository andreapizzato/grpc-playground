import { RouterState } from 'react-router-redux';

export interface RootState {
  files: RootState.FileState;
  router: RouterState;
}

export namespace RootState {
  export type FileState = {
    path: string | null;
  };
}
