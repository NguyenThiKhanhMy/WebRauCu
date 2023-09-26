import { Guid } from "common/Enums";

export interface IModelItem {
  Id: String;
  Ma: String;
  Ten: String;
  URL: String;
  ThuTu: String;
  IdMenuCha?: String;
  TrangThaiBanGhi: Boolean;
}
export interface IState {
  DataItem: IModelItem;
}
export const InitState: IState = {
  DataItem: {
    Id: Guid.Empty,
    Ma: "",
    Ten: "",
    URL: "",
    ThuTu: "",
    IdMenuCha: Guid.Empty,
    TrangThaiBanGhi: true,
  },
};
