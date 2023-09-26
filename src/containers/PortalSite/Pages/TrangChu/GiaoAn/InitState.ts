export interface IModelMonHocCon {
  Id: String;
  MoTa: String;
  GiaGiaoDongTu: Number;
  GiaGiaoDongDen: Number;
  URL_AnhDaiDien: String;
  TieuDe: String;
  DSKhoiMonHoc?: any;
  MaURL: any;
}

export interface IState {
  DataItemsGiaoAn: {
    TenTieuDe: string;
    DanhSachMonHocCon: IModelMonHocCon[];
  };
}
export const InitState: IState = {
  DataItemsGiaoAn: {
    TenTieuDe: "",
    DanhSachMonHocCon: [],
  },
};
