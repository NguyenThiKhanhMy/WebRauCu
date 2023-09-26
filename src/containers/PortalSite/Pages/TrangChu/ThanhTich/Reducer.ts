import { InitState, IState } from "./InitState";

export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "GetThanhTich":
      return {
        ...state,
        DataThanhTich: action.items,
      };
    case "GetThanhTichDetail":
      return {
        ...state,
        DataHocVien: action.items,
      };
    default:
      return state;
  }
};
