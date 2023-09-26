export interface IModelGen {
  TenMonHoc: string;
  DanhSachKhoaHoc: [];
}

export interface IState {
  DataItemsKhoaHoc: IModelGen[];
}
export const InitState: IState = {
  DataItemsKhoaHoc: [],
};
