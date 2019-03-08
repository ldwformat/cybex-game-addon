import { MallBackendCountry, MallBackendProvince } from "../../utils/fetcher";

export class Chore {
  countryList: MallBackendCountry[] = [];
  proviceMap: { [countryID: number]: MallBackendProvince[] } = {};
}

export class MallState {
  chore = new Chore();
}

// 地址簿
