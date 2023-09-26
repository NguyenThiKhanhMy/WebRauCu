import { Guid } from "common/Enums";
import { IControlOptions } from "common/Models";

export interface IModelItem {
  Id: String;
  Ma: String;
  Ten: String;
  URL_Anh: String;
  IdNhomAnh: String;
}
export interface IState {
  DataItem: IModelItem;
  Options: IControlOptions[];
}
export const InitState: IState = {
  DataItem: {
    Id: Guid.Empty,
    Ma: "",
    Ten: "",
    URL_Anh: "",
    IdNhomAnh: ""
  },
  Options: [],
};
