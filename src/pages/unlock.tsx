import * as React from "react";
import {
  connect,
  MapStateToPropsParam,
  MapStateToProps,
  MapDispatchToProps
} from "react-redux";
import { selectAuth, selectSetPassModal } from "../core/auth/auth.selectors";
import { CoreState } from "../core/core.models";
import {
  AuthState,
  authUnlock,
  authUnlockModalDismiss
} from "../core/auth";
import {
  Button,
  Dialog,
  withStyles,
  StyledComponentProps,
  IconButton,
  Typography,
  DialogActions
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { take } from "rxjs/operators";
import { PositionProperty } from "csstype";
import { withTranslation, WithTranslation } from "react-i18next";
import { Dict } from "../providers/i18n";

type UnlockPropsDispatch = {
  unlockImpl: typeof authUnlock;
  closeModal: typeof authUnlockModalDismiss;
};

type UnlockPropsState = {
  auth: AuthState;
  isModalShowing: boolean;
};

const mapStateToProps: MapStateToPropsParam<
  { auth: AuthState },
  {},
  CoreState
> = state => ({
  auth: selectAuth(state),
  isModalShowing: selectSetPassModal(state)
});

const mapDispatch: MapDispatchToProps<UnlockPropsDispatch, {}> = {
  unlockImpl: authUnlock,
  closeModal: authUnlockModalDismiss
};

const styles = theme => ({
  paper: {
    position: "relative" as PositionProperty,
    margin: 0,
    width: "90vw",
    padding: "16px 0 8px 0"
  }
});

type UnlockProps = {
  onRegister: () => any;
};

let UnlockClass = withStyles(styles)(
  withTranslation()(
    class Unlock extends React.Component<
      StyledComponentProps<"paper"> &
        UnlockPropsDispatch &
        UnlockPropsState &
        UnlockProps &
        WithTranslation
    > {
      onUnlock = ({ password }) => {
        return new Promise((resolve, reject) => {
          this.props.unlockImpl();
        });
      };

      render() {
        let { classes, closeModal, isModalShowing, t } = this.props;
        return (
          <Dialog
            open={isModalShowing}
            disableBackdropClick
            classes={classes && { paper: classes.paper }}
            maxWidth="lg"
            onClose={closeModal}
          >
            <div style={{ position: "absolute", right: 0, top: 0 }}>
              <IconButton onClick={closeModal}>
                <CloseIcon />
              </IconButton>
            </div>
            {/* <UnlockForm onSubmit={this.onSubmit} /> */}
            <div
              style={{
                textAlign: "center",
                backgroundColor: "#fff",
                position: "sticky",
                padding: "0.5em",
                bottom: "-8px"
              }}
            />
          </Dialog>
        );
      }
    }
  )
);

export const Unlock = connect(
  mapStateToProps,
  mapDispatch
)(UnlockClass);
