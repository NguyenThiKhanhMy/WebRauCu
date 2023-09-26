import { InitState, IState } from "./InitState";
import data from "assets/json/TrangChu_config.json";

export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "GetItemSuKien":
      let dataSuKien = {
        TenTieuDe: data.SuKien.TieuDe,
        DanhSachSuKien: [...action.items],
      };
      return {
        ...state,
        DataItemsSuKien: dataSuKien,
      };

    default:
      return state;
  }
};
