import { Guid } from "common/Enums";

export interface IState {
  ItemsNhomSuKien: any;
  ItemsSuKien: any;
  ItemsSuKienCopy: any;
  Count: number,
  ItemsDienRa: any;
}
export const InitState: IState = {
  ItemsNhomSuKien: [],
  ItemsSuKien: [],
  ItemsSuKienCopy: [],
  Count: 0,
  ItemsDienRa: {
    Ten: "",
    ThoiGian: "",
    GiaTien: 0,
    TrangThai: 0
  }
};
