import { Guid } from "common/Enums";

export interface IModelItem {
  Id: String;
  Ma: String;
  Ten: String;
  MoTa: String;
  GiaGiaoDong: String;
  IdMonHocCha?: String;
  TrangThaiBanGhi: Boolean;
  URL_AnhDaiDien: String;
}
export interface IModelTree {
  Id: String;
  Code: String;
  Name: String;
  Children: Array<IModelTree>;
}
export interface IState {
  DataItems: IModelItem[];
  DataTree: IModelTree[];
}
export const InitState: IState = {
  DataItems: [],
  DataTree: [
    {
      Id: Guid.Empty,
      Code: "CayMonHoc",
      Name: "Cây môn học",
      Children: [],
    },
  ],
};
