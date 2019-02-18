import { createStore, applyMiddleware, combineReducers, Reducer } from "redux";
import { AuthState, auth, loginEpic } from "./auth";
import { createLogger } from "redux-logger";
import { createEpicMiddleware, combineEpics } from "redux-observable";
import { ChainFetcher } from "../utils/fetcher";
import { config } from "../config";

const loggerMiddleware = createLogger();

// RootState
export class CoreState {
  public auth = new AuthState();
}

const rootEpic = combineEpics(loginEpic);

const rootReducer: Reducer<CoreState> = combineReducers({
  auth
});

export function configureStore(preloadState?) {
  let { cybexWs, cybexHttpServer } = config.apiUrl;

  const epicMiddleware = createEpicMiddleware({
    dependencies: {
      fetcher: new ChainFetcher(cybexWs, cybexHttpServer)
    }
  });

  let store = createStore(
    rootReducer,
    preloadState,
    // applyMiddleware(epicMiddleware)
    applyMiddleware(loggerMiddleware, epicMiddleware)
  );

  epicMiddleware.run(rootEpic);
  return store;
}
