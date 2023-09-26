import { Guid } from "common/Enums";
export interface IState {
  DataDetail: {
    Id: String;
    TieuDe: String;
    MoTa: String;
    URL_AnhDaiDien: String;
    TinNoiBat: String;
    LuotXem: String;
    TacGia: String;
    NgayXuatBan: string;
    NoiDung: String;
  };
  DataDetailSuKien: {
    Id: String;
    Ten: String;
    MoTa: String;
    URL_AnhDaiDien: String;
    TinNoiBat: String;
    LuotXem: String;
    TacGia: String;
    ThoiGian: string;
    NoiDung: String;
    GiaTien: String;
  };
  DataDetailTinTucLienQuan:any
}
export const InitState: IState = {
  DataDetail: {
    Id: Guid.Empty,
    TieuDe: "",
    MoTa: "",
    URL_AnhDaiDien: "",
    TinNoiBat: "",
    LuotXem: "",
    TacGia: "",
    NgayXuatBan: "",
    NoiDung: "",
  },
  DataDetailSuKien: {
    Id: Guid.Empty,
    Ten: "",
    MoTa: "",
    URL_AnhDaiDien: "",
    TinNoiBat: "",
    LuotXem: "",
    TacGia: "",
    ThoiGian: "",
    NoiDung: "",
    GiaTien: "",
  },
  DataDetailTinTucLienQuan:[]
};
