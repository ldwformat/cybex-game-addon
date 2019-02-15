import { ChainFetcher } from "./fetcher";

describe("Test class ChainFetcher", () => {
  let fetcher: ChainFetcher;
  beforeAll(() => {
    fetcher = new ChainFetcher(
      "wss://hangzhou.51nebula.com",
      "https://www.cybexluck.io"
    );
  }, 5000);

  test(`Get account "harley", which has an account name "harley"`, async done => {
    let account = await fetcher.fetchAccount("harley");
    expect(account.name).toEqual("harley");
    done();
  });

  test(`Get account "null-null", which doesn't exist`, async done => {
    let account = await fetcher.fetchAccount("null-null");
    expect(account).toBeNull();
    done();
  });

  test(`Get asset "CYB", which has an symbol "CYB" and id "1.3.0"`, async done => {
    let asset = await fetcher.fetchAsset("CYB");
    expect(asset.symbol).toEqual("CYB");
    expect(asset.id).toEqual("1.3.0");
    done();
  });

  test(`Get asset "CYBNULL", which doesn't exist`, async done => {
    let asset = await fetcher.fetchAsset("CYBNULL");
    expect(asset).toBeNull();
    done();
  });
});
