import { InitState, IState } from "./InitState";

export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "GetChiTiet":
      return {
        ...state,
        DataItems: action.items
      }
    default:
      return state;
  }
};
