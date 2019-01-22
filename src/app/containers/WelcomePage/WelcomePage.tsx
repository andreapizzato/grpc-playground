import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { RouteComponentProps } from 'react-router';
import { withStyles, Theme, createStyles, WithStyles, Typography, Button, Icon } from '@material-ui/core';
import { remote } from 'electron';
import * as fileActions from '../../store/files/files.actions';

export namespace WelcomePage {
  export interface Props extends RouteComponentProps<void>, WithStyles<typeof styles> {
    theme: Theme;

    openFile: typeof fileActions.openFile.started;
    files: typeof fileActions.openFile.done
  }
}

const styles = (theme: Theme) => createStyles({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.unit * 3,
    height: "calc(100% - 64px)",
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
});

@connect(
  (state: any): Pick<WelcomePage.Props, "files"> => {
    const files = state.files
    return { files };
  },
  (dispatch: Dispatch): Pick<WelcomePage.Props, 'openFile'> => ({
    openFile: bindActionCreators(fileActions.openFile.started, dispatch)
  })
)
class WelcomePage extends React.Component<WelcomePage.Props> {
  static defaultProps: Partial<WelcomePage.Props> = {
  };

  constructor(props: WelcomePage.Props, context?: any) {
    super(props, context);

    this.handleOpenFile = this.handleOpenFile.bind(this);
  }

  handleOpenFile(){
    this.props.openFile(remote.dialog.showOpenDialog({ properties: ['openFile'] })[0]);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.page}>
        <Typography variant="h3">Welcome</Typography>

        <Typography paragraph>
          Please import a Protobuf file to get started.
        </Typography>

        <Button variant="contained" color="primary" onClick={this.handleOpenFile}>
          <Icon className={classes.leftIcon}>open_in_browser</Icon>Open .proto file
        </Button>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(WelcomePage);