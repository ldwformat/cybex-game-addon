import { ReferState } from "./refer.models";
import { ReferActions } from "./refer.actions";
export var refer = function (state, action) {
    if (state === void 0) { state = new ReferState(); }
    switch (action.type) {
        case ReferActions.LoadReferInfoSuccess:
            return action.payload;
        default:
            return state;
    }
};
