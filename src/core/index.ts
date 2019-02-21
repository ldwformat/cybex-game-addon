import { createStore, applyMiddleware, combineReducers, Reducer } from "redux";
import { createLogger } from "redux-logger";
import { createEpicMiddleware, combineEpics } from "redux-observable";
import {
  ChainFetcher,
  MallFetcher,
  BackendFetcher,
  ReferFetcher
} from "../utils/fetcher";
import { config } from "../config";
import { AuthState, auth, loginEpic } from "./auth";
import { MallState, mall, loadCountriesEpic, loadProvincesEpic } from "./mall";
const loggerMiddleware = createLogger();

// RootState
export class CoreState {
  public auth = new AuthState();
  public mall = new MallState();
}

const rootEpic = combineEpics(loginEpic, loadCountriesEpic, loadProvincesEpic);

const rootReducer: Reducer<CoreState> = combineReducers({
  auth,
  mall
});

export function configureStore(preloadState?) {
  let {
    cybexWs,
    cybexHttpServer,
    mallBackend,
    referBackend,
    backend
  } = config.apiUrl;

  const epicMiddleware = createEpicMiddleware({
    dependencies: {
      fetcher: new ChainFetcher(cybexWs, cybexHttpServer),
      mallFetcher: new MallFetcher(mallBackend),
      addressFetcher: new BackendFetcher(backend),
      referFetcher: new ReferFetcher(referBackend)
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
