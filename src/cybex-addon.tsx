import ReactDOM from "react-dom";
import * as React from "react";
import { Provider } from "react-redux";
import { configureStore, CoreState } from "./core";
import { Store } from "redux";
import { config as defaultConfig } from "./config";
import { Login } from "./pages";
import { selectAuthSet } from "./core/auth/auth.selectors";
import { EventEmitter } from "events";
import { EVENT_ACTION } from "./core/modes";

export class CybexAddon {
  static EVENT_ACTION = EVENT_ACTION;

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
        <Page />
      </Provider>,
      rootElement,
      () => resolve(rootElement)
    );

  async loginPage(rootElement: HTMLElement) {
    return new Promise(resolve => this.bootstrap(Login)(rootElement, resolve));
  }
}
