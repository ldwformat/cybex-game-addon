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
import { gatewaySelectAsset } from "../core/gateway";
import { selectGateway } from "../core/gateway/gateway.selectors";
import { withStyles } from "@material-ui/core";
var mapStateToProps = function (state) { return ({
    gateway: selectGateway(state)
}); };
var mapDispatchToProps = function (dispatch) { return ({
    selectAsset: gatewaySelectAsset
}); };
var styles = function (theme) { return ({
    root: {}
}); };
var Deposit = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(/** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return class_1;
}(React.Component))));
