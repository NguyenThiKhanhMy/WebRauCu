import { Guid } from "common/Enums";
import { IControlOptions } from "common/Models";

export interface IModelItem {
  Id: String;
  Tieude: String;
  NoiDung: String;
  TrangThaiBanGhi: boolean;
}
export interface IState {
  DataItem: IModelItem;
}
export const InitState: IState = {
  DataItem: {
    Id: Guid.Empty,
    Tieude: "",
    NoiDung: "",
    TrangThaiBanGhi: true,
  },
};
