import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// export enum Dict {
//   LoginSubmit = "[Login]Submit",
//   AuthAccountName = "[Auth]AccountName",
//   AuthAccountNameHelper = "[Auth]AccountNameHelper",
//   AuthPassword = "[Auth]Password",
//   AuthPasswordConfirm = "[Auth]PasswordConfirm",
//   AuthCaptcha = "[Auth]Captcha",
//   AuthLoginPasswordHelper = "[Auth]LoginPasswordHelper",
//   AuthRegPasswordHelper = "[Auth]RegPasswordHelper",
//   AuthRegAccountNameHelper = "[Auth]RegAccountNameHelper",
//   AuthRegConfirmHelper = "[Auth]RegConfirmHelper",
//   AuthCaptchaHelper = "[Auth]CaptchaHelper",
//   AuthRegisterLong = "[Auth]RegisterLong",
//   AuthRegister = "[Auth]Register"
// }

export const cnDict = {
  LoginSubmit: "登录",
  LoginLong: "登录云账户",
  AuthAccountName: "账户名",
  AuthAccountNameHelper: "请输入您的云钱包账户名",
  AuthReferrer: "推荐人（选填）",
  AuthReferrerHelper: "请输入推荐人分享给您的推荐码，若无推荐人，可不填",
  AuthCaptcha: "验证码",
  AuthCaptchaHelper: "请输入右侧验证码",
  AuthPassword: "密码",
  AuthPasswordConfirm: "确认密码",
  AuthLoginPasswordHelper: "请输入您的云钱包密码",
  AuthRegAccountNameHelper: `请输入您的云钱包账户名, 账户名须为小写，并需包含数字或字母间连字符"-"`,
  AuthRegPasswordHelper:
    "包含至少 12 位字符, 且需要同时包含数字和大小写英文字母，并推荐包含特殊符号。",
  AuthRegConfirmHelper: "请再次输入您的密码",
  AuthRegister: "注册",
  AuthRegisterLong: "注册新账户",
  HasNoAccountYet: "还没有Cybex云账户？",
  HasAccountAlready: "已经有Cybex云账户？",
  MyRegisterReferrer: "我的注册推荐人",
  MyRegisterReferral: "我的注册推荐",
  MyGameReferrer: "我的游戏推荐人",
  MyGameReferral: "我的游戏推荐",
  PatchReferrer: "补充引荐人",
  PatchReferrerLabel: "推荐码",
  PatchReferrerHelper: "请输入推荐人分享给您的推荐码",
  PatchReferrerAdd: "增加推荐人",
  MyRefererCode: "您的推荐码",
  CopyAddress: "复制地址",
  AddressCopied: "充值地址已复制到剪贴板",
  CopyShareLink: "复制邀请链接",
  ShareLink: "分享邀请",
  ShareLinkCopied: "分享邀请",
  ShareQRCode: "邀请二维码",
  QRCodeCopied: "保存二维码"
};
export const Dict = Object.keys(cnDict).reduce(
  (indexes, index) => {
    indexes[index] = index;
    return indexes;
  },
  {} as typeof cnDict
);
export const enDict = {
  LoginSubmit: "Submit"
};
export const vnDict = {
  LoginSubmit: "Submit"
};

// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
  .use(initReactI18next)

  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "en",
    lng: "zhCN",
    debug: true,
    resources: {
      en: {
        translation: {
          "Welcome to React": "Welcome to React and react-i18next",
          "[Login]Submit": "Submit"
        }
      },
      zhCN: {
        translation: cnDict
      }
    },
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  });
export { i18n };
export default i18n;
