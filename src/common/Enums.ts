export enum Message {
  Data_Does_Not_Exists = "Dữ liệu không tồn tại !",
  UserName_Is_Not_Empty = "Tên đăng nhập không được để trống !",
  Password_Is_Not_Empty = "Mật khẩu không được để trống !",
  FullName_Is_Not_Empty = "Họ và tên không được để trống !",
  Ten_Is_Not_Empty = "Tên không được để trống !",
  Ho_Is_Not_Empty = "Họ không được để trống !",
  Email_Is_Not_Empty = "Email không được để trống !",
  Email_Is_Not_Format = "Email không đúng định dạng !",
  Phone_Is_Not_Empty = "SĐT không được để trống !",
  Phone_Is_Not_Format = "SĐT không đúng định dạng !",
  OldPassword_Is_Not_Empty = "Mật khẩu cũ không được để trống !",
  NewPassword_Is_Not_Empty = "Mật khẩu mới không được để trống !",
  Require_Row_Selection = "Yêu cầu chọn bản ghi !",
  Response_Success = "Xử lý thành công !",
  Response_Error = "Xử lý lỗi !",
  DuplicateAttribute_Code = "Trùng mã !",
  DuplicateAttribute_LoginName = "Trùng tài khoản hoặc email !",
  DeptNotInOrgan = "Đơn vị không là cấp con của phòng ban !",
  LoginFacebookError = "Đăng nhập Facebook thất bại !",
  LoginGoogleError = "Đăng nhập Google thất bại !",
  DuplicatePassword = "Mật khẩu không trùng",
  PolicyChecking = "Đồng ý chính sách trước khi đăng khí",
  Phone_Wrong = "Hãy nhập đúng số điện thoại",
  Password_Wrong = "Mật khẩu phải có ít nhất 8 ký tự, 1 chữ in hoa, chữ thường, số và kí hiệu",
  TuVan_Wrong = "Hãy nhập đủ thông tin để được tư vấn",
  Add_To_Cart = "Thêm vào giỏ hàng thành công",
  XAC_NHAN_THANH_THOAN_THAT_BAI = "Xin chọn hạng mục cần thanh toán",
  XAC_NHAN_THANH_THOAN_THAT_BAI_A = "Thanh toán thất bại",
  XAC_NHAN_THANH_THOAN_THAT_BAI_B = "Thanh toán thành công"
}
export enum Guid {
  Empty = "00000000-0000-0000-0000-000000000000",
}
export enum LabelPortal {
  ThoiHan = "Thời hạn khóa học ",
  MienPhiTruyCap = "Miễn phí truy cập ",
}
export enum ControlType {
  InputText = "InputText",
  InputTextSearch = "InputTextSearch",
  CkEditor = "CkEditor",
  Cascader = "Cascader",
  TextArea = "TextArea",
  InputNumber = "InputNumber",
  Select = "Select",
  Date = "Date",
  Checkbox = "Checkbox",
  RadioButton = "RadioButton",
  UploadFile = "UploadFile",
}
export enum UserType {
  System = 0,
  Internal = 1,
  Public = 2,
}

export enum GiaoDienPortal {
  TrangChu = 0,
}

export const Thang = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

export const TinTuc = ["img1", "img2", "img3"];
export const AppName = "Sapa Agri";
