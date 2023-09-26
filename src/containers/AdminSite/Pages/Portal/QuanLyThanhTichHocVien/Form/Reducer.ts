import { InitState, IState } from "./InitState";
export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "GetItem":
      return {
        ...state,
        DataItem: action.item,
      };
    case "GetItemsAnh":
      return {
        ...state,
        ItemAnhs: [...action.item],
      };
    case "SetURL_AnhGioiThieu1":
      return {
        ...state,
        DataItem: {
          ...state.DataItem,
          URL_AnhGioiThieu1: action.item,
        },
      };
    case "SetURL_AnhGioiThieu2":
      return {
        ...state,
        DataItem: {
          ...state.DataItem,
          URL_AnhGioiThieu2: action.item,
        },
      };
    case "GetCategories":
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
    default:
      return state;
  }
};
