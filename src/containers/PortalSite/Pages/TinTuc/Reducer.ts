import { InitState, IState } from "./InitState";
export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "getDetailTinTuc":
      return {
        ...state,
        DataDetail: action.items,
      };
    case "getDetailSuKien":
      return {
        ...state,
        DataDetailSuKien: action.items,
      };
    case "GetTinTucLienQuan":
      return {
        ...state,
        DataDetailTinTucLienQuan: action.items,
      };
    default:
      return state;
  }
};
