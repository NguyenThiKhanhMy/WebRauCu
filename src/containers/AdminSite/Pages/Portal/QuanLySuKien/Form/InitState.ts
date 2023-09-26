import { Guid } from "common/Enums";
import { IControlOptions } from "common/Models";

export interface IModelItem {
  Id: String;
  Ten: String;
  NoiDung: String;
  DiaChi: String;
  URL_AnhDaiDien: String;
  ThoiGian: Date;
  GiaTien: Number;
  IdNhomSuKien: String;
  TrangThaiBanGhi: Boolean;
  TrangThai: Number;
}
export interface IState {
  ItemAnhs: any;
  DataItem: IModelItem;
  Options: IControlOptions[];
}
export const InitState: IState = {
  DataItem: {
    Id: Guid.Empty,
    Ten: "",
    NoiDung: "",
    DiaChi: "",
    URL_AnhDaiDien: "",
    ThoiGian: new Date(),
    GiaTien: 0,
    IdNhomSuKien: "",
    TrangThaiBanGhi: true,
    TrangThai: 1,
  },
  ItemAnhs: [],
  Options: [],
};
