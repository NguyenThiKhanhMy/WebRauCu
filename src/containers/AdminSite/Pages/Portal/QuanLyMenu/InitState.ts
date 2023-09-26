import { Guid } from "common/Enums";

export interface IModelItem {
  id: String;
  ma: String;
  ten: String;
  url: String;
  thuTu: String;
  idMenuCha?: String;
  TrangThaiBanGhi: Boolean;
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
      Code: "CayMenu",
      Name: "Cây menu",
      Children: [],
    }
  ],
};
