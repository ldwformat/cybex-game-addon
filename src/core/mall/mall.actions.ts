import { Action, ActionCreator } from "redux";
import {
  BackendAddressInfo,
  BackendAddressFormFields,
  MallBackendCountry,
  MallBackendProvince
} from "../../utils/fetcher";

export enum MallActions {
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

// Load Countries
export class MallLoadCountriesAction implements Action {
  readonly type = MallActions.LoadCountries;
}

export class MallLoadCountriesFailedAction implements Action {
  readonly type = MallActions.LoadCountriesFailed;
}

export class MallLoadCountriesSuccessAction implements Action {
  readonly type = MallActions.LoadCountriesSuccess;
  constructor(public payload: MallBackendCountry[]) {}
}

export const mallLoadCountries: () => MallLoadCountriesAction = () => ({
  type: MallActions.LoadCountries
});

export const mallLoadCountriesFailed: ActionCreator<
  MallLoadCountriesFailedAction
> = () => ({
  type: MallActions.LoadCountriesFailed
});

export const mallLoadCountriesSuccess: (
  countries: MallBackendCountry[]
) => MallLoadCountriesSuccessAction = countries => ({
  type: MallActions.LoadCountriesSuccess,
  payload: countries
});

export type MallCountriesAction =
  | MallLoadCountriesAction
  | MallLoadCountriesFailedAction
  | MallLoadCountriesSuccessAction;

// Load Provinces
export class MallLoadProvincesAction implements Action {
  readonly type = MallActions.LoadProvinces;
  constructor(public payload: number) {}
}

export class MallLoadProvincesFailedAction implements Action {
  readonly type = MallActions.LoadProvincesFailed;
}

export class MallLoadProvincesSuccessAction implements Action {
  readonly type = MallActions.LoadProvincesSuccess;
  constructor(
    public payload: { countryID: number; provinces: MallBackendProvince[] }
  ) {}
}

export const mallLoadProvincesFailed: ActionCreator<
  MallLoadProvincesFailedAction
> = param => ({
  type: MallActions.LoadProvincesFailed
});

export const mallLoadProvinces: (
  countryID: number
) => MallLoadProvincesAction = countryID => ({
  type: MallActions.LoadProvinces,
  payload: countryID
});

export const mallLoadProvincesSuccess: (provinceRes: {
  countryID: number;
  provinces: MallBackendProvince[];
}) => MallLoadProvincesSuccessAction = provinceRes => ({
  type: MallActions.LoadProvincesSuccess,
  payload: provinceRes
});

export type MallProvincesAction =
  | MallLoadProvincesAction
  | MallLoadProvincesSuccessAction
  | MallLoadProvincesFailedAction;

export type MallChoreAction = MallCountriesAction | MallProvincesAction;

// 地址簿有关
export class MallLoadAddressBookAction implements Action {
  readonly type = MallActions.LoadAddressBook;
}
export class MallLoadAddressBookFailedAction implements Action {
  readonly type = MallActions.LoadAddressBookFailed;
}
export class MallLoadAddressBookSuccessAction implements Action {
  readonly type = MallActions.LoadAddressBookSuccess;
  constructor(public payload: BackendAddressInfo[]) {}
}
export class MallAddAddressAction implements Action {
  readonly type = MallActions.AddAddress;
  constructor(public payload: BackendAddressFormFields) {}
}
export class MallAddAddressSuccessAction implements Action {
  readonly type = MallActions.AddAddressSuccess;
}
export class MallAddAddressFailedAction implements Action {
  readonly type = MallActions.AddAddressFailed;
}

export const mallLoadAddressBook: () => MallLoadAddressBookAction = () => ({
  type: MallActions.LoadAddressBook
});
export const mallLoadAddressBookFailed: () => MallLoadAddressBookFailedAction = () => ({
  type: MallActions.LoadAddressBookFailed
});
export const mallLoadAddressBookSuccess: (
  addressBook: BackendAddressInfo[]
) => MallLoadAddressBookSuccessAction = addressBook => ({
  type: MallActions.LoadAddressBookSuccess,
  payload: addressBook
});
export const mallAddAddress: (
  addressForm: BackendAddressFormFields
) => MallAddAddressAction = addressForm => ({
  type: MallActions.AddAddress,
  payload: addressForm
});
export const mallAddAddressSuccess: (
  addressInfo: BackendAddressInfo
) => MallAddAddressSuccessAction = addressInfo => ({
  type: MallActions.AddAddressSuccess
});
export const mallAddAddressFailed: () => MallAddAddressFailedAction = () => ({
  type: MallActions.AddAddressFailed
});

export type MallAddressAction =
  | MallLoadAddressBookAction
  | MallLoadAddressBookSuccessAction
  | MallLoadAddressBookFailedAction
  | MallAddAddressAction
  | MallAddAddressFailedAction
  | MallAddAddressSuccessAction;

export type MallAction = MallAddressAction | MallChoreAction;
