export interface IModelItem {
  Id: String;
  GiaoDien: Number;
  NoiDung: String;
}
export interface IState {
  DataItems: IModelItem[];
}
export const InitState: IState = {
  DataItems: [],
};
