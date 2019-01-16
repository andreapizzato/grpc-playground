import actionCreatorFactory from 'typescript-fsa';
import { IProcessedProtoFile } from "../../core/file"

const actionCreator = actionCreatorFactory('/files');

export const openFile = actionCreator.async<{}, IProcessedProtoFile[]>('OPEN_FILE');
