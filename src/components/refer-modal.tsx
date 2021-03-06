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
  selectMyGameReferrer,
  Referrer
} from "../core/refer";
import { selectGame } from "../core/core.selectors";
import { Form, Field } from "react-final-form";
import { Dict } from "../providers/i18n";
import {
  withTranslation,
  WithTranslation,
  useTranslation
} from "react-i18next";
import { unstable_useMediaQuery } from "@material-ui/core/useMediaQuery";
import { DialogWrapper } from "./dialog-wrapper";

const validate = values => {
  const errors: any = {};
  const requiredFields = ["referrer"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = Dict.PatchReferrerHelper;
    }
  });
  return errors;
};

export const ReferModalForm = props => {
  const { t, i18n } = useTranslation();
  const matches = unstable_useMediaQuery("(min-width:600px)");
  const styleOfContent = {
    padding: 0,
    margin: "16px 0"
  };

  const { onSubmit } = props as any;
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
                label={t(Dict.PatchReferrerLabel)}
                helperText={t(Dict.PatchReferrerHelper)}
              />
            </div>
          </DialogContent>
          <DialogActions style={{ margin: 0 }}>
            <PrimaryButton
              color="primary"
              fullWidth
              style={{ height: "48px", fontSize: "16px", margin: 0 }}
              type="submit"
              disabled={pristine || submitting || invalid}
            >
              {t(Dict.PatchReferrerAdd)}
            </PrimaryButton>
          </DialogActions>
        </form>
      )}
    />
  );
};

////////////

type ReferModalPropsDispatch = {
  addRefer: typeof referAdd;
};

type ReferModalPropsState = {
  isLogging: boolean;
  account: string | null;
  myGameReferrer: Referrer | undefined;
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
          action: this.props.game,
          withNoti: true
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
        <DialogWrapper
          open={isModalShowing && !myGameReferrer}
          onCloseClick={onModalClose}
          title={Dict.PatchReferrerAdd}
          titleProps={{ variant: "h6" }}
        >
          <ReferModalForm onSubmit={this.onSubmit} />
        </DialogWrapper>
      );
    }
  }
);

export const ReferModal = connect(
  mapStateToProps,
  mapDispatch
)(ReferModalClass);
