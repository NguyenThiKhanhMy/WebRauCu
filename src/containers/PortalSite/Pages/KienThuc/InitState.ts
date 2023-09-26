import { Guid } from "common/Enums";

export interface Item {
  Id: String;
  Ma: String;
  Ten: String;
}

export interface IState {
  DataItemTinTucNoiBat: any;
  DataItemTinTuc: any;
  TreeChuyenMuc: any;
  Count: number;
  DataItemTinTucCopy: any;
}
export const InitState: IState = {
  DataItemTinTucNoiBat: [],
  DataItemTinTuc: [],
  TreeChuyenMuc: [],
  Count: 0,
  DataItemTinTucCopy: [],
};
