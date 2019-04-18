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
  UnlockSuccess: "解锁成功",
  AuthLogout: "已登出",
  Logout: "登出",
  SetLockTitle:
    "请设置您的临时解锁手势。在登出账户前，可使用该手势快速解锁账号",
  SetLockAgain: "请再次绘制您的解锁手势",
  SetLockError: "两次手势不一致，请重新设置",
  HasNoAccountYet: "还没有Cybex云账户？",
  HasAccountAlready: "已经有Cybex云账户？",
  MyRegisterReferrer: "我的注册推荐人",
  MyRegisterReferral: "我的注册推荐",
  MyGameReferrer: "我的游戏推荐人",
  MyGameReferral: "我的游戏推荐",
  PasswordBackupTip:
    "我确认已妥善备份即将创建的账户名称及其密码，并知晓一旦密码遗忘，将无法找回，也无法再次登录相应账户或使用账户内资金。",
  PatchReferrer: "补充推荐人",
  PatchReferrerLabel: "推荐码",
  PatchReferrerHelper:
    "请输入推荐人分享给您的推荐码，推荐人一经填写，将无法修改",
  PatchReferrerAdd: "增加推荐人",
  MyRefererCode: "我的推荐码",
  RefererRuleTitle: "<strong>如何查看我的返现</strong>",
  RefererRuleContent_0:
    "您可以在<strong>【奖励发放】</strong>里看到各个资产的返现金额，包含<strong>【待发放】</strong>和<strong>【已发放】</strong>",
  RefererRuleContent_1: "您只需复制您的邀请码链接并分享给您的所有朋友！",
  RefererRuleContent_2:
    "<strong>【返现总额】</strong>将显示您所有返现的总额，并折合成USDT方便显示计算，数据会进行实时更新，如您有任何问题，请及时反馈给CybexBet小助手（微信号：cybexgame-1)。",
  PeopleUnit: "人",
  CopyAddress: "复制地址",
  AddressCopied: "充值地址已复制到剪贴板",
  CopyShareLink: "复制邀请链接",
  CopyShareLinkPrefix:
    "我正在赛贝游戏中心参与高奖金竞猜游戏！邀请您来参与！点击链接即可注册：",
  ShareLink: "分享邀请",
  ShareLinkCopied: "分享邀请链接已复制",
  ReferCodeCopied: "推荐码已复制",
  ShareQRCode: "邀请二维码",
  SaveQRCode: "保存二维码",
  SaveQRCodeLongPress: "长按图片下载保存二维码",
  NotiLoginWrongPass: "登录失败，请检查用户名密码是否正确",
  NotiAddReferWrong: "增加推荐人失败，请检查推荐码",
  NotiRegWrong: "注册错误",
  NotiRegWrong_429: "注册失败，注册次数过于频繁，请稍后再试",
  NotiRegWrong_403: "验证码错误",
  NotiRegWrong_507: "注册失败，请稍后再试",
  NotiRegWrong_Gateway: "充提币信息更新失败，请尝试刷新重取",
  Poster: "PosterImgBase64ZH",
  ErrorRequired: "该项目为必填项",
  ErrorRequired_accountName: "请填写账户名",
  ErrorRequired_password: "请填写密码",
  ErrorRequired_confirm: "请填写密码确认",
  ErrorRequired_captcha: "请填写验证码",
  ErrorRequired_referrer: "请填写推荐码",
  ErrorMatch: "密码确认不匹配",
  ErrorAccountExists: "该账户名已被占用，请尝试其他账户名",
  TotalRebates: "返现总额(USDT)",
  RebateDetail: "奖励发放",
  EmptyRebate: "暂无奖励",
  EmptyRegisterReferral: "暂无注册推荐",
  EmptyGameReferral: "暂无游戏推荐",
  AssetType: "资产类型",
  ReferralName: "被推荐人账户名",
  Cleard: "已发放",
  ToBeCleard: "待发放",
  Copy: "复制",
  Deposit: "充值",
  Login: "登录",
  Unlock: "解锁",
  Register: "注册",
  InviteTime: "推荐时间"
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
  HasNoAccountYet: "",
  HasAccountAlready: "",
  MyRegisterReferrer: "My Register Inviter",
  MyRegisterReferral: "My Register Invitees",
  MyGameReferrer: "My Game Inviter",
  MyGameReferral: "My Game Invitees",
  RefererRuleTitle: "<strong>How to check my Return Cash</strong>",
  RefererRuleContent_0: "",
  RefererRuleContent_1: `You can see cash return of each asset in Bonus Release including Pending and Distributed;`,
  RefererRuleContent_2:
    "<strong>Total Return Cash</strong> will show the total amount of your all asset cash backs converted into USDT for the convenience. The data will be updated in real time. Any questions, please give feedback to CybexBet assistant. (Wechat: cybexgame-1)",
  PasswordBackupTip:
    "I confirm I have properly backed up the name and password of the account to be created. I know once the password is forgotten, it cannot be retrieved, and I cannot log in the account or use the funds in it.",
  PatchReferrer: "Add Inviter",
  PatchReferrerLabel: "Invitation code",
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
    "The account name has been taken. Please try another account name",
  NotiRegWrong_Gateway:
    "Filled currency information update failed, please refresh.",
  TotalRebates: "Total Return Cash(USDT)",
  ReferCodeCopied: "Referral code has been copied",
  AuthLogout: "Logged out",
  SetLockTitle: "Please set your temporary unlock gesture",
  SetLockAgain: "Please draw your unlock gesture again",
  SetLockError: "The two gestures are inconsistent, please reset",
  UnlockFaileWithCounter:
    "You have {{count}} times to try. The system will log out if it still has errors. ",
  UnlockSuccess: "Unlocked successfully",
  RebateDetail: "Bonus release",
  EmptyRebate: "No reward",
  EmptyRegisterReferral: "No registration recommendation",
  EmptyGameReferral: "No game recommendation",
  ReferralName: "Account name of the applicant",
  AssetType: "Asset Type",
  Deposit: "Deposit",
  Cleard: "Issued",
  Copy: "Copy",
  Login: "Login",
  Logout: "Logout",
  Unlock: "Unlock",
  Register: "Register",
  ToBeCleard: "Pending release",
  InviteTime: "Recommended time"
};
export const vnDict: Dictionary = {
  LoginSubmit: "Đăng nhập",
  LoginLong: "Đăng nhập",
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
  HasNoAccountYet: "",
  HasAccountAlready: "",
  MyRegisterReferrer: "Người mời tôi đăng ký",
  MyRegisterReferral: "Người tôi mời đăng ký",
  MyGameReferrer: "Người giới thiệu trò chơi cho tôi",
  MyGameReferral: "Người được tôi giới thiệu trò chơi",
  RefererRuleTitle:
    "<strong>Làm thế nào để kiểm tra số tiền hoàn lại của tôi</strong>",
  RefererRuleContent_0:
    "Bạn có thể thấy số tiền rút tiền mặt của từng tài sản trong <strong>Phát tiền thưởng</strong>, bao gồm <strong>Đang chờ xử lý</strong> và <strong>Đã phát</strong>.",
  RefererRuleContent_1:
    "<strong>Tổng tiền hoàn lại</strong> sẽ hiển thị tổng số tiền hoàn lại của bạn và chuyển đổi thành USDT để tính toán hiển thị. Dữ liệu sẽ được cập nhật theo thời gian thực. Nếu bạn có bất kỳ câu hỏi nào khác, xin vui lòng gửi phản hồi cho các trợ lý CybexBet (Wechat: cybexgame-1).",
  RefererRuleContent_2: "",
  PasswordBackupTip:
    "Tôi xác nhận rằng tôi đã sao lưu đúng tên tài khoản và mật khẩu mà tôi sắp tạo. Tôi biết rằng một khi quên mật khẩu, tôi sẽ không thể lấy lại được và tôi sẽ không thể đăng nhập vào tài khoản hoặc sử dụng tiền trong tài khoản đó nữa.",
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
  Poster: "PosterImgBase64VN",
  ErrorRequired: "Mục cần phải điền",
  ErrorRequired_accountName: "Vui lòng điền tên tài khoản",
  ErrorRequired_password: "Vui lòng điền mật khẩu",
  ErrorRequired_confirm: "Vui lòng xác nhận lại mật khẩu",
  ErrorRequired_captcha: "Vui lòng điền mã xác minh",
  ErrorRequired_referrer: "Vui lòng điền mã giới thiệu",
  ErrorMatch: "Mật khẩu không đồng nhất",
  ErrorAccountExists:
    "Tên tài khoản đã được sử dụng, vui lòng chọn tên tài khoản khác",
  NotiRegWrong_Gateway:
    "Cập nhật thông tin nạp rút tiền không thành công, vui lòng làm mới và thử lại",
  TotalRebates: "Tổng tiền lãi (USDT)",
  ReferCodeCopied: "Mã giới thiệu đã được sao chép",
  AuthLogout: "Đã đăng xuất",
  Logout: "Đăng xuất",
  SetLockTitle: "Vui lòng vẽ mẫu mở khóa tạm thời của bạn",
  SetLockAgain: "Vui lòng vẽ lại mẫu mở khóa của bạn",
  SetLockError: "Hai cử chỉ không nhất quán, vui lòng đặt lại",
  UnlockFaileWithCounter:
    "Bạn có {{Count}} lần thử và sẽ bị đăng xuất nếu vẫn bị lỗi",
  UnlockSuccess: "Mở khóa thành công",
  RebateDetail: "Phát phần thưởng",
  EmptyRebate: "Tạm thời không có phần thưởng",
  EmptyRegisterReferral: "Tạm thời không có người giới thiệu đăng ký",
  EmptyGameReferral: "Tạm thời không có người giới thiệu trò chơi",
  ReferralName: "Tên tài khỏa người được giới thiệu",
  AssetType: "Loại tài sản",
  Cleard: "Đã phát hành",
  Copy: "Sao chép",
  Deposit: "Tiền gửi",
  Login: "Đăng nhập",
  Unlock: "Mở khóa",
  Register: "Đăng ký",
  ToBeCleard: "Đang chờ phát hành",
  InviteTime: "Thời gian đề xuất"
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
