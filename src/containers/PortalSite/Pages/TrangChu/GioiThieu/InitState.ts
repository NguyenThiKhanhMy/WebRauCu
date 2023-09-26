export interface danhSachTintuc {
  Id: String;
  TieuDe: String;
  MoTa: String;
  URL_AnhDaiDien: String;
  Img: String;
  TieuDeGioiThieu: String;
}

export interface IState {
  DataItemsGioiThieu: {
    TenNhomGioiThieu: string;
    DanhSachGioiThieu: danhSachTintuc[];
  }
}
export const InitState: IState = {
  DataItemsGioiThieu: {
    TenNhomGioiThieu: "",
    DanhSachGioiThieu: [],
  }
};
