import { Guid } from "common/Enums";
import { IControlOptions } from "common/Models";

export interface IModelItem {
  Id: String;
  TaiKhoan: String;
  HoVaTenNguoiMua: String;
  Sdt: String;
  Email: String;
  SoLuongKhoaHoc: Number;
  TongThanhToan: Number;
  SoTienDaChuyenKhoan: Number;
  NgayThanhToan: String;
  URL_FileDinhKem: String;
  Files: any
}
export interface IState {
  DataItem: IModelItem;
  Options: any
}
export const InitState: IState = {
  DataItem: {
    Id: Guid.Empty,
    TaiKhoan: "",
    HoVaTenNguoiMua: "",
    Sdt: "",
    Email: "",
    SoLuongKhoaHoc: 0,
    TongThanhToan: 0,
    SoTienDaChuyenKhoan: 0,
    NgayThanhToan: "",
    URL_FileDinhKem: "",
    Files: null
  },
  Options: []
};
