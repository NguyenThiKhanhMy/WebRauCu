import { InitState, IState } from "./InitState";
export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "GetItems":
      return {
        ...state,
        DataItem: action.items,
      };
    default:
      return state;
  }
};
