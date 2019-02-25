import ReactDOM from "react-dom";
import * as React from "react";
import { Provider } from "react-redux";
import { configureStore } from "./core";
import { Store } from "redux";
import { config as defaultConfig } from "./config";
import { Login } from "./pages";
import { selectAuthSet } from "./core/auth/auth.selectors";
import { EventEmitter } from "events";
import { EVENT_ACTION } from "./core/modes";
import { authShowModal } from "./core/auth";
import { CoreState } from "./core/core.models";
import { Notifier } from "./components/notifier";
import { SnackbarProvider } from "notistack";

export class CybexAddon {
  static EVENT_ACTION = EVENT_ACTION;
  static OVERLAY_CONTAINER_ID = "$OVERLAY_CONTAINER_ID";

  store: Store<CoreState> | null = null;
  notifier: EventEmitter | null = null;

  constructor(public config: CybexAddonConfig = defaultConfig) {}

  async init() {
    let { store, notifier } = await configureStore(this.config)({
      game: this.config.game
    });
    this.notifier = notifier;
    this.store = store;
    return this;
  }

  patchPage = async (
    Page: any,
    resolve: (...args: any[]) => any = () => void 0
  ) => {
    let rootContainer = document.getElementById(
      CybexAddon.OVERLAY_CONTAINER_ID
    );
    if (!rootContainer) {
      rootContainer = document.createElement("div");
      rootContainer.id = CybexAddon.OVERLAY_CONTAINER_ID;
      document.body.appendChild(rootContainer);
    }
    return this.bootstrap(Page)(rootContainer, resolve);
  };

  bootstrap = (Page: any) => async (
    rootElement: HTMLElement,
    resolve: (...args: any[]) => any = () => void 0
  ) =>
    ReactDOM.render(
      <Provider
        store={
          this.store || (await this.init().then(res => res.store as Store))
        }
      >
        <SnackbarProvider maxSnack={3}>
          <Notifier />
        </SnackbarProvider>
        <Page />
      </Provider>,
      rootElement,
      () => resolve(rootElement)
    );

  async loginPage() {
    if (this.store) {
      this.store.dispatch(authShowModal());
    }
    return new Promise(resolve => this.patchPage(Login, resolve));
  }
}
