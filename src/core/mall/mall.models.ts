export class Chore {
  countryList: MallBackend.Country[] = [];
  proviceMap: { [countryID: number]: MallBackend.Province[] } = {};
}

export class MallState {
  chore = new Chore();
}
