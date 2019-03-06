import * as React from "react";
import {
  connect,
  MapStateToPropsParam,
  MapStateToProps,
  MapDispatchToProps
} from "react-redux";
import { selectCurrentAccount } from "../core/auth/auth.selectors";
import { CoreState } from "../core/core.models";
import {
  Button,
  Dialog,
  withStyles,
  StyledComponentProps,
  IconButton,
  Typography,
  DialogActions,
  DialogContent
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { Subject } from "rxjs";
import { take } from "rxjs/operators";
import { PositionProperty } from "csstype";
import { PrimaryButton, renderTextField } from "./form-utils";
import {
  selectReferLoading,
  referAdd,
  selectMyGameReferrer
} from "../core/refer";
import { selectGame } from "../core/core.selectors";
import { Form, Field } from "react-final-form";

const validate = values => {
  const errors: any = {};
  const requiredFields = ["referrer"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  return errors;
};

export const ReferModalForm = class ReferModalForm extends React.Component<
  any
> {
  render() {
    const { onSubmit } = this.props as any;
    const styleOfContent = {
      width: "90%",
      minWidth: "70vw",
      padding: 0,
      margin: "10px 16px"
    };
    return (
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({
          handleSubmit,
          reset,
          submitting,
          pristine,
          invalid,
          values
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent style={styleOfContent}>
              <div style={{ marginBottom: "1em" }}>
                <Field
                  autoFocus
                  style={{ width: "100%" }}
                  component={renderTextField as any}
                  name="referrer"
                  label="推荐码"
                  helperText="请输入推荐人分享给您的推荐码"
                />
              </div>
            </DialogContent>
            <DialogActions style={{ margin: "8px 12px" }}>
              <PrimaryButton
                color="primary"
                fullWidth
                type="submit"
                disabled={pristine || submitting || invalid}
              >
                增加推荐人
              </PrimaryButton>
            </DialogActions>
          </form>
        )}
      />
    );
  }
};

////////////

type ReferModalPropsDispatch = {
  addRefer: typeof referAdd;
};

type ReferModalPropsState = {
  isLogging: boolean;
  account: string | null;
  myGameReferrer: Backend.Referrer | undefined;
  game: string;
};

const mapStateToProps: MapStateToPropsParam<
  ReferModalPropsState,
  {},
  CoreState
> = state => ({
  isLogging: selectReferLoading(state),
  account: selectCurrentAccount(state),
  myGameReferrer: selectMyGameReferrer(state),
  game: selectGame(state)
});

const mapDispatch: MapDispatchToProps<ReferModalPropsDispatch, {}> = {
  addRefer: referAdd
};

const styles = theme => ({
  paper: {
    position: "relative" as PositionProperty,
    margin: 0,
    padding: "16px 0 8px 0"
  }
});

type ReferModalProps = {
  isModalShowing: boolean;
  onModalClose: () => any;
};

let ReferModalClass = withStyles(styles)(
  class ReferModal extends React.Component<
    StyledComponentProps<"paper"> &
      ReferModalPropsDispatch &
      ReferModalPropsState &
      ReferModalProps
  > {
    logging$ = new Subject();

    componentDidUpdate = (prevProps, prevState) => {
      if (prevProps.isLogging && !this.props.isLogging) {
        this.logging$.next(false);
      }
    };

    onSubmit = ({ referrer }) => {
      return new Promise((resolve, reject) => {
        this.props.addRefer({
          referrer,
          account: this.props.account as string,
          action: this.props.game
        });
        this.logging$
          .pipe(take(1))
          .subscribe(() => setTimeout(resolve, 2000), reject);
      });
    };

    render() {
      let {
        classes,
        onModalClose,
        isModalShowing,
        myGameReferrer
      } = this.props;
      return (
        <Dialog
          open={isModalShowing && !myGameReferrer}
          // disableBackdropClick
          classes={classes && { paper: classes.paper }}
          maxWidth="lg"
          onClose={onModalClose}
        >
          <div style={{ position: "absolute", right: 0, top: 0 }}>
            <IconButton onClick={onModalClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <ReferModalForm onSubmit={this.onSubmit} />
        </Dialog>
      );
    }
  }
);

export const ReferModal = connect(
  mapStateToProps,
  mapDispatch
)(ReferModalClass);
