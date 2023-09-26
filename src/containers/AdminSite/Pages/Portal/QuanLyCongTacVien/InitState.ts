export interface IModelItem {
  Id: String;
  Ten: String;
  GioiTinh: String;
  Sdt: String;
  Email: String;
  MoTa: String;
}
export interface IState {
  DataItems: IModelItem[];
}
export const InitState: IState = {
  DataItems: [],
};
