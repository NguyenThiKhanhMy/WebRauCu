import { InitState, IState } from "./InitState";
export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "GetItem":
      return {
        ...state,
        DataItem: action.item,
      };
    case "SaveState":
      return {
        ...state,
        DataItem: action.item,
      };
    case "setURL_Anh":
      return {
        ...state,
        DataItem: {
          ...state.DataItem,
          URL_AnhQRCode: action.item,
        },
      };
    case "GetItemsAnh":
      return {
        ...state,
        ItemAnhs: [...action.item],
      };
    default:
      return state;
  }
};
