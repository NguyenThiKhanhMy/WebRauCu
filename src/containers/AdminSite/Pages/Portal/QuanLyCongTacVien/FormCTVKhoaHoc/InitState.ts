import { Guid } from "common/Enums";
import { IControlOptions } from "common/Models";

export interface IModelItem {
  IdCongTacVien: String,
  IdKhoaHoc: String,
  SoLuong: Number,
  TongHocPhiGoc: Number,
  TongHocPhiGiamGia: Number,
  Id: String,
  CreatedDateTime: String
}
export interface IState {
  DataItem: IModelItem[];
  DataItemCopy: any; 
  ItemTongChietKhau: any
  TienHoaHong: any
}
export const InitState: IState = {
  DataItem: [],
  ItemTongChietKhau: {
    fromDate: "",
    toDate: ""
  },
  DataItemCopy: [],
  TienHoaHong: ""
}
