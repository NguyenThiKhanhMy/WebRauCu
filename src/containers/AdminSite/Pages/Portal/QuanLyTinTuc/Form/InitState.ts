import { Guid } from "common/Enums";
import { IControlOptions } from "common/Models";

export interface IModelItem {
  Id: String;
  TieuDe: String;
  MoTa: String;
  NoiDung: String;
  TacGia: String;
  URL_AnhDaiDien: String;
  NgayXuatBan: Date;
  TinNoiBat: Boolean;
  TinMoi: Boolean;
  LuotXem: Number;
  IdNhomTinTuc: String;
  TrangThaiBanGhi: Boolean;
}
export interface IState {
  ItemAnhs: any
  DataItem: IModelItem;
  Options: IControlOptions[];
}
export const InitState: IState = {
  ItemAnhs:[],
  DataItem: {
    Id: Guid.Empty,
    TieuDe: "",
    MoTa: "",
    NoiDung: "",
    TacGia: "",
    URL_AnhDaiDien: "",
    NgayXuatBan: new Date(),
    TinNoiBat: false,
    TinMoi: false,
    LuotXem: 0,
    IdNhomTinTuc: "",
    TrangThaiBanGhi: true,
  },
  Options: [],
};
