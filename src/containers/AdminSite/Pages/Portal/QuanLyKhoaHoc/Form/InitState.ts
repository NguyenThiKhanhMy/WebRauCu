import { Guid } from "common/Enums";
import { IControlOptions } from "common/Models";

export interface IModelItem {
  Id: String;
  IdMonHoc: String;
  IdLoaiKhoaHoc: String;
  URL_AnhDaiDien: String;
  URL_AnhChiTiet: String;
  URL_VideoDaiDien: String;
  TieuDe: String;
  TrangThai: Boolean;
  TyLeDanhGia: Number;
  HocPhiGoc: Number;
  HocPhiGiamGia: Number;
  ThoiHan: Number;
  ThoiHanTruyCapMienPhi: Number;
  GioiThieu: String;
  NoiDung: String;
  TrangThaiBanGhi: Boolean;
  CreatedDateTime: Date;
}
export interface IModelItems {
  Id: String;
  IdGiaoAnLyThuyet: String;
  Loai: Number;
  TieuDe: String;
  URL_Video: String;
  ThoiLuong: Number;
  MienPhi: Boolean;
  SoThuTu: Number;
}
export interface IState {
  ItemVideos: any;
  ItemAnhs: any;
  DataItem: IModelItem;
  Options: IControlOptions[];
}
export const InitState: IState = {
  ItemVideos: [],
  ItemAnhs:[],
  DataItem: {
    Id: Guid.Empty,
    IdMonHoc: Guid.Empty,
    IdLoaiKhoaHoc: Guid.Empty,
    URL_AnhDaiDien: "",
    URL_AnhChiTiet: "",
    URL_VideoDaiDien: "",
    TieuDe: "",
    TrangThai: true,
    TyLeDanhGia: 0,
    HocPhiGoc: 0,
    HocPhiGiamGia: 0,
    ThoiHan: 0,
    ThoiHanTruyCapMienPhi: 0,
    GioiThieu: "",
    NoiDung: "",
    TrangThaiBanGhi: true,
    CreatedDateTime: new Date(),
  },
  Options: [],
};
