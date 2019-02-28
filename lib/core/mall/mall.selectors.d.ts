import { Selector } from "reselect";
import { CoreState } from "../core.models";
import { MallState } from "./mall.models";
export declare const selectMall: Selector<CoreState, MallState>;
export declare const selectMallChore: import("reselect").OutputSelector<CoreState, import("./mall.models").Chore, (res: MallState) => import("./mall.models").Chore>;
export declare const selectMallProvincesMap: import("reselect").OutputSelector<CoreState, {
    [countryID: number]: MallBackend.Province[];
}, (res: import("./mall.models").Chore) => {
    [countryID: number]: MallBackend.Province[];
}>;
export declare const selectCountryList: import("reselect").OutputSelector<CoreState, MallBackend.Country[], (res: import("./mall.models").Chore) => MallBackend.Country[]>;
export declare const selectMallPrvsByCountryID: (countryID: number) => import("reselect").OutputSelector<CoreState, MallBackend.Province[], (res: {
    [countryID: number]: MallBackend.Province[];
}) => MallBackend.Province[]>;
