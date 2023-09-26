import { Guid } from "common/Enums";
import { IControlOptions } from "common/Models";

export interface IModelItem {
  Id: String;
  TenGiaiChay: String;
  URL_AnhGioiThieu1: String;
  URL_AnhGioiThieu2: String;
  TieuDe: String;
  NoiDung: String;
  SoThuTu: Number;
}
export interface IState {
  DataItem: IModelItem;
  Options: IControlOptions[];
  ItemAnhs: any;
}
export const InitState: IState = {
  DataItem: {
    Id: Guid.Empty,
    TenGiaiChay: "",
    URL_AnhGioiThieu1: "",
    URL_AnhGioiThieu2: "",
    TieuDe: "",
    NoiDung: "",
    SoThuTu: 0
  },
  Options: [],
  ItemAnhs: []
};
