import { InitState, IState } from "./InitState";
export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "GetItem":
      return {
        ...state,
        DataItem: action.item,
      };
    case "GetNhomSuKienList":
      let categories: any = [];
      categories.push({ Key: action.key, Options: action.items });
      return {
        ...state,
        Options: categories,
      };
    case "setURL_Anh":
      return {
        ...state,
        DataItem: {
          ...state.DataItem,
          URL_AnhDaiDien: action.item,
        },
      };
    case "SaveState":
      return {
        ...state,
        DataItem: action.item,
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
