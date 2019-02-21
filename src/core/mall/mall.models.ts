import Serializer from "src/cybex/serializer/src/serializer";
import types from "src/cybex/serializer/src/types";

export class Chore {
  countryList: MallBackend.Country[] = [];
  proviceMap: { [countryID: number]: MallBackend.Province[] } = {};
}

export class MallState {
  chore = new Chore();
}

// 地址簿
