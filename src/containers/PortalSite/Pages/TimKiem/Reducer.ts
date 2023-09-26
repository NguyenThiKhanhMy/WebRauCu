import { InitState, IState } from "./InitState";
export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "GetItemTimKiem":
      return{
        ...state,
        DataItem: action.items,
        Count: action.items.length
      }
  
    default:
      return state;
  }
};
