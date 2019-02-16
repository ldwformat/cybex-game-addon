import { KeyStore } from "./keystore";

describe("测试KeyStore类", () => {
  test("测试refresh方法是否immutable", async done => {
    let keyStore = new KeyStore();
    await new Promise(resolve =>
      setTimeout(() => {
        resolve();
      }, 500)
    );
    let newKeyStore = keyStore.refresh();
    expect(newKeyStore).not.toStrictEqual(keyStore);
    expect(newKeyStore.createAt).toEqual(keyStore.createAt);
    expect(newKeyStore.updateAt.valueOf()).toBeGreaterThan(
      keyStore.createAt.valueOf()
    );
    done();
  });
});
