import { Guid } from "common/Enums";
import { IControlOptions } from "common/Models";

export interface IModelItem {
  Id: String;
  TenNganhang: String;
  ChuThe: String;
  SoTaiKhoan: String;
  NoiDungChuyenKhoan: String;
  URL_AnhQRCode: String;
  TrangThaiBanGhi: Boolean;
}
export interface IState {
  DataItem: IModelItem;
  ItemAnhs: any 
}
export const InitState: IState = {
  DataItem: {
    Id: Guid.Empty,
    TenNganhang: "",
    ChuThe: "",
    SoTaiKhoan: "",
    NoiDungChuyenKhoan: "",
    URL_AnhQRCode: "",
    TrangThaiBanGhi: false
  },
  ItemAnhs:[],
};
