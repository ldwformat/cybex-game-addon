import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const cnDict = {
  LoginSubmit: "登录",
  LoginLong: "登录云账户",
  AuthAccountName: "账户名",
  AuthAccountNameHelper: "请输入您的云钱包账户名",
  AuthReferrer: "推荐人（选填）",
  AuthReferrerHelper:
    "请输入推荐人分享给您的推荐码，若无推荐人，可不填，推荐人一经填写，将无法修改",
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
  UnlockFaileWithCounter:
    "密码错误，还可以进行{{count}}次尝试，仍然错误后将登出",
  AuthLogout: "已登出",
  SetLockTitle: "请设置您的临时解锁手势",
  SetLockAgain: "请再次绘制您的解锁手势",
  SetLockError: "两次手势不一致，请重新设置",
  HasNoAccountYet: "还没有Cybex云账户？",
  HasAccountAlready: "已经有Cybex云账户？",
  MyRegisterReferrer: "我的注册推荐人",
  MyRegisterReferral: "我的注册推荐",
  MyGameReferrer: "我的游戏推荐人",
  MyGameReferral: "我的游戏推荐",
  PatchReferrer: "补充推荐人",
  PatchReferrerLabel: "推荐码",
  PatchReferrerHelper:
    "请输入推荐人分享给您的推荐码，推荐人一经填写，将无法修改",
  PatchReferrerAdd: "增加推荐人",
  MyRefererCode: "您的推荐码",
  RefererRuleTitle: "赛贝游戏中心：全新邀请机制上线",
  RefererRuleContent_0:
    "各位赛贝游戏中心的用户们~全新邀请机制即日起正式上线，只需通过推荐您的朋友即可获得终身奖励！获得被推荐朋友0.2％的所有投注流水。",
  RefererRuleContent_1:
    "所有奖励我们都会在每周一统一发出。您只需复制您的邀请码链接并分享给您的所有朋友！",
  RefererRuleContent_2: "您可以通过以下方式参与到邀请机制：",
  RefererRuleContent_3:
    "如果您推荐的朋友是新用户：您可以将您的邀请分享链接直接分享给新用户，新用户注册后玩CybexBet，您方可享受0.2%的流水奖励；",
  RefererRuleContent_4:
    "如果您推荐的朋友是老用户：您也可以让老用户在【我的游戏推荐人】选项中，输入您的邀请码，您将享受他所有流水的0.2%，请注意，您的账号需在游戏推荐人账号前玩CybexBet，否则视为无效；",
  RefererRuleContent_5: "注意：活动发放的流水计算自填写推荐起生效；",
  PeopleUnit: "人",
  CopyAddress: "复制地址",
  AddressCopied: "充值地址已复制到剪贴板",
  CopyShareLink: "复制邀请链接",
  CopyShareLinkPrefix:
    "我正在赛贝游戏中心参与高奖金竞猜游戏！邀请您来参与！点击链接即可注册：",
  ShareLink: "分享邀请",
  ShareLinkCopied: "分享邀请链接已复制",
  ShareQRCode: "邀请二维码",
  SaveQRCode: "保存二维码",
  SaveQRCodeLongPress: "长按图片下载保存二维码",
  NotiLoginWrongPass: "登录失败，请检查用户名密码是否正确",
  NotiAddReferWrong: "增加推荐人失败，请检查推荐码",
  NotiRegWrong: "注册错误",
  NotiRegWrong_429: "注册失败，注册次数过于频繁，请稍后再试",
  NotiRegWrong_403: "验证码错误",
  NotiRegWrong_507: "注册失败，请稍后再试",
  Poster: "PosterImgBase64ZH",
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
  AuthLogout: "已登出",
  SetLockTitle: "请设置您的临时解锁手势",
  SetLockAgain: "请再次绘制您的解锁手势",
  SetLockError: "两次手势不一致，请重新设置",
  AuthAccountName: "Account Name",
  AuthAccountNameHelper: "Enter account name for cloud wallet",
  AuthReferrer: "Inviter (Optional)",
  AuthReferrerHelper:
    "Enter invitation code from the inviter. The inviter is unable to be modified once confirmed!",
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
  UnlockFaileWithCounter: "还可以进行{{count}}次尝试，仍然错误后将登出",
  HasNoAccountYet: "",
  HasAccountAlready: "",
  MyRegisterReferrer: "My Register Inviter",
  MyRegisterReferral: "My Register Invitees",
  MyGameReferrer: "My Game Inviter",
  MyGameReferral: "My Game Invitees",
  RefererRuleTitle: "Cybex Game Center: New Referral System",
  RefererRuleContent_0:
    "Dear players, Cybex Game Center updated the referral system. You will get a lifetime reward once successfully inviting others--0.2% of all your invitee’s wagers.",
  RefererRuleContent_1:
    "All rewards will be issued every Monday. Copy your invitation code and share it out!",
  RefererRuleContent_2:
    "You can join the brand new referral system in the following ways:",
  RefererRuleContent_3:
    "If your invitee is new to Cybex Game Center, you will enjoy 0.2% of the invitee’s wagers once him/her successfully registered.",
  RefererRuleContent_4:
    "If your invitee has played in Cybex Game Center, you can ask him/her to enter your invitation code through [My Game Inviter] page, then you can also enjoy 0.2% of your invitee’s wagers. Please note that your account must have a bet record that is earlier than your invitee’s one, or the invitation will consider invalid.",
  RefererRuleContent_5:
    "Notice: Wagers later than the fill-in of invitation code will be counted only.",
  PatchReferrer: "Add Inviter",
  PatchReferrerLabel: "invitation code",
  PatchReferrerHelper:
    "Enter invitation code from the inviter. The inviter is unable to be modified once confirmed!",
  PatchReferrerAdd: "Add Inviter",
  MyRefererCode: "Your Invitation Code",
  PeopleUnit: "",
  CopyAddress: "Copy Address",
  AddressCopied: "Address copied",
  CopyShareLink: "Copy Link",
  CopyShareLinkPrefix:
    "I am playing bet games in Cybex Game Center. The prize is generous. Come play with me! Click to register:",
  ShareLink: "Invite Others",
  ShareLinkCopied: "Copy link copied",
  ShareQRCode: "Generate QRcode",
  SaveQRCode: "Save",
  SaveQRCodeLongPress: "Hold to save QR code",
  NotiLoginWrongPass: "Unable to login, please check account name or password",
  NotiAddReferWrong: "Failed to add an inviter, please check invitation code",
  NotiRegWrong: "Error",
  NotiRegWrong_429: "Unable to register. You must not register too frequently.",
  NotiRegWrong_403: "Invalid verify code",
  NotiRegWrong_507: "Unable to register. Try later.",
  Poster: "PosterImgBase64EN",
  ErrorRequired: "Required field",
  ErrorRequired_accountName: "Enter account name",
  ErrorRequired_password: "Enter password",
  ErrorRequired_confirm: "Confirm password",
  ErrorRequired_captcha: "Enter verify code",
  ErrorRequired_referrer: "Enter invitation code",
  ErrorMatch: "Inconsistent passwords",
  ErrorAccountExists:
    "The account name has been taken. Please try another account name"
};
export const vnDict: Dictionary = {
  LoginSubmit: "Đăng nhập",
  LoginLong: "Đăng nhập",
  AuthLogout: "已登出",
  SetLockTitle: "请设置您的临时解锁手势",
  SetLockAgain: "请再次绘制您的解锁手势",
  SetLockError: "两次手势不一致，请重新设置",
  AuthAccountName: "Tên tài khoản",
  AuthAccountNameHelper: "Vui lòng nhập tên tài khoản ví điện toán đám mây",
  AuthReferrer: "Người giới thiệu (tùy chọn)",
  AuthReferrerHelper:
    "Vui lòng nhập mã giới thiệu của người giới thiệu của bạn. Người mời sẽ không thể thay đổi sau khi được xác nhận",
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
  UnlockFaileWithCounter: "还可以进行{{count}}次尝试，仍然错误后将登出",
  HasNoAccountYet: "",
  HasAccountAlready: "",
  MyRegisterReferrer: "Người mời tôi đăng ký",
  MyRegisterReferral: "Người tôi mời đăng ký",
  MyGameReferrer: "Người giới thiệu trò chơi cho tôi",
  MyGameReferral: "Người được tôi giới thiệu trò chơi",
  RefererRuleTitle: "Cybex Game Center: Ra mắt cơ chế mời hoàn toàn mới mới",
  RefererRuleContent_0:
    "Thân gửi  các người dùng của Cybex Game Center ~ Cơ chế mời mới sẽ được chính thức ra mắt kể từ ngày hôm nay. Bạn có thể nhận ngay các phần thưởng bằng cách giới thiệu cho bạn bè của ình! Ngoài ra bạn còn có thể nhận được 0.2% số tiền đặt cược từ người bạn đã giới thiệu nữa đó.",
  RefererRuleContent_1:
    "Tất cả các phần thưởng sẽ được phát vào thứ hai tuần kế tiếp. Bạn chỉ cần sao chép rồi gửi đường link chia sẻ mã giới thiệu với bạn bè của mình là có thể tham gia rồi.",
  RefererRuleContent_2: "Bạn có thể tham gia vào cơ chế mời theo các cách sau:",
  RefererRuleContent_3:
    "Nếu người bạn mà bạn giới thiệu là người dùng mới: Bạn có thể trực tiếp chia sẻ liên kết chia sẻ lời mời của mình với người dùng mới. Sau khi người dùng mới đăng ký và chơi CybexBet, bạn có thể thưởng phần thưởng 0,2% từ số tiền đặt cược của họ;",
  RefererRuleContent_4:
    "Nếu người bạn  giới thiệu là người dùng cũ: Người dùng cũ nhập mã lời mời giới thiệu của bạn trong phần [Người giới thiệu trò chơi cho tôi], bạn sẽ được hưởng 0,2% tiền thưởng từ số tiền đặt cược của họ, xin lưu ý rằng tài khoản của bạn cần Chơi CybexBet trước tài khoản giới thiệu của trò chơi, nếu không, nó sẽ bị coi là không hợp lệ;",
  RefererRuleContent_5:
    "Lưu ý: Số tiền thưởng chỉ được tính sau khi đã điền mã mời.",
  PatchReferrer: "Thêm người giới thiệu",
  PatchReferrerLabel: "Thêm người giới thiệu",
  PatchReferrerHelper:
    "Vui lòng nhập mã giới thiệu của người giới thiệu của bạn. Người mời sẽ không thể thay đổi sau khi được xác nhận",
  PatchReferrerAdd: "Thêm người giới thiệu",
  MyRefererCode: "Mã giới thiệu của bạn",
  PeopleUnit: "",
  CopyAddress: "Sao chép địa chỉ",
  AddressCopied: "Đã sao chép địa chỉ",
  CopyShareLink: "Sao chép liên kết",
  CopyShareLinkPrefix:
    "Tôi đang chơi trò chơi Casino trong Cybex Game Center với nhiều phần thưởng hấp dẫn! Hãy cùng tham gia nào! Nhấp vào liên kết để đăng ký:",
  ShareLink: "Mời bạn bè",
  ShareLinkCopied: "Chia sẻ lời mời",
  ShareQRCode: "Tạo mã QR",
  SaveQRCode: "Lưu mã QR",
  SaveQRCodeLongPress: "Nhấn và giữ để tải xuống và lưu mã QR.",
  NotiLoginWrongPass:
    "Đăng nhập thất bại, vui lòng kiểm tra lại tên tài khoản và mật khẩu",
  NotiAddReferWrong:
    "Thêm người giới thiệu thất bại, vui lòng kiểm tra mã giới thiệu",
  NotiRegWrong: "Lỗi đăng ký",
  NotiRegWrong_429:
    "Đăng ký thất bại. Số lần đăng ký quá nhiều, vui lòng thử lại sau",
  NotiRegWrong_403: "Lỗi mã xác minh",
  NotiRegWrong_507: "Đăng ký không thành công, vui lòng thử lại sau",
  Poster: "PosterImgBase64EN",
  ErrorRequired: "Mục cần phải điền",
  ErrorRequired_accountName: "Vui lòng điền tên tài khoản",
  ErrorRequired_password: "Vui lòng điền mật khẩu",
  ErrorRequired_confirm: "Vui lòng xác nhận lại mật khẩu",
  ErrorRequired_captcha: "Vui lòng điền mã xác minh",
  ErrorRequired_referrer: "Vui lòng điền mã giới thiệu",
  ErrorMatch: "Mật khẩu không đồng nhất",
  ErrorAccountExists:
    "Tên tài khoản đã được sử dụng, vui lòng chọn tên tài khoản khác"
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
    debug: false,
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
