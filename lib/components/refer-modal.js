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
import { selectCurrentAccount } from "../core/auth/auth.selectors";
import { Dialog, withStyles, IconButton, DialogActions, DialogContent } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { Subject } from "rxjs";
import { take } from "rxjs/operators";
import { PrimaryButton, renderTextField } from "./form-utils";
import { selectReferLoading, referAdd, selectMyGameReferrer } from "../core/refer";
import { selectGame } from "../core/core.selectors";
import { Form, Field } from "react-final-form";
import { Dict } from "../providers/i18n";
import { withTranslation } from "react-i18next";
var validate = function (values) {
    var errors = {};
    var requiredFields = ["referrer"];
    requiredFields.forEach(function (field) {
        if (!values[field]) {
            errors[field] = "Required";
        }
    });
    return errors;
};
export var ReferModalForm = withTranslation()(/** @class */ (function (_super) {
    __extends(ReferModalForm, _super);
    function ReferModalForm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReferModalForm.prototype.render = function () {
        var _a = this.props, onSubmit = _a.onSubmit, t = _a.t;
        var styleOfContent = {
            width: "90%",
            minWidth: "70vw",
            padding: 0,
            margin: "10px 16px"
        };
        return (React.createElement(Form, { onSubmit: onSubmit, validate: validate, render: function (_a) {
                var handleSubmit = _a.handleSubmit, reset = _a.reset, submitting = _a.submitting, pristine = _a.pristine, invalid = _a.invalid, values = _a.values;
                return (React.createElement("form", { onSubmit: handleSubmit },
                    React.createElement(DialogContent, { style: styleOfContent },
                        React.createElement("div", { style: { marginBottom: "1em" } },
                            React.createElement(Field, { autoFocus: true, style: { width: "100%" }, component: renderTextField, name: "referrer", label: t(Dict.PatchReferrerLabel), helperText: t(Dict.PatchReferrerHelper) }))),
                    React.createElement(DialogActions, { style: { margin: "8px 12px" } },
                        React.createElement(PrimaryButton, { color: "primary", fullWidth: true, type: "submit", disabled: pristine || submitting || invalid }, t(Dict.PatchReferrerAdd)))));
            } }));
    };
    return ReferModalForm;
}(React.Component)));
var mapStateToProps = function (state) { return ({
    isLogging: selectReferLoading(state),
    account: selectCurrentAccount(state),
    myGameReferrer: selectMyGameReferrer(state),
    game: selectGame(state)
}); };
var mapDispatch = {
    addRefer: referAdd
};
var styles = function (theme) { return ({
    paper: {
        position: "relative",
        margin: 0,
        padding: "16px 0 8px 0"
    }
}); };
var ReferModalClass = withStyles(styles)(/** @class */ (function (_super) {
    __extends(ReferModal, _super);
    function ReferModal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.logging$ = new Subject();
        _this.componentDidUpdate = function (prevProps, prevState) {
            if (prevProps.isLogging && !_this.props.isLogging) {
                _this.logging$.next(false);
            }
        };
        _this.onSubmit = function (_a) {
            var referrer = _a.referrer;
            return new Promise(function (resolve, reject) {
                _this.props.addRefer({
                    referrer: referrer,
                    account: _this.props.account,
                    action: _this.props.game,
                    withNoti: true
                });
                _this.logging$
                    .pipe(take(1))
                    .subscribe(function () { return setTimeout(resolve, 2000); }, reject);
            });
        };
        return _this;
    }
    ReferModal.prototype.render = function () {
        var _a = this.props, classes = _a.classes, onModalClose = _a.onModalClose, isModalShowing = _a.isModalShowing, myGameReferrer = _a.myGameReferrer;
        return (React.createElement(Dialog, { open: isModalShowing && !myGameReferrer, 
            // disableBackdropClick
            classes: classes && { paper: classes.paper }, maxWidth: "lg", onClose: onModalClose },
            React.createElement("div", { style: { position: "absolute", right: 0, top: 0 } },
                React.createElement(IconButton, { onClick: onModalClose },
                    React.createElement(CloseIcon, null))),
            React.createElement(ReferModalForm, { onSubmit: this.onSubmit })));
    };
    return ReferModal;
}(React.Component)));
export var ReferModal = connect(mapStateToProps, mapDispatch)(ReferModalClass);
