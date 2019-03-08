import { MallBackendCountry, MallBackendProvince } from "../../utils/fetcher";
export declare class Chore {
    countryList: MallBackendCountry[];
    proviceMap: {
        [countryID: number]: MallBackendProvince[];
    };
}
export declare class MallState {
    chore: Chore;
}
