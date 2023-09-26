import { Guid } from "common/Enums";
import { InitState, IState } from "./InitState";
export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "getSuKienPortal": {
      let data = action.items.slice(0, 10)
      return {
        ...state,
        ItemsSuKien : [...data],
        Count: action.items.length,
        ItemsSuKienCopy: action.items
      };
    }
    case "getSuKienPortalChange":
      let datas = state.ItemsSuKienCopy.slice(action.start, action.end);
      return {
        ...state,
        ItemsSuKien: [...datas],
      };
    case "GetHoatDong":
      var tempItemsNhomSuKien = [{ Id: Guid.Empty, Ma: "TatCa", Ten: "Tất cả"}]
      tempItemsNhomSuKien.push.apply(tempItemsNhomSuKien, action.items);
      return {
        ...state,
        ItemsNhomSuKien : tempItemsNhomSuKien
      };
      case "getSapDienRa":
        return {
          ...state,
          ItemsDienRa: action.items
        }
    default:
      return state;
  }
};
