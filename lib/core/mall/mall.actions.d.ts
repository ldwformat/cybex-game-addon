import { Action, ActionCreator } from "redux";
export declare enum MallActions {
    LoadCountries = "[Mall] Load Countries",
    LoadCountriesSuccess = "[Mall] Load Countries Success",
    LoadCountriesFailed = "[Mall] Load Countries Failed",
    LoadProvinces = "[Mall] LoadProvinces",
    LoadProvincesSuccess = "[Mall] LoadProvincesSuccess",
    LoadProvincesFailed = "[Mall] LoadProvincesFailed",
    LoadAddressBook = "[Mall] LoadAddressBook",
    LoadAddressBookSuccess = "[Mall] LoadAddressBookSuccess",
    LoadAddressBookFailed = "[Mall] LoadAddressBookFailed",
    AddAddress = "[Mall] AddAddress",
    AddAddressSuccess = "[Mall] AddAddressSuccess",
    AddAddressFailed = "[Mall] AddAddressFailed"
}
export declare class MallLoadCountriesAction implements Action {
    readonly type = MallActions.LoadCountries;
}
export declare class MallLoadCountriesFailedAction implements Action {
    readonly type = MallActions.LoadCountriesFailed;
}
export declare class MallLoadCountriesSuccessAction implements Action {
    payload: MallBackend.Country[];
    readonly type = MallActions.LoadCountriesSuccess;
    constructor(payload: MallBackend.Country[]);
}
export declare const mallLoadCountries: () => MallLoadCountriesAction;
export declare const mallLoadCountriesFailed: ActionCreator<MallLoadCountriesFailedAction>;
export declare const mallLoadCountriesSuccess: (countries: MallBackend.Country[]) => MallLoadCountriesSuccessAction;
export declare type MallCountriesAction = MallLoadCountriesAction | MallLoadCountriesFailedAction | MallLoadCountriesSuccessAction;
export declare class MallLoadProvincesAction implements Action {
    payload: number;
    readonly type = MallActions.LoadProvinces;
    constructor(payload: number);
}
export declare class MallLoadProvincesFailedAction implements Action {
    readonly type = MallActions.LoadProvincesFailed;
}
export declare class MallLoadProvincesSuccessAction implements Action {
    payload: {
        countryID: number;
        provinces: MallBackend.Province[];
    };
    readonly type = MallActions.LoadProvincesSuccess;
    constructor(payload: {
        countryID: number;
        provinces: MallBackend.Province[];
    });
}
export declare const mallLoadProvincesFailed: ActionCreator<MallLoadProvincesFailedAction>;
export declare const mallLoadProvinces: (countryID: number) => MallLoadProvincesAction;
export declare const mallLoadProvincesSuccess: (provinceRes: {
    countryID: number;
    provinces: MallBackend.Province[];
}) => MallLoadProvincesSuccessAction;
export declare type MallProvincesAction = MallLoadProvincesAction | MallLoadProvincesSuccessAction | MallLoadProvincesFailedAction;
export declare type MallChoreAction = MallCountriesAction | MallProvincesAction;
export declare class MallLoadAddressBookAction implements Action {
    readonly type = MallActions.LoadAddressBook;
}
export declare class MallLoadAddressBookFailedAction implements Action {
    readonly type = MallActions.LoadAddressBookFailed;
}
export declare class MallLoadAddressBookSuccessAction implements Action {
    payload: Backend.AddressInfo[];
    readonly type = MallActions.LoadAddressBookSuccess;
    constructor(payload: Backend.AddressInfo[]);
}
export declare class MallAddAddressAction implements Action {
    payload: Backend.AddressFormFields;
    readonly type = MallActions.AddAddress;
    constructor(payload: Backend.AddressFormFields);
}
export declare class MallAddAddressSuccessAction implements Action {
    readonly type = MallActions.AddAddressSuccess;
}
export declare class MallAddAddressFailedAction implements Action {
    readonly type = MallActions.AddAddressFailed;
}
export declare const mallLoadAddressBook: () => MallLoadAddressBookAction;
export declare const mallLoadAddressBookFailed: () => MallLoadAddressBookFailedAction;
export declare const mallLoadAddressBookSuccess: (addressBook: Backend.AddressInfo[]) => MallLoadAddressBookSuccessAction;
export declare const mallAddAddress: (addressForm: Backend.AddressFormFields) => MallAddAddressAction;
export declare const mallAddAddressSuccess: (addressInfo: Backend.AddressInfo) => MallAddAddressSuccessAction;
export declare const mallAddAddressFailed: () => MallAddAddressFailedAction;
export declare type MallAddressAction = MallLoadAddressBookAction | MallLoadAddressBookSuccessAction | MallLoadAddressBookFailedAction | MallAddAddressAction | MallAddAddressFailedAction | MallAddAddressSuccessAction;
export declare type MallAction = MallAddressAction | MallChoreAction;
