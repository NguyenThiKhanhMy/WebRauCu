import { InitState, IState } from "./InitState";
export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "GetItem":
      let data = action.items.slice(0, 10);
      return {
        ...state,
        DataItem: data,
        DataItemCopy: action.items,
        Count: action.items.length,
      };
    case "GetItemChange":
      let changeData = state.DataItemCopy.slice(action.start, action.end)
      return {
        ...state,
        DataItem: changeData
      };
    default:
      return state;
  }
};
