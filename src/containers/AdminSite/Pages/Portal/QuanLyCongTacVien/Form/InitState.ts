import { Guid } from "common/Enums";
import { IControlOptions } from "common/Models";

export interface IModelItem {
  Id: String;
  Ten: String;
  GioiTinh: Number;
  Sdt: String;
  Email: String;
  MoTa: String;
}
export interface IState {
  DataItem: IModelItem;
}
export const InitState: IState = {
  DataItem: {
    Id: Guid.Empty,
    Ten: "",
    GioiTinh: 0,
    Sdt: "",
    Email: "",
    MoTa: "",
  },
};
