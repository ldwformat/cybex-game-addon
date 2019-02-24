import {
  createStore,
  applyMiddleware,
  combineReducers,
  Reducer,
  DeepPartial
} from "redux";
import { createLogger } from "redux-logger";
import { createEpicMiddleware, combineEpics, Epic } from "redux-observable";
import {
  ChainFetcher,
  MallFetcher,
  BackendFetcher,
  ReferFetcher,
  GatewayFetcher
} from "../utils/fetcher";
import { AuthState, auth, loginEpic } from "./auth";
import { MallState, mall, loadCountriesEpic, loadProvincesEpic } from "./mall";
import {
  ReferState,
  refer,
  loadReferInfoEpic,
  addReferEpic,
  addReferAfterLoginEpic
} from "./refer";
import {
  GatewayState,
  gateway,
  loadDepsoitInfoEpic,
  loadDpstAfterSelAssetEpic,
  loadGatewayInfoEpic
} from "./gateway";
import { IEffectDeps } from "./modes";
import { CybexAssistant } from "../utils/cybex-assistant";
import { WsConnection } from "../utils/connect";
import { EventEmitter } from "events";
import { notifierEpic } from "./core.effects";
const loggerMiddleware = createLogger();

// RootState
export class CoreState {
  constructor(public game: string) {}
  public auth = new AuthState();
  public mall = new MallState();
  public refer = new ReferState();
  public gateway = new GatewayState();
}

const rootEpic = combineEpics(
  loginEpic,
  loadCountriesEpic,
  loadProvincesEpic,
  loadReferInfoEpic,
  loadDepsoitInfoEpic,
  loadDpstAfterSelAssetEpic,
  loadGatewayInfoEpic,
  addReferEpic,
  addReferAfterLoginEpic,
  notifierEpic
);

const rootReducer: Reducer<CoreState> = combineReducers({
  auth,
  mall,
  refer,
  gateway,
  game: (state = "", action) => state
});

export const configureStore = (config: CybexAddonConfig) => async (
  preloadState?: DeepPartial<CoreState>
) => {
  let {
    cybexWs,
    cybexHttpServer,
    mallBackend,
    referBackend,
    gateway,
    backend
  } = config.apiUrl;
  let wsConnect = new WsConnection({ url: cybexWs });
  let notifier = new EventEmitter();
  await wsConnect.connect();
  const epicMiddleware = createEpicMiddleware({
    dependencies: {
      fetcher: new ChainFetcher(cybexWs, cybexHttpServer),
      mallFetcher: new MallFetcher(mallBackend),
      gatewayFetcher: new GatewayFetcher(gateway),
      backendFetcher: new BackendFetcher(backend),
      referFetcher: new ReferFetcher(referBackend),
      chainAssisant: new CybexAssistant(wsConnect),
      notifier
    }
  });

  let store = createStore(
    rootReducer,
    preloadState,
    // applyMiddleware(epicMiddleware)
    applyMiddleware(loggerMiddleware, epicMiddleware)
  );

  epicMiddleware.run(rootEpic);
  return { store, notifier };
};
