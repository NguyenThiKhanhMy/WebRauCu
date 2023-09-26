import { InitState, IState } from "./InitState";
export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "GetItemHocViens":
      return {
        ...state,
        DataItemHocVien: action.item,
      };
    default:
      return state;
  }
};
