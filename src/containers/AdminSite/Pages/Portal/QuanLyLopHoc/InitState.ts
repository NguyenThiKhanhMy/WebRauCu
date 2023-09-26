export interface IModelItem {
  Id: String;
  Ma: String;
  Ten: String;
  KhoaHoc: String;
  SLHocVien: String;
}
export interface IState {
  DataItems: IModelItem[];
}
export const InitState: IState = {
  DataItems: [],
};
