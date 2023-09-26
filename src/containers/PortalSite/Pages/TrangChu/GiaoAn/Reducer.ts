import { InitState, IState } from "./InitState";
import data from "assets/json/TrangChu_config.json";

export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "GetItemGiaoAn":
      let dataGiaoAn = {
        DanhSachMonHocCon: [...action.items],
        TenTieuDe: data.MonHoc.TieuDe,
      };
      return {
        ...state,
        DataItemsGiaoAn: dataGiaoAn,
      };

    default:
      return state;
  }
};
