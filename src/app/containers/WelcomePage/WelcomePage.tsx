import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { RouteComponentProps } from 'react-router';
import { withStyles, Theme, createStyles, WithStyles, Typography, Button, Icon, Stepper, Step, StepLabel } from '@material-ui/core';
import { remote } from 'electron';
import * as fileActions from '../../store/files/files.actions';

export namespace WelcomePage {
  export interface Props extends RouteComponentProps<void>, WithStyles<typeof styles> {
    theme: Theme;

    openFile: typeof fileActions.openFile.started;
    files: typeof fileActions.openFile.done
  }

  export interface IState {
    activeStep: number
    filepath?: string
    serviceHost?: string
    servicePort?: number
  }
  
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
  }
});

export const getSteps = () => {
  return ['Upload gRPC proto file', 'Set service endpoint'];
}

@connect(
  (state: any): Pick<WelcomePage.Props, "files"> => {
    const files = state.files
    return { files };
  },
  (dispatch: Dispatch): Pick<WelcomePage.Props, 'openFile'> => ({
    openFile: bindActionCreators(fileActions.openFile.started, dispatch)
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
    this.state = {
      activeStep: 0,
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

  handleNext() {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack() {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset() {
    this.setState({
      activeStep: 0,
    });
  };

  handleFinish() {
    if (this.state.filepath) {
      this.props.openFile(this.state.filepath);
    }
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
        return 'What is an ad group anyways?';
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'Unknown stepIndex';
    }
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    /* return (
      <div className={classes.page}>
        <Typography variant="h3">Welcome</Typography>

        <Typography paragraph>
          Please import a Protobuf file to get started.
        </Typography>

        <Button variant="contained" color="primary" onClick={this.handleOpenFile}>
          <Icon className={classes.leftIcon}>open_in_browser</Icon>Open .proto file
        </Button>
      </div>
    ); */
    return (
      <div className={classes.root}>
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