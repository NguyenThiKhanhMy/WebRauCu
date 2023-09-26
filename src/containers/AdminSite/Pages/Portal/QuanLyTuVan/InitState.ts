export interface IModelItem {
  Id: String;
  Ten: String;
  GioiTinh: String;
  Sdt: String;
  Email: String;
  NoiDung: String;
}
export interface IState {
  DataItems: IModelItem[];
}
export const InitState: IState = {
  DataItems: [],
};
