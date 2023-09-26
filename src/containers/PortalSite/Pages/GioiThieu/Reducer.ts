import { InitState, IState } from "./InitState";
export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "GetCauHinhBlog":
      return {
        ...state,
        DataItem: action.items,
      };
    case "GetThanhTich":
      let dataleft = action.items;
      let dataright = [];
      if (action.items.length > 1) {
        dataleft = action.items.slice(0, Math.ceil(action.items.length / 2));
        dataright = action.items.slice(
          Math.ceil(action.items.length / 2),
          action.items.length
        );
      }
      return {
        ...state,
        DataThanhTichLeft: dataleft,
        DataThanhTichRight: dataright,
      };
    default:
      return state;
  }
};
