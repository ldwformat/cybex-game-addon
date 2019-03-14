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
  GatewayFetcher,
  FaucetFetcher
} from "../utils/fetcher";
import {
  AuthState,
  auth,
  loginEpic,
  loginCloseEpic,
  loginFailedEpic,
  updateBalanceEpic,
  authUpdateBalanceEpic,
  captchaEpic,
  regPanelCaptchaEpic,
  authRegEpic,
  regFailedEpic
} from "./auth";
import { MallState, mall, loadCountriesEpic, loadProvincesEpic } from "./mall";
import {
  ReferState,
  refer,
  loadReferInfoEpic,
  addReferEpic,
  addReferAfterLoginEpic,
  addRefFailedEpic
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
import { rootReducer } from "./core.reducers";
import { CoreState } from "./core.models";
import { CybexAddonConfig } from "../config";
import { addonStorage } from "../utils/storage";
export * from "./core.models";
const loggerMiddleware = createLogger();

const rootEpic = combineEpics(
  loginEpic,
  regPanelCaptchaEpic,
  addRefFailedEpic,
  authRegEpic,
  captchaEpic,
  regFailedEpic,
  loginCloseEpic,
  loginFailedEpic,
  loadCountriesEpic,
  loadProvincesEpic,
  loadReferInfoEpic,
  loadDepsoitInfoEpic,
  loadDpstAfterSelAssetEpic,
  authUpdateBalanceEpic,
  updateBalanceEpic,
  loadGatewayInfoEpic,
  addReferEpic,
  addReferAfterLoginEpic,
  notifierEpic
);

export const configureStore = (config: CybexAddonConfig) => async (
  preloadState?: DeepPartial<CoreState>
) => {
  let {
    cybexWs,
    cybexHttpServer,
    mallBackend,
    referBackend,
    faucet,
    gateway,
    backend
  } = config.apiUrl;
  let wsConnect = new WsConnection({ url: cybexWs });
  let notifier = new EventEmitter();
  await wsConnect.connect();
  const toolset: IEffectDeps = {
    fetcher: new ChainFetcher(cybexWs, cybexHttpServer),
    faucet: new FaucetFetcher(faucet),
    mallFetcher: new MallFetcher(mallBackend),
    gatewayFetcher: new GatewayFetcher(gateway),
    backendFetcher: new BackendFetcher(backend),
    referFetcher: new ReferFetcher(referBackend),
    chainAssisant: new CybexAssistant(wsConnect),
    storage: addonStorage,
    notifier
  };
  const epicMiddleware = createEpicMiddleware({
    dependencies: toolset
  });

  let store = createStore(
    rootReducer,
    preloadState,
    applyMiddleware(
      // loggerMiddleware,
      epicMiddleware
    )
  );

  epicMiddleware.run(rootEpic);
  return { store, notifier, toolset };
};
