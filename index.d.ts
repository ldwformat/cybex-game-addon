declare namespace CybexConnect {
  export interface WsConnectionOptions {}

  export class WsConnection {
    options: WsConnectionOptions;
    constructor(url: string, options?: WsConnectionOptions);
    constructor(options: WsConnectionOptions);
    connect(): Promise<WsConnection>;
  }
}
declare namespace RPC {
  interface RPCResult {
    id: number;
    jsonrpc: "2.0";
    result: any;
  }
  interface RPCRejectResult {
    id: number;
    jsonrpc: "2.0";
    error: any;
  }
  type CallID = number;
  type ApiID = number;
  type Method = string;
  type Params = any[];
  type NoticeArray = any[];
  type RPCRequestParams = [ApiID, Method, Params];

  interface RPCRequest {
    id: CallID;
    method: "call";
    params: RPCRequestParams;
  }

  interface RPCNotice {
    method: "notice";
    params: [CallID, NoticeArray];
  }
}

declare enum ApiFailedMode {
  Ignore,
  Panic
}

declare interface WsConnectionOption {
  url: string;
  apis?: string[];
  mode?: ApiFailedMode;
  protocol?: string;
}

declare namespace Cybex {
  export interface Asset {
    id: string;
    symbol: string;
    precision: number;
    issuer: string;
    options: {
      max_supply: string;
      market_fee_percent: number;
      max_market_fee: string;
      issuer_permissions: number;
      flags: number;
      core_exchange_rate: any[];
      whitelist_authorities: any[];
      blacklist_authorities: any[];
      whitelist_markets: any[];
      blacklist_markets: any[];
      description: string;
      extensions: any[];
    };
    dynamic_asset_data_id: string;
  }

  export interface Account {
    id: string;
    membership_expiration_date: string;
    registrar: string;
    referrer: string;
    lifetime_referrer: string;
    network_fee_percentage: number;
    lifetime_referrer_fee_percentage: number;
    referrer_rewards_percentage: number;
    name: string;
    owner: AccountAuthority;
    active: AccountAuthority;
    options: Options;
    statistics: string;
    whitelisting_accounts: string[];
    blacklisting_accounts: any[];
    whitelisted_accounts: string[];
    blacklisted_accounts: any[];
    cashback_vb: string;
    owner_special_authority: Array<ActiveSpecialAuthorityClass | number>;
    active_special_authority: Array<ActiveSpecialAuthorityClass | number>;
    top_n_control_flags: number;
  }

  export type AuthorityWithWeight = [string, number];

  export interface AccountAuthority {
    weight_threshold: number;
    account_auths: any[];
    key_auths: Array<AuthorityWithWeight>;
    address_auths: any[];
  }

  export interface ActiveSpecialAuthorityClass {}

  export interface Options {
    memo_key: string;
    voting_account: string;
    num_witness: number;
    num_committee: number;
    votes: any[];
    extensions: any[];
  }
}

declare interface AddOnConfig {
  apiUrl: APIURL;
}

declare interface APIURL {
  mallBackend: string;
  referBackend: string;
  backend: string;
  gateway: string;
  cybexWs: string;
  cybexHttpServer: string;
}

// MallBackend
declare namespace MallBackend {
  export interface Response<R> {
    returnCode: number;
    returnMsg: string;
    data: R;
  }

  export interface Country {
    id: number;
    country: string;
    countryCode: string;
    addition: null;
    deleted: "N";
  }

  export interface Province {
    id: number;
    countryId: number;
    country: string;
    countryCode: string;
    provice: string;
    provinceCode: string;
    addition: null;
    deleted: string;
  }
}
declare namespace Backend {
  export interface Response<R> {
    success: boolean;
    reason: string;
    data: R;
  }
  export interface FetchResponse<R> {
    success: boolean;
    reason: string;
    result: R;
  }

  export type AddressInfo = {
    id: number;
    email: string;
    wechatNo: string;
    mobile: null;
    homeAddress: string;
    userId: number;
    provinceCode: string;
    countryCode: string;
    countryId: null;
    receverName: string;
    updatedTime: number;
    operator: null;
    proviceId: null;
    addition: null;
    createdTime: number;
    provice: string;
    deleted: string;
    country: string;
    qqNo: string;
    freightFee: null;
    defaultAddress: string;
  };

  export interface ReferResult {
    referrers: Referrer[];
    referrals: TypesReferral[];
  }

  export interface TypesReferral {
    action: string;
    referral: ReferralReferral[];
  }

  export interface ReferralReferral {
    ts: string;
    referral: string;
  }

  export interface Referrer {
    action: string;
    referrer: string;
  }
}
declare namespace CybexGateway {
  export interface Response<R> {
    data: R;
  }

  export interface GetDepositAddressRes {
    getDepositAddress: GetDepositAddress | null;
  }

  export interface GetDepositAddress {
    address: string;
    accountName: string;
    asset: string;
    type: string;
    createAt: string;
    projectInfo: ProjectInfo;
  }

  export interface ProjectInfo {
    projectName: string;
    logoUrl: string;
    contractAddress: null;
    contractExplorerUrl: null;
  }
}

//
declare const ByteBuffer;
