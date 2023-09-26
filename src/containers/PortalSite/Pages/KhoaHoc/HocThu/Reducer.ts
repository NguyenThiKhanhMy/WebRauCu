import { InitState, IState } from "./InitState";
export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "GetKhoaHocThuPortal":
      return {
        ...state,
        ItemKhoaHocThu: action.items,
      }
    case "getGiaoAnLyThuyet":
      return {
        ...state,
        ItemsGiaoAnLyThuyet: action.items,
      };
    case "getGiaoAnThucHanh":
      return {
        ...state,
        ItemsGiaoAnThucHanh: action.items,
      };
    default:
      return state;
  }
};
