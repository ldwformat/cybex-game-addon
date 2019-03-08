var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import { coreRemoveNoti } from "../core/core.actions";
import { selectNoties } from "./../core/core.selectors";
import { withTranslation } from "react-i18next";
var mapStateToProps = function (state) { return ({
    notifications: selectNoties(state)
}); };
var mapDispatchToProps = function (dispatch) {
    return bindActionCreators({ removeSnackbar: coreRemoveNoti }, dispatch);
};
export var Notifier = connect(mapStateToProps, mapDispatchToProps)(withSnackbar(withTranslation()(/** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayed = [];
        _this.storeDisplayed = function (id) {
            _this.displayed = _this.displayed.concat([id]);
        };
        return _this;
    }
    class_1.prototype.shouldComponentUpdate = function (_a) {
        var _b = _a.notifications, newSnacks = _b === void 0 ? [] : _b;
        var currentSnacks = this.props.notifications;
        var notExists = false;
        var _loop_1 = function (i) {
            if (notExists) {
                return "continue";
            }
            notExists =
                notExists ||
                    !currentSnacks.filter(function (_a) {
                        var key = _a.key;
                        return newSnacks[i].key === key;
                    })
                        .length;
        };
        for (var i = 0; i < newSnacks.length; i += 1) {
            _loop_1(i);
        }
        return notExists;
    };
    class_1.prototype.componentDidUpdate = function () {
        var _this = this;
        var _a = this.props, _b = _a.notifications, notifications = _b === void 0 ? [] : _b, t = _a.t;
        notifications.forEach(function (notification) {
            // Do nothing if snackbar is already displayed
            if (_this.displayed.includes(notification.key)) {
                return;
            }
            // Display snackbar using notistack
            _this.props.enqueueSnackbar(notification && notification.options && notification.options.i18n
                ? t(notification.message)
                : notification.message, notification.options);
            // Keep track of snackbars that we've displayed
            _this.storeDisplayed(notification.key);
            // Dispatch action to remove snackbar from redux store
            _this.props.removeSnackbar(notification.key);
        });
    };
    class_1.prototype.render = function () {
        return null;
    };
    return class_1;
}(Component)))));
