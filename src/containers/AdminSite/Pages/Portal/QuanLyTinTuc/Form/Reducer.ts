import { InitState, IState } from "./InitState";
export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "GetItem":
      return {
        ...state,
        DataItem: action.item,
      };
    case "GetTreeList":
      let categories: any = [];
      categories.push({ Key: action.key, Options: action.items });
      return {
        ...state,
        Options: categories,
      };
    case "SaveState":
      return {
        ...state,
        DataItem: action.item,
      };
    case "setTacGia":
      return {
        ...state,
        DataItem: {
          ...state.DataItem,
          TacGia: action.item,
        },
      };
    case "setURL_Anh":
      return {
        ...state,
        DataItem: {
          ...state.DataItem,
          URL_AnhDaiDien: action.item,
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
