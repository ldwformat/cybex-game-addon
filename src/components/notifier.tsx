import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withSnackbar, InjectedNotistackProps, OptionsObject } from "notistack";
import { coreRemoveNoti } from "../core/core.actions";
import { selectNoties } from "./../core/core.selectors";
import { Noti } from "../core/core.models";
const mapStateToProps = state => ({
  notifications: selectNoties(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ removeSnackbar: coreRemoveNoti }, dispatch);

export const Notifier = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withSnackbar(
    class extends Component<
      InjectedNotistackProps & {
        notifications: Noti[];
        removeSnackbar: typeof coreRemoveNoti;
      }
    > {
      displayed: string[] = [];

      storeDisplayed = id => {
        this.displayed = [...this.displayed, id];
      };

      shouldComponentUpdate({ notifications: newSnacks = [] as Noti[] }) {
        const { notifications: currentSnacks } = this.props;
        let notExists = false;
        for (let i = 0; i < newSnacks.length; i += 1) {
          if (notExists) {
            continue;
          }
          notExists =
            notExists ||
            !currentSnacks.filter(({ key }) => newSnacks[i].key === key).length;
        }
        return notExists;
      }

      componentDidUpdate() {
        const { notifications = [] } = this.props;

        notifications.forEach(notification => {
          // Do nothing if snackbar is already displayed
          if (this.displayed.includes(notification.key)) {
            return;
          }
          // Display snackbar using notistack
          this.props.enqueueSnackbar(
            notification.message,
            notification.options
          );
          // Keep track of snackbars that we've displayed
          this.storeDisplayed(notification.key);
          // Dispatch action to remove snackbar from redux store
          this.props.removeSnackbar(notification.key);
        });
      }

      render() {
        return null;
      }
    }
  )
);
