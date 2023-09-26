export interface IModelItem {
  id: String;
  ma: String;
  ten: String;
  trangThaiBanGhi: Boolean;
}
export interface IState {
  DataItems: IModelItem[];
}
export const InitState: IState = {
  DataItems: [],
};
