import { EVENT_ACTION } from "./modes";
import { switchMap } from "rxjs/operators";
import { NEVER } from "rxjs";
export var notifierEpic = function (action$, state$, _a) {
    var notifier = _a.notifier;
    return action$.pipe(switchMap(function (action) {
        return state$.pipe(function (state) {
            notifier.emit(EVENT_ACTION, { action: action, state: state });
            return NEVER;
        });
    }));
};
