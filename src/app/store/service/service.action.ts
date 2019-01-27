import actionCreatorFactory from 'typescript-fsa';
import { IServiceConfig } from 'app/core/service';

const actionCreator = actionCreatorFactory('/service');

export const configureService = actionCreator<IServiceConfig>('CONFIG_SERVICE');