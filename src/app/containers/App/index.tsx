import * as React from 'react';
import * as style from './style.css';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Switch, Route } from 'react-router';
import { StatusBar } from 'app/components/StatusBar';

import {
  Drawer, AppBar, CssBaseline, Toolbar, IconButton, Typography, Divider, List, ListItem, ListItemIcon, ListItemText, Icon, withStyles, createStyles, Theme, WithStyles, Collapse
} from '@material-ui/core';
import * as classNames from 'classnames';
import { WelcomePageComponent } from '../WelcomePage';
import { RootState } from 'app/reducers/state';
import { isEmptyObject } from 'app/utils/isEmptyObject';
import { UploadDoneComponent } from '../UploadDonePage';
import { History } from 'history';

export namespace App {
  export interface Props extends WithStyles<typeof styles> {
    theme: Theme;

    history: History;
    files: RootState.FileState;
  }

  interface IDrawersNS {
    [key: string]: {
      open: boolean
    } | undefined
  }
  export interface IState {
    drawerOpen?: boolean;
    drawerVoices: IDrawersNS;
  }
}

const drawerWidth = 400;

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
    textAlign: "center",
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
    margin: "auto",
    flexBasis: theme.spacing.unit * 7 + 1,
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
  titleToolbar: {
    justifyContent: "center",
  },
  content: {
    flexGrow: 1,
  },
  title: {
    flexBasis: `calc(100% - ${theme.spacing.unit * 7 + 1}px)`,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

@connect(
  (state: any): Pick<App.Props, "files"> => {
    console.log("INDEX", state.files)
    return { files: state.files };
  },
  (dispatch: Dispatch): Pick<App.Props, any> => ({
    // actions: bindActionCreators(omit(TodoActions, 'Type'), dispatch)
  })
)
class App extends React.Component<App.Props, App.IState> {

  static openState: App.IState;

  static defaultProps: Partial<App.Props> = {
  };

  static getDerivedStateFromProps(props: App.Props, state: App.IState) {
    const newState: App.IState = {
      ...state
    };
    if (props.files.processedProto && !state.drawerOpen) {
        if (isEmptyObject(state.drawerVoices)) {
          App.openState.drawerVoices = {};
        }
        const ns = props.files.processedProto.namespaces
        ns.forEach(ns => {
          newState.drawerVoices[`${ns.name}`] = {
            open: true,
          }
          ns.services.forEach(s => {
            newState.drawerVoices[`${ns.name}_${s.name}`] = {
              open: true,
            }
          })
        })
    } else {
      App.openState = { ...state };
    }
    return newState;
  }

  constructor(props: App.Props, context?: any) {
    super(props, context);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleDrawerVoiceClick = this.handleDrawerVoiceClick.bind(this);
    this.getDrawerVoiceName = this.getDrawerVoiceName.bind(this);
    this.state = {
      drawerOpen: false,
      drawerVoices: {},
    }
    App.openState = { ...this.state };
  }

  handleDrawerOpen() {
    this.setState(
      {
        ...App.openState,
        drawerOpen: true
      });
  };

  handleDrawerClose() {
    const { drawerVoices } = this.state;
    const newState: App.IState = {
      drawerOpen: false,
      drawerVoices: {}
    }
    for (const key in drawerVoices) {
      if (drawerVoices.hasOwnProperty(key)) {
        newState.drawerVoices[key] = {
          open: true,
        }
      }
    }
    this.setState(newState);
  };

  componentDidUpdate() {
    // TODO redirect
    if (this.props.history.location.pathname === "/" && this.props.files.processedProto) {
      this.props.history.push("/uploadDone");
    }
    console.log(this.props, "WELCOME PROPS")
  }

  componentDidMount() {
    if (this.props.history.location.pathname.indexOf("index.html") >= 0 && !this.props.files.processedProto) {
      this.props.history.push("/");
    }
  }

  handleDrawerVoiceClick(namespace: string, service?: string) {
    let name = namespace;
    if (service) {
      name += `_${service}`;
    }
    const v = this.state.drawerVoices[name];
    if (!this.state.drawerOpen) {
      let newState = {
        drawerOpen: true,
        drawerVoices: {
          ...App.openState.drawerVoices,
          [namespace]: {
            open: true,
          }
        }
      }
      if (service) {
        newState.drawerVoices[`${namespace}_${service}`] = {
          open: true,
        }
      }
      this.setState(newState)
    } else {
      this.setState({
        drawerOpen: true,
        drawerVoices: {
          ...this.state.drawerVoices,
          [name]: v ? {
            open: !v.open,
          } : {
            open: true,
          }
        }
      })
    }
  }

  getDrawerVoiceName(namespace: string, service?: string) {
    let name = namespace;
    if (service) {
      name += `_${service}`;
    }
    return name;
  }

  redirectToMethod(namespace: string, service: string, method: string) {
    const path =`${namespace}/${service}/${method}`;
    console.log(`REDIRECT ${path}`);
  }

  render() {
    console.log("RENDER");
    const { classes, theme, files } = this.props;

    let drawer = [<div key={"namespace_NOTHING"}/>];
    const { drawerVoices, drawerOpen } = this.state;
    if (files.processedProto) {
      const ns_count = files.processedProto.namespaces.length;
      drawer = (
        files.processedProto.namespaces.map((ns, ns_index) => {
          const n = drawerVoices[this.getDrawerVoiceName(ns.name)];
          return (
            <List key={`namespace_${ns.name}`}>
              <ListItem button onClick={() => this.handleDrawerVoiceClick(ns.name)}>
                <ListItemIcon><Icon>inbox</Icon></ListItemIcon>
                <ListItemText primary={ns.name} />
              </ListItem>
              <Collapse in={n && n.open } timeout="auto" unmountOnExit>
                {
                  ns.services.map((s, s_index) => {
                    const s_state = drawerVoices[this.getDrawerVoiceName(ns.name, s.name)];
                    const isLast = ns_index === (ns_count - 1) && s_index === (ns.services.length - 1);
                    return (
                      <List key={`namespace_${ns.name}_service_${s.name}`} className={classNames(drawerOpen && classes.nested)}>
                        <ListItem button onClick={() => this.handleDrawerVoiceClick(ns.name, s.name)}>
                          <ListItemIcon><Icon>inbox</Icon></ListItemIcon>
                          <ListItemText primary={s.name} />
                        </ListItem>
                        <Collapse in={s_state && s_state.open } timeout="auto" unmountOnExit>
                          <List className={classNames(drawerOpen && classes.nested)}>
                            {
                              s.metohds.map(m => {
                                return (
                                  <ListItem key={`namespace_${ns.name}_service_${s.name}_method${m.name}`} button onClick={() => this.redirectToMethod(ns.name, s.name, m.name)}>
                                    <ListItemIcon><Icon>star</Icon></ListItemIcon>
                                    <ListItemText primary={m.name} />
                                  </ListItem>
                                )
                              })
                            }
                          </List>
                        </Collapse>
                      { !isLast && <Divider absolute/> }
                      </List>
                    )
                  })
                }
              </Collapse>
              <Divider />
            </List>
            )
          }
        )
      )
    }
    return (
      <div className={style.app}>
        <div className={style.content}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: this.state.drawerOpen,
            })}
          >
            <Toolbar disableGutters={!this.state.drawerOpen} className={classes.titleToolbar}>
              {
                files.processedProto && <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(classes.menuButton, {
                    [classes.hide]: this.state.drawerOpen,
                  })}
                >
                  <Icon>menu</Icon>
                </IconButton>
              }
              <Typography variant="h6" color="inherit" noWrap className={classes.title}>
                GRPC Playground
              </Typography>
            </Toolbar>
          </AppBar>
          {
            files.processedProto && <Drawer
              variant="permanent"
              className={classNames(classes.drawer, {
                [classes.drawerOpen]: this.state.drawerOpen,
                [classes.drawerClose]: !this.state.drawerOpen,
              })}
              classes={{
                paper: classNames({
                  [classes.drawerOpen]: this.state.drawerOpen,
                  [classes.drawerClose]: !this.state.drawerOpen,
                }),
              }}
              open={this.state.drawerOpen}
            >
              <div className={classes.toolbar}>
                <IconButton onClick={this.handleDrawerClose}>
                  {theme.direction === 'rtl' ? <Icon>chevron_right</Icon> : <Icon>chevron_left</Icon> }
                </IconButton>
              </div>
              <Divider />
              {drawer}
            </Drawer>
          }
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route exact path="/" component={WelcomePageComponent} />
              <Route exact path="/uploadDone" component={UploadDoneComponent} />
            </Switch>
          </main>
        </div>

        <StatusBar />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
