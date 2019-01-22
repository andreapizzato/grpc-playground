import * as React from 'react';
import { withStyles, Theme, createStyles, WithStyles, Typography } from '@material-ui/core';

export namespace UploadDonePage {
  export interface IProps extends WithStyles<typeof styles>{}
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

const UploadDonePage: React.SFC<UploadDonePage.IProps> = (props) =>  {
    return (
      <div className={props.classes.page}>
        <Typography variant="h3">Succes!</Typography>
        <Typography variant="h5">
          Protobuf file has been succesfuly imported!.
        </Typography>

        <Typography paragraph>
          Please, select a method from the left menu to start gRPC!
        </Typography>
      </div>
    );
}

export default withStyles(styles, { withTheme: true })(UploadDonePage);