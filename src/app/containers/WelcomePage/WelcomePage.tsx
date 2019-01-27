import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { RouteComponentProps } from 'react-router';
import { withStyles, Theme, createStyles, WithStyles, Typography, Button, Icon, Stepper, Step, StepLabel, TextField, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide } from '@material-ui/core';
import { remote } from 'electron';
import * as fileActions from '../../store/files/files.actions';
import { configureService } from 'app/store/service/service.action';
import * as classNames from 'classnames';
import { SlideProps } from '@material-ui/core/Slide';

export namespace WelcomePage {
  export interface Props extends RouteComponentProps<void>, WithStyles<typeof styles> {
    theme: Theme;

    openFile: typeof fileActions.openFile.started;
    files: typeof fileActions.openFile.done

    configureService: typeof configureService
  }

  export interface IState {
    activeStep: number
    filepath?: string
    serviceHost?: string
    servicePort?: number

    uploadDialogOpen: boolean
  }
  
}

function Transition(props: SlideProps) {
  return <Slide direction="up" {...props} />;
}

const styles = (theme: Theme) => createStyles({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.unit * 10,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  root: {
    width: '100%',
    height: "calc(100% - 64px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  nextButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  stepWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stepsWrapper: {
    width: "100%",
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  stepsButtonwWrapper: {
    width:"100%",
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing.unit * 10,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing.unit * 2
  }
});

export const getSteps = () => {
  return ['Upload gRPC proto file', 'Set service endpoint', 'Service TLS'];
}

@connect(
  (state: any): Pick<WelcomePage.Props, "files"> => {
    const files = state.files
    return { files };
  },
  (dispatch: Dispatch): Pick<WelcomePage.Props, 'openFile' | 'configureService'> => ({
    openFile: bindActionCreators(fileActions.openFile.started, dispatch),
    configureService: bindActionCreators(configureService, dispatch),
  })
)
class WelcomePage extends React.Component<WelcomePage.Props, WelcomePage.IState> {
  static defaultProps: Partial<WelcomePage.Props> = {
  };

  constructor(props: WelcomePage.Props, context?: any) {
    super(props, context);

    this.handleOpenFile = this.handleOpenFile.bind(this);

    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.handleSetHost = this.handleSetHost.bind(this);
    this.handleSetPort = this.handleSetPort.bind(this);
    this.handleUploadDialogAction = this.handleUploadDialogAction.bind(this);
    this.state = {
      activeStep: 0,
      uploadDialogOpen: false,
    }
  }

  handleOpenFile(){
    // this.props.openFile(remote.dialog.showOpenDialog({ properties: ['openFile'] })[0]);
    const dialogResult = remote.dialog.showOpenDialog({ properties: ['openFile'] });
    if (dialogResult && dialogResult.length) {
      console.log(dialogResult)
      this.setState({
        filepath: dialogResult[0],
      })
    }
  }

  canProceed(step: number): boolean {
    switch(step){
      case 0:
        if (!this.state.filepath) {
          this.handleUploadDialogAction(true)();
          return false;
        }
        return true;
      case 1:
        return true;
      case 2:
        return true;
      default:
        return false;
    }
  }

  handleNext() {
    if (this.canProceed(this.state.activeStep)) {
      this.setState(state => ({
        activeStep: state.activeStep + 1,
      }));
    }
  };

  handleBack() {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleStep(step: number) {
    if (step > 0 && step < getSteps().length) {
      this.setState({
        activeStep: step,
      });
    }
  };


  handleReset() {
    this.setState({
      activeStep: 0,
    });
  };

  handleSetPort(e: any) {
    this.setState({
      servicePort: parseInt(e.target.value, 10),
    });
  };

  handleSetHost(e: any) {
    this.setState({
      serviceHost: e.target.value,
    });
  };

  handleFinish() {
    if (!this.state.serviceHost) {
      // TODO: handle error
      this.handleStep(1);
      return;
    }
    if (!this.state.servicePort) {
      // TODO: handle error
      this.handleStep(1);
      return;
    }
    if (!this.state.filepath) {
      // TODO: handle error
      this.handleStep(0);
      return;
    }
    this.props.configureService({
      host: this.state.serviceHost,
      port: 8787687
    })
    
    this.props.openFile(this.state.filepath);
  };

  getStepContent(stepIndex: number) {
    const { classes } = this.props;
    switch (stepIndex) {
      case 0:
        return (
          <div className={classes.stepWrapper}>
            <Typography variant="h3">Welcome</Typography>
            
            <Typography paragraph>
              Please import a Protobuf file to get started.
            </Typography>

            <Button variant="contained" color="primary" onClick={this.handleOpenFile}>
              <Icon className={classes.leftIcon}>open_in_browser</Icon>Open .proto file
            </Button>
          </div>
        );
      case 1:
        return (
          <div className={classes.stepWrapper}>
            <Paper className={classNames(classes.paper)}>
              <Typography variant="h5">Service settings</Typography>
              <TextField
                label="Service address"
                className={classNames(classes.textField)}
                onBlur={this.handleSetHost}
                margin="dense"
                type="text"
                />
              <TextField
                id="standard-number"
                label="Service port"
                type="number"
                className={classes.textField}
                onBlur={this.handleSetPort}
                margin="normal"
                />
            </Paper>
          </div>
        );
      case 2:
      return (
        <div className={classes.stepWrapper}>
          <Paper className={classNames(classes.paper)}>
            <Typography variant="h5">Service TLS</Typography>
            <Typography paragraph>Coming soon</Typography>
          </Paper>
        </div>
      );
      default:
        return 'Unknown stepIndex';
    }
  }

  handleUploadDialogAction(open: boolean) {
    return () => {
      this.setState({
        uploadDialogOpen: open,
      })
    }
  }

  getUploadModal() {
    return (
      <Dialog
        open={this.state.uploadDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleUploadDialogAction(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Missing protobuf file!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please, select a protobuf file to continue.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleUploadDialogAction(false)} color="primary">
            OK!
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep, uploadDialogOpen } = this.state;
    return (
      <div className={classes.root}>
        {
          uploadDialogOpen && this.getUploadModal()
        }
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className={classes.page}>
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>All steps completed</Typography>
              <Button onClick={this.handleReset}>Reset</Button>
              <Button onClick={this.handleFinish}>Finish</Button>
            </div>
          ) : (
            <div className={classes.stepsWrapper}>
              {
                this.getStepContent(activeStep)
              }
              <div className={classes.stepsButtonwWrapper}>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                  className={classes.nextButton}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(WelcomePage);