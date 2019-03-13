import ReactDOM from "react-dom";
import * as React from "react";
import { Provider } from "react-redux";
import { configureStore } from "./core";
import { Store } from "redux";
import {
  config as defaultConfig,
  CybexAddonConfig,
  CybexAddonConfigOptions
} from "./config";
import { EventEmitter } from "events";
import { EVENT_ACTION, IEffectDeps } from "./core/modes";
import { authShowModal, authLogout } from "./core/auth";
import { CoreState } from "./core/core.models";
import { Notifier } from "./components/notifier";
import { SnackbarProvider } from "notistack";
import {
  createMuiTheme,
  MuiThemeProvider,
  createGenerateClassName
} from "@material-ui/core";
import JssProvider from "react-jss/lib/JssProvider";
import { SheetsRegistry } from "jss";
import { ToolsetContext } from "./providers/toolset";
import { InviteBtn } from "./components/invite-btn";
import { merge } from "lodash";

declare const process: any;
declare const global: any;
function createPageContext() {
  return {
    sheetsManager: new Map(),
    sheetsRegistry: new SheetsRegistry(),
    generateClassName: createGenerateClassName()
  };
}

import { i18n } from "./providers/i18n";
import { Action } from "rxjs/internal/scheduler/Action";
import { setRefUrl } from "./core/core.actions";

export function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    try {
      return createPageContext();
    } catch (e) {
      console.error(e);
    }
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return global.__INIT_MATERIAL_UI__;
}

export class CybexAddon {
  static EVENT_ACTION = EVENT_ACTION;
  static OVERLAY_CONTAINER_ID = "$OVERLAY_CONTAINER_ID";
  static INVATION_OVERLAY_CONTAINER_ID = "$INVATION_OVERLAY_CONTAINER_ID";
  i18n = i18n;
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
  constructor(
    config: CybexAddonConfigOptions = defaultConfig,
    public pageContext = getPageContext()
  ) {
    this.config = merge({}, defaultConfig, config);
    if (typeof window !== undefined) {
      window.addEventListener("popstate", e => {
        Array.from(document.body.children)
          .filter(
            node =>
              node.attributes["role"].value === "presentation" ||
              node.attributes["role"].value === "dialog"
          )
          .forEach(node => node.remove());
      });
    }
    i18n.changeLanguage(this.config.lang);
  }

  async init() {
    if (!this.store) {
      let { store, notifier, toolset } = await configureStore(this.config)({
        game: this.config.game,
        referUrl: this.config.referUrl
      });
      this.toolset = toolset;
      this.notifier = notifier;
      this.store = store;
    }

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
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          <MuiThemeProvider theme={this.theme}>
            <SnackbarProvider maxSnack={3}>
              <Notifier />
            </SnackbarProvider>
            <ToolsetContext.Provider value={{ toolset: this.toolset }}>
              <Page {...props} />
            </ToolsetContext.Provider>
          </MuiThemeProvider>
        </JssProvider>
      </Provider>,
      rootElement,
      () => resolve(rootElement)
    );

  async setLang(lang: string) {
    return this.i18n.changeLanguage(lang);
  }
  async setRefUrl(url: string) {
    if (!this.store) {
      return;
    }
    return this.store.dispatch(setRefUrl(url));
  }

  async loginPage() {
    if (this.store) {
      this.store.dispatch(authShowModal());
    }
    return import("./pages/login")
      .then(module => module.Login)
      .then(Login => new Promise(resolve => this.patchPage(Login, resolve)));
  }
  logout() {
    if (this.store) {
      this.store.dispatch(authLogout());
    }
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
  hideInviteBtn() {
    let rootContainer = document.getElementById(
      CybexAddon.INVATION_OVERLAY_CONTAINER_ID
    );
    if (rootContainer) {
      rootContainer.remove();
    }
  }
  async depositPage(root: HTMLElement) {
    return import("./pages/deposit")
      .then(module => module.Deposit)
      .then(
        Deposit =>
          new Promise(resolve => this.bootstrap(Deposit)(root, resolve))
      );
  }
  async referPage(root: HTMLElement) {
    return import("./pages/refer")
      .then(module => module.Refer)
      .then(
        Refer => new Promise(resolve => this.bootstrap(Refer)(root, resolve))
      );
  }
  async referRulePage(root: HTMLElement) {
    return import("./pages/refer-rule")
      .then(module => module.ReferRule)
      .then(
        ReferRule =>
          new Promise(resolve => this.bootstrap(ReferRule)(root, resolve))
      );
  }
}
