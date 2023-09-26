export interface IModelItem {
  id: String;
  ten: String;
  moTa: String;
  diaChi: String;
  noiDung: String;
  urL_AnhDaiDien: String;
  giaTien: String;
  thoiGian: Date;
  trangThai: Number;
  idNhomSuKien: String;
  trangThaiBanGhi: Boolean;
}
export interface IState {
  DataItems: IModelItem[];
}
export const InitState: IState = {
  DataItems: [],
};
