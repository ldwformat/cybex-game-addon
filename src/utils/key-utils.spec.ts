import { KeyStore } from "../core/auth/keystore/keystore";
import { PrivateKey } from "../cybex/ecc";
import { encryptKeyStore, decryptKeyStore } from "./key-utils";

let testAccount = {
  id: "1.2.6209",
  membership_expiration_date: "1970-01-01T00:00:00",
  registrar: "1.2.7",
  referrer: "1.2.7",
  lifetime_referrer: "1.2.7",
  network_fee_percentage: 2000,
  lifetime_referrer_fee_percentage: 3000,
  referrer_rewards_percentage: 0,
  name: "create-test12",
  owner: {
    weight_threshold: 1,
    account_auths: [],
    key_auths: [
      ["CYB8Znt18kGRNWSDpXi9GeVExRpTft6TCpy5uuhzrjv5AyjMvHSzE", 1]
    ] as [string, number][],
    address_auths: []
  },
  active: {
    weight_threshold: 1,
    account_auths: [],
    key_auths: [
      ["CYB8JpNCWPuHk6g3E4wBQtSxvDiVFBhKmTVBp8Nc4MBYGzxqTHSBk", 1]
    ] as [string, number][],
    address_auths: []
  },
  options: {
    memo_key: "CYB8JpNCWPuHk6g3E4wBQtSxvDiVFBhKmTVBp8Nc4MBYGzxqTHSBk",
    voting_account: "1.2.5",
    num_witness: 0,
    num_committee: 0,
    votes: [],
    extensions: []
  },
  statistics: "2.6.6209",
  whitelisting_accounts: [],
  blacklisting_accounts: [],
  whitelisted_accounts: [],
  blacklisted_accounts: [],
  owner_special_authority: [0, {}],
  active_special_authority: [0, {}],
  top_n_control_flags: 0
};

const Result =
  "03ba76c9275d206f27c6f5c192c04702d6b3279e627b65a4f7d616d10f3ea6709e8a44d70a482ebbf2a72117a5597062a16a32b44498ec2b38b495920d2eab99cd7bafb64f5c8016d01ef221ec571df135b641fd9f43de8068910fa4669e623ca3d88d1fa87421b6fe12f86b0c27c0dcd1038c6ca571e5ac5e20fb877c6e41a083068d3a6b57b5a0f76c2750621b647153288c475a8a7cfd9874d80828a32dcca98411deff7e58b002f04b65ef36d1d0cb338fa80f5c95f7f2e8edc07af629673107b647f5c8a360463c02e79ffb222b46a602c9e2429b4da02486250cbaccdf4e1391cd85e4c0ddf4433023b28e505786ca629a65cdedb55976246a7ced2f560634ce72da197ed485c3cf733228eb6eed967eb2d55388559232e43e7cf7d354927203c72b3d08734ccad7fcfaf414c13551909600680743b863fd26ae47be0a36794372da3bf331492b5dee1d655c8af0dd0d6ed51739121ebf46c89334b129831b48401d60dbac1d24c03b1316ae3eac2eccb11289d2f6260c137e97debe3d465889a5573da70ea9a77454416cdf7e2c0d907e2463747040297baf0ec0c8e53f037ffd78734d8325c16559c8b4854a08e2b26734e9e5a1493cb4a06cee9531ba5f299c66ca95ac2221715633f283b2e17bfcbbfab0f11c16e9325f338e11e48d35a2915a82521c39d2bd80ae661fcff98960d3274b687e35fc934dda6dbb21b734f9747192adcf32832c896f5d63dc9f7bda8086a7346e81870f1e8b958510471211faa26e70830a8e1c3e30202ae4288255fb1ea333db9b8ffc2634f3d7136d98ab539349d081a41ce60690e169c6289e236166ec7367464e665291781f301f44dc2db95169f3fdac69121cc68af3dd1cb461090033c04e206752546c11e2cd883e4ea60eb5dbd87aab03fb767cee776e96d8fd58f40d72d15a89b47f310d8db4dad4491a29022c9a670d4fc6a548db990702cf95a53a192be8dc7184e284fd87051149c6d0f822af91bd1f7c8c44216245f66844f8228fb67c5d2d606a5450f08411bf66f225241c46f4f4864a81738a5b54ce510196777b100387d4687dcbcb03c502d91a0d2f5c1b00947d5d88e5";

describe("测试KeyStore加解密", () => {
  let keyList = ["active", "owner"].map(role =>
    PrivateKey.fromSeed(`create-test12${role}qwer1234qwer1234`)
  );
  let keyStore = new KeyStore(keyList);
  keyStore.loginAccount(testAccount as any);
  keyStore.createAt = new Date("1970-01-01T00:00:00Z");
  keyStore.updateAt = new Date("1970-01-01T00:00:00Z");

  const password = "qwer1234";
  it("测试序列化", () => {
    let res = encryptKeyStore(password, keyStore);
    expect(res).toBe(Result);
  });

  it("测试解序列化", () => {
    let res = decryptKeyStore(password, Result);
    expect(res.activeKey.pubKeyStr).toBe(
      keyList[1].toPublicKey().toPublicKeyString()
    );
  });
  it("测试错误密码解序列化", () => {
    expect(decryptKeyStore.bind(this, "afakepassword", Result)).toThrowError(
      "Wrong Password"
    );
  });
});
