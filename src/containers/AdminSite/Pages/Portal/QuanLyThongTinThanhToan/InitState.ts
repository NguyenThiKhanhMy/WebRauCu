export interface IModelItem {
  Id: String;
  TenNganhang: String;
  ChuThe: String;
  SoTaiKhoan: String;
  NoiDungChuyenKhoan: String;
  URL_AnhQRCode: String;
}
export interface IState {
  DataItems: IModelItem[];
}
export const InitState: IState = {
  DataItems: [],
};
