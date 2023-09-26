export interface IModelItem {
  Id: String;
  Ma: String;
  TieuDe: String;
  TrangThaiBanGhi: String;
}
export interface IState {
  DataItems: IModelItem[];
}
export const InitState: IState = {
  DataItems: [],
};
