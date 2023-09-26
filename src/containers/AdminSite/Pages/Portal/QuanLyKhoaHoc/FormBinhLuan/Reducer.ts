import { InitState, IState } from "./InitState";
export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "GetItemHocVien":
      return {
        ...state,
        DataHocVien: action.item,
      };
    default:
      return state;
  }
};
