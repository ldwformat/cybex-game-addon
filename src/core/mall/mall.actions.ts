import { Action, ActionCreator } from "redux";

export enum MallActions {
  LoadCountries = "[Mall] Load Countries",
  LoadCountriesSuccess = "[Mall] Load Countries Success",
  LoadCountriesFailed = "[Mall] Load Countries Failed",
  LoadProvinces = "[Mall] LoadProvinces",
  LoadProvincesSuccess = "[Mall] LoadProvincesSuccess",
  LoadProvincesFailed = "[Mall] LoadProvincesFailed",
  LoadAddressBook = "[Mall] LoadAddressBook",
  LoadAddressBookSuccess = "[Mall] LoadAddressBookSuccess"
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
  constructor(public payload: MallBackend.Country[]) {}
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
  countries: MallBackend.Country[]
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
    public payload: { countryID: number; provinces: MallBackend.Province[] }
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
  provinces: MallBackend.Province[];
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
export class MallLoadAddressBookSuccess implements Action {
  readonly type = MallActions.LoadAddressBook;
}

export type MallAction = MallChoreAction;
