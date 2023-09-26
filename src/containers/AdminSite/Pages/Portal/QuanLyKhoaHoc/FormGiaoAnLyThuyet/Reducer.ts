import { Guid } from "common/Enums";
import { InitState, IState } from "./InitState";
export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "GetTree":
      let nodeTree = state.Tree;
      nodeTree[0].Children = action.item;
      return {
        ...state,
        Tree: nodeTree,
      };
    case "GetItemsVideo":
      return {
        ...state,
        ItemVideos: [...action.item],
      };
    case "SaveState":
      return {
        ...state,
        Item: action.item,
      };
    case "CopyItem":
      return {
        ...state,
        Item: {
          ...state.Item,
          Id: Guid.Empty,
        },
      };
    case "GetItem":
      return {
        ...state,
        Item: {
          ...action.item,
        },
      };
    case "GetTreeList":
      return {
        ...state,
        ItemAnhs: action.items,
      };
    case "setURL_VideoGiaoAnLyThuyet":
      return {
        ...state,
        Item: {
          ...state.Item,
          URL_Video: action.item,
        },
      };
    case "setURL_Anh":
      //const data: any = state.ItemAnhs.find((item: any) => { return item.TieuDe == action.item })
      return {
        ...state,
        ItemChuyen: {
          Id: action.item.id,//data.Id,
          IdKhoaHocDes: action.item.ten,
        },
      };
    default:
      return state;
  }
};
