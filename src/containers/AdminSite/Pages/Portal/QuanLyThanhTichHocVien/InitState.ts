export interface IModelItem {
  Id: String;
  TenGiaiChay: String;
  TieuDe: String;
}
export interface IState {
  DataItems: IModelItem[];
}
export const InitState: IState = {
  DataItems: [],
};
