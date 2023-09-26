import { InitState, IState } from "./InitState";
import data from "assets/json/TrangChu_config.json";

export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "GetItemGioiThieu":
      action.items.forEach((val: any, index: any) => {
        val.Img = action.array[index];
      });
      let dataGioiThieu: any = {
        TenNhomGioiThieu: "",
        DanhSachGioiThieu: [],
      };
      if (data.GioiThieu.TieuDe) {
        dataGioiThieu.TenNhomGioiThieu = data.GioiThieu.TieuDe;
        dataGioiThieu.DanhSachGioiThieu = action.items;
      } else {
        if (action.items.length > 0) {
          dataGioiThieu.TenNhomGioiThieu = action.items[0].TieuDeGioiThieu;
          dataGioiThieu.DanhSachGioiThieu = action.items;
        } else {
          dataGioiThieu.TenNhomGioiThieu = data.GioiThieu.TieuDe;
          dataGioiThieu.DanhSachGioiThieu = action.items;
        }
      }
      return {
        ...state,
        DataItemsGioiThieu: dataGioiThieu,
      };
    default:
      return state;
  }
};
