import { InitState, IState } from "./InitState";
export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "GetItem":
      return {
        ...state,
        DataItem: action.item,
        DataItemCopy: action.item
      };
    case "GetTimKiem":
      return {
        ...state,
        DataItem: action.item.congTacVien_KhoaHoc_DaBans,
        TienHoaHong: action.item.TienHoaHong
      }
    case "GetReload":
      return{
        ...state,
        DataItem: state.DataItemCopy,
        TienHoaHong: ""
      }
    default:
      return state;
  }
};
