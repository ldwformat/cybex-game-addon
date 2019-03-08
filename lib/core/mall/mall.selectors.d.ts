import { Selector } from "reselect";
import { CoreState } from "../core.models";
import { MallState } from "./mall.models";
export declare const selectMall: Selector<CoreState, MallState>;
export declare const selectMallChore: import("reselect").OutputSelector<CoreState, import("./mall.models").Chore, (res: MallState) => import("./mall.models").Chore>;
export declare const selectMallProvincesMap: import("reselect").OutputSelector<CoreState, {
    [countryID: number]: import("../../utils/fetcher").MallBackendProvince[];
}, (res: import("./mall.models").Chore) => {
    [countryID: number]: import("../../utils/fetcher").MallBackendProvince[];
}>;
export declare const selectCountryList: import("reselect").OutputSelector<CoreState, import("../../utils/fetcher").MallBackendCountry[], (res: import("./mall.models").Chore) => import("../../utils/fetcher").MallBackendCountry[]>;
export declare const selectMallPrvsByCountryID: (countryID: number) => import("reselect").OutputSelector<CoreState, import("../../utils/fetcher").MallBackendProvince[], (res: {
    [countryID: number]: import("../../utils/fetcher").MallBackendProvince[];
}) => import("../../utils/fetcher").MallBackendProvince[]>;
