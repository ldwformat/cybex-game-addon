import {
  createStore,
  applyMiddleware,
  combineReducers,
  Reducer,
  DeepPartial
} from "redux";
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
import {
  ReferState,
  refer,
  loadReferInfoEpic,
  addReferEpic,
  addReferAfterLoginEpic
} from "./refer";
const loggerMiddleware = createLogger();

// RootState
export class CoreState {
  constructor(public game: string) {}
  public auth = new AuthState();
  public mall = new MallState();
  public refer = new ReferState();
}

const rootEpic = combineEpics(
  loginEpic,
  loadCountriesEpic,
  loadProvincesEpic,
  loadReferInfoEpic,
  addReferEpic,
  addReferAfterLoginEpic
);

const rootReducer: Reducer<CoreState> = combineReducers({
  auth,
  mall,
  refer,
  game: (state = "", action) => state
});

export function configureStore(preloadState?: DeepPartial<CoreState>) {
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
