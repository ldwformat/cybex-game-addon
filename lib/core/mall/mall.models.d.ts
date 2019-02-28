export declare class Chore {
    countryList: MallBackend.Country[];
    proviceMap: {
        [countryID: number]: MallBackend.Province[];
    };
}
export declare class MallState {
    chore: Chore;
}
