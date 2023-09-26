import { Guid } from "common/Enums";
import { IControlOptions } from "common/Models";

export interface IModelItem {
  id: String;
  tieuDe: String;
  moTa: String;
  noiDung: String;
  IdGiaoVien: String;
  urL_AnhDaiDien: String;
  ngayXuatBan: Date;
  hocPhiGoc: Number;
  hocPhiGiamGia: Number;
  idMonHoc: String;
  trangThaiBanGhi: Boolean;
  trangThai: Boolean;
}

export interface IState {
  DataItem: IModelItem[];
  ItemKhoaHoc: {
    IdCongTacVien: String;
    IdKhoaHoc: String;
    SoLuong: Number;
    TongHocPhiGoc: Number;
    TongHocPhiGiamGia: Number;
    Id: Guid.Empty;
    NgayBan: String;
    ChietKhau: Number
  }
}
export const InitState: IState = {
  DataItem: [],
  ItemKhoaHoc: {
    IdCongTacVien: "",
    IdKhoaHoc: "",
    SoLuong: 0,
    TongHocPhiGoc:  0,
    TongHocPhiGiamGia:  0,
    Id: Guid.Empty,
    NgayBan: "",
    ChietKhau: 0
  }
}
