import * as React from 'react';
import * as style from './style.css';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouteComponentProps, Switch, Route } from 'react-router';
// import { TodoActions } from 'app/actions';
// import { TodoModel } from 'app/models';
// import { omit } from 'app/utils';

import { StatusBar } from 'app/components/StatusBar';

import {
  Drawer, AppBar, CssBaseline, Toolbar, IconButton, Typography, Divider, List, ListItem, ListItemIcon, ListItemText, Icon, withStyles, createStyles, Theme, WithStyles
} from '@material-ui/core';
import * as classNames from 'classnames';
import { WelcomePage } from '../WelcomePage';

export namespace App {
  export interface Props extends RouteComponentProps<void>, WithStyles<typeof styles> {
    theme: Theme;
  }
}

const drawerWidth = 240;

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
  },
});

@connect(
  (state: any): Pick<App.Props, any> => {
    return {  };
  },
  (dispatch: Dispatch): Pick<App.Props, any> => ({
    // actions: bindActionCreators(omit(TodoActions, 'Type'), dispatch)
  })
)
class App extends React.Component<App.Props> {
  static defaultProps: Partial<App.Props> = {
  };

  constructor(props: App.Props, context?: any) {
    super(props, context);
  }

  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  componentDidMount(){
    this.test();
  }

  test(){
    
  }


  render() {
    const { classes, theme } = this.props;

    return (
      <div className={style.app}>
        <div className={style.content}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: this.state.open,
            })}
          >
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, {
                  [classes.hide]: this.state.open,
                })}
              >
                <Icon>menu</Icon>
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                GRPC Playground
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            })}
            classes={{
              paper: classNames({
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open,
              }),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'rtl' ? <Icon>chevron_right</Icon> : <Icon>chevron_left</Icon> }
              </IconButton>
            </div>
            <Divider />
            <List>
              {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <Icon>inbox</Icon> : <Icon>mail</Icon> }</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <Icon>inbox</Icon> : <Icon>mail</Icon> }</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route path="/" component={WelcomePage} />
            </Switch>
          </main>
        </div>

        <StatusBar />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
