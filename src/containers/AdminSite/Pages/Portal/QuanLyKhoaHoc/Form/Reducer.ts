import { InitState, IState } from "./InitState";
export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "GetItem":
      return {
        ...state,
        DataItem: action.item,
      };
    case "GetTreeList":
      let categories: any = [...state.Options];
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
    case "GetItemsVideo":
      return {
        ...state,
        ItemVideos: [...action.item],
      };
    case "GetItemsAnh":
      return {
        ...state,
        ItemAnhs: [...action.item],
      };
    case "setURL_Video":
      return {
        ...state,
        DataItem: {
          ...state.DataItem,
          URL_VideoDaiDien: action.item,
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
    case "setURL_AnhChiTiet":
      return {
        ...state,
        DataItem: {
          ...state.DataItem,
          URL_AnhChiTiet: action.item,
        },
      };
    case "GetCategories":
      let lists: any = [...state.Options];
      lists.push({ Key: action.key, Options: action.items });
      return {
        ...state,
        Options: lists,
      };
    default:
      return state;
  }
};
