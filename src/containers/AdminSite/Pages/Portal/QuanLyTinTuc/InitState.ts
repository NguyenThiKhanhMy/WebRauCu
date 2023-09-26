export interface IModelItem {
  id: String;
  tieuDe: String;
  moTa: String;
  noiDung: String;
  tacGia: String;
  urL_AnhDaiDien: String;
  ngayXuatBan: Date;
  tinNoiBat: Boolean;
  tinMoi: Boolean;
  luotXem: Number;
  idNhomTinTuc: String;
  trangThaiBanGhi: Boolean;
}
export interface IState {
  DataItems: IModelItem[];
}
export const InitState: IState = {
  DataItems: [],
};
