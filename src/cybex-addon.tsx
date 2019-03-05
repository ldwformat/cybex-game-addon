import ReactDOM from "react-dom";
import * as React from "react";
import { Provider } from "react-redux";
import { configureStore } from "./core";
import { Store } from "redux";
import { config as defaultConfig } from "./config";
import { Login } from "./pages";
import { selectAuthSet } from "./core/auth/auth.selectors";
import { EventEmitter } from "events";
import { EVENT_ACTION, IEffectDeps } from "./core/modes";
import { authShowModal } from "./core/auth";
import { CoreState } from "./core/core.models";
import { Notifier } from "./components/notifier";
import { SnackbarProvider } from "notistack";
import { Deposit } from "./pages/deposit";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { Refer } from "./pages/refer";
import { ReferRule } from "./pages/refer-rule";
import { ToolsetContext } from "./providers/toolset";
import { InviteBtn } from "./components/invite-btn";
import { merge } from "lodash";

export class CybexAddon {
  static EVENT_ACTION = EVENT_ACTION;
  static OVERLAY_CONTAINER_ID = "$OVERLAY_CONTAINER_ID";
  static INVATION_OVERLAY_CONTAINER_ID = "$INVATION_OVERLAY_CONTAINER_ID";

  theme = createMuiTheme({
    typography: {
      useNextVariants: true
    },
    palette: {
      primary: {
        main: "rgb(255,98,165)"
      },
      secondary: {
        main: "rgb(255,155,85)"
      }
    }
  });
  store: Store<CoreState> | null = null;
  notifier: EventEmitter | null = null;
  toolset: IEffectDeps | null = null;
  config: CybexAddonConfig;
  constructor(config: CybexAddonConfig = defaultConfig) {
    this.config = merge({}, defaultConfig, config);
  }

  async init() {
    let { store, notifier, toolset } = await configureStore(this.config)({
      game: this.config.game,
      referUrl: this.config.referUrl
    });
    this.toolset = toolset;
    this.notifier = notifier;
    this.store = store;

    return this;
  }

  patchPage = async (
    Page: any,
    resolve: (...args: any[]) => any = () => void 0,
    rootContainer = document.getElementById(CybexAddon.OVERLAY_CONTAINER_ID)
  ) => {
    if (!rootContainer) {
      rootContainer = document.createElement("div");
      rootContainer.id = CybexAddon.OVERLAY_CONTAINER_ID;
      document.body.appendChild(rootContainer);
    }
    return this.bootstrap(Page)(rootContainer, resolve);
  };

  bootstrap = (Page: any, props: any = {}) => async (
    rootElement: HTMLElement,
    resolve: (...args: any[]) => any = () => void 0
  ) =>
    ReactDOM.render(
      <Provider
        store={
          this.store || (await this.init().then(res => res.store as Store))
        }
      >
        <MuiThemeProvider theme={this.theme}>
          <SnackbarProvider maxSnack={3}>
            <Notifier />
          </SnackbarProvider>
          <ToolsetContext.Provider value={{ toolset: this.toolset }}>
            <Page {...props} />
          </ToolsetContext.Provider>
        </MuiThemeProvider>
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

  async showInviteBtn(onClick: (e) => any) {
    let rootContainer = document.getElementById(
      CybexAddon.INVATION_OVERLAY_CONTAINER_ID
    );
    if (!rootContainer) {
      rootContainer = document.createElement("div");
      rootContainer.id = CybexAddon.INVATION_OVERLAY_CONTAINER_ID;
      document.body.appendChild(rootContainer);
    }
    return new Promise(resolve =>
      this.bootstrap(InviteBtn, { onClick })(rootContainer as any, resolve)
    );
  }
  async depositPage(root: HTMLElement) {
    return new Promise(resolve => this.bootstrap(Deposit)(root, resolve));
  }
  async referPage(root: HTMLElement) {
    return new Promise(resolve => this.bootstrap(Refer)(root, resolve));
  }
  async referRulePage(root: HTMLElement) {
    return new Promise(resolve => this.bootstrap(ReferRule)(root, resolve));
  }
}
