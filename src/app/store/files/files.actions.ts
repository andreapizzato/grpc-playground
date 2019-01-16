import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('/files');

export const openFile = actionCreator<string>('OPEN_FILE');
