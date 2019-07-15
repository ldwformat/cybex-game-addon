import { CoreState } from "../core.models";
import { AuthStatus, LoginPanel } from "./auth.models";
export declare const selectAuth: (state: CoreState) => import("./auth.models").AuthState;
export declare const selectCurrentAccountInfo: import("reselect").OutputSelector<CoreState, Cybex.Account | null, (res: import("./auth.models").AuthState) => Cybex.Account | null>;
export declare const selectCurrentAccount: import("reselect").OutputSelector<CoreState, string | null, (res: import("./auth.models").AuthState) => string | null>;
export declare const selectCurrentKeystore: import("reselect").OutputSelector<CoreState, import("./keystore/keystore").KeyStore | null, (res: import("./auth.models").AuthState) => import("./keystore/keystore").KeyStore | null>;
export declare const selectAuthStatus: import("reselect").OutputSelector<CoreState, AuthStatus, (res1: import("./auth.models").AuthState, res2: import("./keystore/keystore").KeyStore | null) => AuthStatus>;
export declare const selectAuthIsLogging: import("reselect").OutputSelector<CoreState, boolean, (res: import("./auth.models").AuthState) => boolean>;
export declare const selectKeyStoreCipher: import("reselect").OutputSelector<CoreState, string | null, (res: import("./auth.models").AuthState) => string | null>;
export declare const selectAuthModal: import("reselect").OutputSelector<CoreState, boolean, (res: import("./auth.models").AuthState) => boolean>;
export declare const selectSetPassModal: import("reselect").OutputSelector<CoreState, boolean, (res: import("./auth.models").AuthState) => boolean>;
export declare const selectUnlockModal: import("reselect").OutputSelector<CoreState, boolean, (res: import("./auth.models").AuthState) => boolean>;
export declare const selectUnlockCounter: import("reselect").OutputSelector<CoreState, number, (res: import("./auth.models").AuthState) => number>;
export declare const selectAuthSet: import("reselect").OutputSelector<CoreState, false | {
    account: string;
    key: import("../../cybex/ecc/src/PrivateKey").default;
}, (res1: AuthStatus, res2: string | null, res3: import("./keystore/keystore").KeyStore | null) => false | {
    account: string;
    key: import("../../cybex/ecc/src/PrivateKey").default;
}>;
export declare const selectBalances: import("reselect").OutputSelector<CoreState, import("./auth.models").BalanceObj, (res: import("./auth.models").AuthState) => import("./auth.models").BalanceObj>;
export declare const selectLoginPanel: import("reselect").OutputSelector<CoreState, LoginPanel | LoginPanel.Unlock, (res1: string | null, res2: import("./auth.models").AuthState) => LoginPanel | LoginPanel.Unlock>;
export declare const selectRegCaptcha: import("reselect").OutputSelector<CoreState, import("./auth.models").FaucetCaptcha | null, (res: import("./auth.models").AuthState) => import("./auth.models").FaucetCaptcha | null>;
export declare const selectDefaultReferer: import("reselect").OutputSelector<CoreState, string | null, (res: import("./auth.models").AuthState) => string | null>;
