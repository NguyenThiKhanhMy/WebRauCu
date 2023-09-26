import { Guid } from "common/Enums";

export interface IState {
  DataDetail: {
    Id: String;
    TieuDe: String;
    ThoiGianHoc: String;
    MoTa: String;
    NoiDung: String;
    URL_AnhDaiDien: String;
    GiaTien: String;
    HocPhiGoc: string;
    HocPhiGiamGia: String;
    TrangThai: Boolean;
  },
  ItemsGiaoAnLyThuyet: any,
  ItemsGiaoAnThucHanh: any,
  ItemKhoaHocThu: {
    GiaoAnLyThuyet: any,
    GiaoAnThucHanh: any
  }
}
export const InitState: IState = {
  ItemsGiaoAnLyThuyet: [],
  ItemsGiaoAnThucHanh: [],
  ItemKhoaHocThu: {
    GiaoAnLyThuyet:[],
    GiaoAnThucHanh:[]
  },
  DataDetail: {
    Id: Guid.Empty,
    TieuDe: "",
    ThoiGianHoc: "",
    MoTa: "",
    NoiDung: "",
    URL_AnhDaiDien: "",
    GiaTien: "",
    HocPhiGoc: "",
    HocPhiGiamGia: "",
    TrangThai: false,
  },
};
