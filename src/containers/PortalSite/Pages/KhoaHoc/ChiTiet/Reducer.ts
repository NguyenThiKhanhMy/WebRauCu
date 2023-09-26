import { InitState, IState } from "./InitState";
export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "getDetail":
      return {
        ...state,
        DataDetail: action.items,
      };
    case "GetKhoaHocLienQuan":
      return {
        ...state,
        DataItemsKhoaHoc: action.items,
      };
    default:
      return state;
  }
};
