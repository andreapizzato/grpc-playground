import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { withStyles, Theme, createStyles, WithStyles, Typography } from '@material-ui/core';

export namespace StatusBar {
  export interface Props extends RouteComponentProps<void>, WithStyles<typeof styles> {
    theme: Theme;
  }
}

const styles = (theme: Theme) => createStyles({
  statusbar: {
    background: theme.palette.primary.main,
    color: theme.palette.text.primary,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.unit,
    height: '1.5em',
    zIndex: 9999,
  }
});

@connect(
  (state: any): Pick<StatusBar.Props, any> => {
    return {  };
  },
  (dispatch: Dispatch): Pick<StatusBar.Props, any> => ({
    // actions: bindActionCreators(omit(TodoActions, 'Type'), dispatch)
  })
)
class StatusBar extends React.Component<StatusBar.Props> {
  static defaultProps: Partial<StatusBar.Props> = {
  };

  constructor(props: StatusBar.Props, context?: any) {
    super(props, context);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.statusbar}>
        <Typography>Status bar</Typography>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(StatusBar);