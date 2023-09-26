export interface danhSachTintuc {
  Id: String;
  TieuDe: String;
  MoTa: String;
  URL_AnhDaiDien: String;
  Img: String;
  TieuDeGioiThieu: String;
}

export interface IState {
  DataItemsBlog: {
    TenNhomTinTuc: string;
    DanhSachTinTuc: danhSachTintuc[];
  };
}
export const InitState: IState = {
  DataItemsBlog: {
    TenNhomTinTuc: "",
    DanhSachTinTuc: [],
  },
};
