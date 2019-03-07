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
export var cnDict = {
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
    AuthRegAccountNameHelper: "\u8BF7\u8F93\u5165\u60A8\u7684\u4E91\u94B1\u5305\u8D26\u6237\u540D, \u8D26\u6237\u540D\u987B\u4E3A\u5C0F\u5199\uFF0C\u5E76\u9700\u5305\u542B\u6570\u5B57\u6216\u5B57\u6BCD\u95F4\u8FDE\u5B57\u7B26\"-\"",
    AuthRegPasswordHelper: "包含至少 12 位字符, 且需要同时包含数字和大小写英文字母，并推荐包含特殊符号。",
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
    SaveQRCode: "保存二维码"
};
export var Dict = Object.keys(cnDict).reduce(function (indexes, index) {
    indexes[index] = index;
    return indexes;
}, {});
export var enDict = {
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
    AuthRegAccountNameHelper: "Account name for cloud wallet",
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
    SaveQRCode: "Save"
};
export var vnDict = {
    LoginSubmit: "Đăng nhập",
    LoginLong: "Đăng nhập",
    AuthAccountName: "Tên tài khoản",
    AuthAccountNameHelper: "Vui lòng nhập tên tài khoản ví điện toán đám mây",
    AuthReferrer: "Người giới thiệu (tùy chọn)",
    AuthReferrerHelper: "Vui lòng nhập mã giới thiệu của người giới thiệu của bạn",
    AuthCaptcha: "Mã xác minh",
    AuthCaptchaHelper: "Vui lòng nhập mã xác minh",
    AuthPassword: "Mật khẩu",
    AuthPasswordConfirm: "Xác nhận mật khẩu",
    AuthLoginPasswordHelper: "Vui lòng nhập mật khẩu của bạn",
    AuthRegAccountNameHelper: "Vui l\u00F2ng nh\u1EADp t\u00EAn t\u00E0i kho\u1EA3n v\u00ED \u0111i\u1EC7n to\u00E1n \u0111\u00E1m m\u00E2y",
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
    PatchReferrerHelper: "Vui lòng nhập mã giới thiệu của người giới thiệu của bạn",
    PatchReferrerAdd: "Người giới thiệu",
    MyRefererCode: "Mã giới thiệu của bạn",
    PeopleUnit: "",
    CopyAddress: "Copy Address",
    AddressCopied: "Address copied",
    CopyShareLink: "Sao chép liên kết",
    ShareLink: "Sao chép liên kết",
    ShareLinkCopied: "Chia sẻ lời mời",
    ShareQRCode: "Tạo áp phích độc quyền",
    SaveQRCode: "Save"
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
