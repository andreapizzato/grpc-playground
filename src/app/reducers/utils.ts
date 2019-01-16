export type MinimalAction = {
  type: string;
};

export type Action = {
  payload: any;
  type: string;
  error?: any;
  meta?: {
    schema: any;
  };
};

export const createReducer = (initialState: any, handlers: any) => (
  state = initialState,
  actionC: MinimalAction | Action,
) => {
  if (Object.prototype.hasOwnProperty.call(handlers, actionC.type)) {
    return handlers[actionC.type](state, actionC);
  }
  return state;
};