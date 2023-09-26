import { InitState, IState } from "./InitState";
export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "GetItemTnTucNoiBat":
      return {
        ...state,
        DataItemTinTucNoiBat: [...action.items],
      };
    case "GetItemTnTuc":
      let data = action.items.slice(action.start, action.end);
      return {
        ...state,
        DataItemTinTuc: [...data],
        Count: action.items.length,
        DataItemTinTucCopy: action.items,
      };
    case "GetItemTnTucChange":
      let datas = state.DataItemTinTucCopy.slice(action.start, action.end);
      return {
        ...state,
        DataItemTinTuc: [...datas],
      };
    case "GetItemChuyenMuc":
      return {
        ...state,
        TreeChuyenMuc: [...action.item],
      };

    default:
      return state;
  }
};
