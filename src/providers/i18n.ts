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
  PeopleUnit: "人",
  CopyAddress: "复制地址",
  AddressCopied: "充值地址已复制到剪贴板",
  CopyShareLink: "复制邀请链接",
  ShareLink: "分享邀请",
  ShareLinkCopied: "分享邀请链接已复制",
  ShareQRCode: "邀请二维码",
  SaveQRCode: "保存二维码",
  NotiLoginWrongPass: "登录失败，请检查用户名密码是否正确",
  NotiAddReferWrong: "增加推荐人失败，请检查推荐码",
  NotiRegWrong: "注册错误",
  NotiRegWrong_429: "注册失败，注册次数过于频繁，请稍后再试",
  NotiRegWrong_403: "验证码错误",
  NotiRegWrong_507: "注册失败，请稍后再试",
  ErrorRequired: "该项目为必填项",
  ErrorRequired_accountName: "请填写账户名",
  ErrorRequired_password: "请填写密码",
  ErrorRequired_confirm: "请填写密码确认",
  ErrorRequired_captcha: "请填写验证码",
  ErrorRequired_referrer: "请填写推荐码",
  ErrorMatch: "密码确认不匹配",
  ErrorAccountExists: "该账户名已被占用，请尝试其他账户名"
};
type Dictionary = typeof cnDict;

export const Dict = Object.keys(cnDict).reduce(
  (indexes, index) => {
    indexes[index] = index;
    return indexes;
  },
  {} as Dictionary
);
export const enDict: Dictionary = {
  LoginSubmit: "Log in",
  LoginLong: "Log in",
  AuthAccountName: "Account Name",
  AuthAccountNameHelper: "Enter account name for cloud wallet",
  AuthReferrer: "Inviter (Optional)",
  AuthReferrerHelper: "Enter invitation code from the inviter",
  AuthCaptcha: "Verify Code",
  AuthCaptchaHelper: "Enter verify code",
  AuthPassword: "Password",
  AuthPasswordConfirm: "Confirm Password",
  AuthLoginPasswordHelper: "Please enter your password",
  AuthRegAccountNameHelper: `Account name for cloud wallet`,
  AuthRegPasswordHelper: "Please enter your password",
  AuthRegConfirmHelper: "Enter password again",
  AuthRegister: "Register",
  AuthRegisterLong: "Register",
  HasNoAccountYet: "",
  HasAccountAlready: "",
  MyRegisterReferrer: "My Register Inviter",
  MyRegisterReferral: "My Register Invitees",
  MyGameReferrer: "My Game Inviter",
  MyGameReferral: "My Game Invitees",
  PatchReferrer: "Add Inviter",
  PatchReferrerLabel: "invitation code",
  PatchReferrerHelper: "Enter invitation code from the inviter",
  PatchReferrerAdd: "Add Inviter",
  MyRefererCode: "Your Invitation Code",
  PeopleUnit: "",
  CopyAddress: "Copy Address",
  AddressCopied: "Address copied",
  CopyShareLink: "Copy Link",
  ShareLink: "Invite Others",
  ShareLinkCopied: "Copy link copied",
  ShareQRCode: "Generate QRcode",
  SaveQRCode: "Save",
  NotiLoginWrongPass: "登录失败，请检查用户名密码是否正确",
  NotiAddReferWrong: "增加推荐人失败，请检查推荐码",
  NotiRegWrong: "注册错误",
  NotiRegWrong_429: "注册失败，注册次数过于频繁，请稍后再试",
  NotiRegWrong_403: "验证码错误",
  NotiRegWrong_507: "注册失败，请稍后再试",
  ErrorRequired: "该项目为必填项",
  ErrorRequired_accountName: "请填写账户名",
  ErrorRequired_password: "请填写密码",
  ErrorRequired_confirm: "请填写密码确认",
  ErrorRequired_captcha: "请填写验证码",
  ErrorRequired_referrer: "请填写推荐码",
  ErrorMatch: "密码确认不匹配",
  ErrorAccountExists: "该账户名已被占用，请尝试其他账户名"
};
export const vnDict: Dictionary = {
  LoginSubmit: "Đăng nhập",
  LoginLong: "Đăng nhập",
  AuthAccountName: "Tên tài khoản",
  AuthAccountNameHelper: "Vui lòng nhập tên tài khoản ví điện toán đám mây",
  AuthReferrer: "Người giới thiệu (tùy chọn)",
  AuthReferrerHelper:
    "Vui lòng nhập mã giới thiệu của người giới thiệu của bạn",
  AuthCaptcha: "Mã xác minh",
  AuthCaptchaHelper: "Vui lòng nhập mã xác minh",
  AuthPassword: "Mật khẩu",
  AuthPasswordConfirm: "Xác nhận mật khẩu",
  AuthLoginPasswordHelper: "Vui lòng nhập mật khẩu của bạn",
  AuthRegAccountNameHelper: `Vui lòng nhập tên tài khoản ví điện toán đám mây`,
  AuthRegPasswordHelper: "Vui lòng nhập mật khẩu của bạn",
  AuthRegConfirmHelper: "Vui lòng nhập lại mật khẩu của bạn",
  AuthRegister: "Đăng ký tài khoản mới",
  AuthRegisterLong: "Đăng ký tài khoản mới",
  HasNoAccountYet: "",
  HasAccountAlready: "",
  MyRegisterReferrer: "Người mời tôi đăng ký",
  MyRegisterReferral: "Người tôi mời đăng ký",
  MyGameReferrer: "Người giới thiệu trò chơi cho tôi",
  MyGameReferral: "Người được tôi giới thiệu trò chơi",
  PatchReferrer: "Người giới thiệu",
  PatchReferrerLabel: "Người giới thiệu",
  PatchReferrerHelper:
    "Vui lòng nhập mã giới thiệu của người giới thiệu của bạn",
  PatchReferrerAdd: "Người giới thiệu",
  MyRefererCode: "Mã giới thiệu của bạn",
  PeopleUnit: "",
  CopyAddress: "Copy Address",
  AddressCopied: "Address copied",
  CopyShareLink: "Sao chép liên kết",
  ShareLink: "Sao chép liên kết",
  ShareLinkCopied: "Chia sẻ lời mời",
  ShareQRCode: "Tạo áp phích độc quyền",
  SaveQRCode: "Save",
  NotiLoginWrongPass: "登录失败，请检查用户名密码是否正确",
  NotiAddReferWrong: "增加推荐人失败，请检查推荐码",
  NotiRegWrong: "注册错误",
  NotiRegWrong_429: "注册失败，注册次数过于频繁，请稍后再试",
  NotiRegWrong_403: "验证码错误",
  NotiRegWrong_507: "注册失败，请稍后再试",
  ErrorRequired: "该项目为必填项",
  ErrorRequired_accountName: "请填写账户名",
  ErrorRequired_password: "请填写密码",
  ErrorRequired_confirm: "请填写密码确认",
  ErrorRequired_captcha: "请填写验证码",
  ErrorRequired_referrer: "请填写推荐码",
  ErrorMatch: "密码确认不匹配",
  ErrorAccountExists: "该账户名已被占用，请尝试其他账户名"
};

// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
  .use(initReactI18next)

  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "en",
    lng: "zh",
    debug: true,
    resources: {
      en: {
        translation: enDict
      },
      vn: {
        translation: vnDict
      },
      zh: {
        translation: cnDict
      }
    },
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  });
export { i18n };
export default i18n;
