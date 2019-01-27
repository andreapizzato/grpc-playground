import { RouterState } from 'react-router-redux';
import { IProcessedProtoFile } from 'app/core/file';
import { IServiceConfig } from 'app/core/service';

export interface RootState {
  files: RootState.FileState;
  serviceConfig: RootState.ServiceConfigState;
  router: RouterState;
}

export namespace RootState {
  export type FileState = {
    path: string | null;
    processedProto: IProcessedProtoFile | null;
  };
  export type ServiceConfigState = {
    serviceconfig: IServiceConfig
  };
}
