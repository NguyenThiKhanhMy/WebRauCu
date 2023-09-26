import { Guid } from "common/Enums";

export interface giohang {
  Id: string;
  TieuDe: string;
  URL_AnhDaiDien: string;
  HocPhiGoc: string;
  HocPhiGiamGia: string;
  Check: boolean;
}

export interface IState {
  Total: number;
  Count: number;
  DataItem: giohang[];
  DataThanhToan: {
    TenNganhang: string;
    ChuThe: string;
    SoTaiKhoan: string;
    NoiDungChuyenKhoan: string;
    URL_AnhQRCode: string;
  };
}

export const InitState: IState = {
  DataItem: [],
  Count: 0,
  Total: 0,
  DataThanhToan: {
    TenNganhang: "",
    ChuThe: "",
    SoTaiKhoan: "",
    NoiDungChuyenKhoan: "",
    URL_AnhQRCode: ""
  }
};
