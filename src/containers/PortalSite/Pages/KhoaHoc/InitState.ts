import { Guid } from "common/Enums";

export interface Item {
  URL_AnhDaiDien: String;
  Id: String;
  TenMonHoc: String;
}

export interface HoatDong {
  Id: String;
  TieuDe: String;
}

export interface IState {
  TreeMonHoc: any;
  DataAllItem: any;
  DataAllItemCopy: any;
  DataItem: {
    DanhSachMonHocCon: Item[];
  };
  DsKhoaHoc: any;
  DataHoatDong: HoatDong[];
  Count: number;
}
export const InitState: IState = {
  TreeMonHoc: [],
  DataAllItem: [],
  DataItem: {
    DanhSachMonHocCon: [],
  },
  DsKhoaHoc: [],
  DataHoatDong: [],
  Count: 0,
  DataAllItemCopy: [],
};
