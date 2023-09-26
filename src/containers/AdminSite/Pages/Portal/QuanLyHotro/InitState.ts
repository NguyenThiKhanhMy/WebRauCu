export interface IModelItem {
  Id: String;
  Tieude: String;
  NoiDung: String;
  TrangThaiBanGhi: boolean
}
export interface IState {
  DataItems: IModelItem[];
}
export const InitState: IState = {
  DataItems: [],
};
