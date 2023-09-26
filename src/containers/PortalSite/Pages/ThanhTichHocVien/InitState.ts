import { Guid } from "common/Enums";

export interface IModelItem {
  Id: Guid.Empty;
  TenGiaiChay: String;
  URL_AnhGioiThieu1: String;
  URL_AnhGioiThieu2: String;
  TieuDe: String;
  NoiDung: String;
  SoThuTu: Number;
}

export interface IState {
  DataItems: IModelItem[]
}

export const InitState: IState = {
  DataItems: []
};
