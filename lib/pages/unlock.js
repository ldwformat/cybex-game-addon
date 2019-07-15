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
import * as React from "react";
import { connect } from "react-redux";
import { selectAuth, selectSetPassModal } from "../core/auth/auth.selectors";
import { authUnlock, authUnlockModalDismiss } from "../core/auth";
import { Dialog, withStyles, IconButton } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { withTranslation } from "react-i18next";
var mapStateToProps = function (state) { return ({
    auth: selectAuth(state),
    isModalShowing: selectSetPassModal(state)
}); };
var mapDispatch = {
    unlockImpl: authUnlock,
    closeModal: authUnlockModalDismiss
};
var styles = function (theme) { return ({
    paper: {
        position: "relative",
        margin: 0,
        maxWidth: "536px",
        width: "90vw",
        padding: "16px 0 8px 0"
    }
}); };
var UnlockClass = withStyles(styles)(withTranslation()(/** @class */ (function (_super) {
    __extends(Unlock, _super);
    function Unlock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onUnlock = function (_a) {
            var password = _a.password;
            return new Promise(function (resolve, reject) {
                _this.props.unlockImpl(password);
            });
        };
        return _this;
    }
    Unlock.prototype.render = function () {
        var _a = this.props, classes = _a.classes, closeModal = _a.closeModal, isModalShowing = _a.isModalShowing, t = _a.t;
        return (React.createElement(Dialog, { open: isModalShowing, disableBackdropClick: true, classes: classes && { paper: classes.paper }, maxWidth: "lg", onClose: closeModal },
            React.createElement("div", { style: { position: "absolute", right: 0, top: 0 } },
                React.createElement(IconButton, { onClick: closeModal },
                    React.createElement(CloseIcon, null))),
            React.createElement("div", { style: {
                    textAlign: "center",
                    backgroundColor: "#fff",
                    position: "sticky",
                    padding: "0.5em",
                    bottom: "-8px"
                } })));
    };
    return Unlock;
}(React.Component))));
export var Unlock = connect(mapStateToProps, mapDispatch)(UnlockClass);