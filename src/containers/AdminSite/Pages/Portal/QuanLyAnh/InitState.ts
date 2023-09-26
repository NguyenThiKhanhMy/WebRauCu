export interface IModelItem {
  Id: String;
  Ma: String;
  Ten: String;
  URL_Anh: String;
  IdNhomAnh: String;
  TrangThaiBanGhi: Boolean;
}
export interface IState {
  DataItems: IModelItem[];
}
export const InitState: IState = {
  DataItems: [],
};
