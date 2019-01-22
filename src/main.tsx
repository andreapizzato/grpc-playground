import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from 'app/store/config';
import { App } from './app';
import { colors, createMuiTheme, MuiThemeProvider } from '@material-ui/core';

// prepare store
const store = configureStore();

const theme = createMuiTheme({
  palette: {
    primary: colors.indigo,
    secondary: colors.orange,
    type: 'dark',
  },
  typography: {
    useNextVariants: true,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <App history={history}/>
      </ConnectedRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
