import { RouterState } from 'react-router-redux';
import { IProcessedProtoFile } from 'app/core/file';

export interface RootState {
  files: RootState.FileState;
  router: RouterState;
}

export namespace RootState {
  export type FileState = {
    path: string | null;
    processedProto: IProcessedProtoFile | null;
  };
}
