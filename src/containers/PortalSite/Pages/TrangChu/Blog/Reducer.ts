import { InitState, IState } from "./InitState";
import data from "assets/json/TrangChu_config.json";

export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "GetItemBlogPortal":
      let dataBlog = {
        TenNhomTinTuc: data.TinTuc.TieuDe,
        DanhSachTinTuc: [...action.items],
      };
      return {
        ...state,
        DataItemsBlog: dataBlog,
      };
    default:
      return state;
  }
};
