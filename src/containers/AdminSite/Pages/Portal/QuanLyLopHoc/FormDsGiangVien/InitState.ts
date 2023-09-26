export interface IModelItem {
  Id: String;
  Ma: String;
  Ten: String;
  KhoaHoc: String;
  SLHocVien: String;
}
export interface IState {
  DataItemHocVien: IModelItem[];
}
export const InitState: IState = {
  DataItemHocVien: [],
};
