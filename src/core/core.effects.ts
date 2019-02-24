import { Epic } from "redux-observable";
import { CoreState } from ".";
import { IEffectDeps, EVENT_ACTION } from "./modes";
import { switchMap } from "rxjs/operators";
import { NEVER } from "rxjs";

export const notifierEpic: Epic<any, any, CoreState, IEffectDeps> = (
  action$,
  state$,
  { notifier }
) =>
  action$.pipe(
    switchMap(action =>
      state$.pipe(state => {
        notifier.emit(EVENT_ACTION, { action, state });
        return NEVER;
      })
    )
  );
