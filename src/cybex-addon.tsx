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
import { authShowModal, authLogout } from "./core/auth";
import { CoreState } from "./core/core.models";
import { Notifier } from "./components/notifier";
import { SnackbarProvider } from "notistack";
import { Deposit } from "./pages/deposit";
import {
  createMuiTheme,
  MuiThemeProvider,
  createGenerateClassName
} from "@material-ui/core";
import JssProvider from "react-jss/lib/JssProvider";
import { SheetsRegistry } from "jss";
import { Refer } from "./pages/refer";
import { ReferRule } from "./pages/refer-rule";
import { ToolsetContext } from "./providers/toolset";
import { InviteBtn } from "./components/invite-btn";
import { merge } from "lodash";

declare const process: any;
declare const global: any;
function createPageContext() {
  return {
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName()
  };
}

import { i18n } from "./providers/i18n";

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
    config: CybexAddonConfig = defaultConfig,
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
    i18n.changeLanguage(config.lang);
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

  async loginPage() {
    if (this.store) {
      this.store.dispatch(authShowModal());
    }
    return new Promise(resolve => this.patchPage(Login, resolve));
  }
  async logout() {
    if (this.store) {
      this.store.dispatch(authLogout());
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
  hideInviteBtn() {
    let rootContainer = document.getElementById(
      CybexAddon.INVATION_OVERLAY_CONTAINER_ID
    );
    if (rootContainer) {
      rootContainer.remove();
    }
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
