import * as React from 'react';
import TodoApp from 'app/containers/App';
import { hot } from 'react-hot-loader';
import { History } from 'history';

interface IProps {
  history: History
}

export const App = hot(module)((props: IProps) => (<TodoApp history={props.history} />));
