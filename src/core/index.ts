import { createStore, applyMiddleware, combineReducers, Reducer } from "redux";
import { AuthState, auth } from "./auth";
import { createLogger } from "redux-logger";

const loggerMiddleware = createLogger();

export class CoreState {
  public auth = new AuthState();
}

const rootReducer: Reducer<CoreState> = combineReducers({
  auth
});

export function configureStore(preloadState?) {
  return createStore(
    rootReducer,
    preloadState,
    applyMiddleware(loggerMiddleware)
  );
}
