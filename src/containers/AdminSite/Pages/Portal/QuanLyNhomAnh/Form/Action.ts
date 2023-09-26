import { IResponseMessage } from "common/Models";
import { Guid } from "common/Enums";
import { IModelItem } from "./InitState";
import QuanLyNhomAnhService from "services/QuanLyNhomAnhService";

export const Actions: any = {
  GetItem: async (id: String, dispatch: any) => {
    if (id) {
      let res: IResponseMessage = await QuanLyNhomAnhService.GetItem(id);
      if (res && res.Success) {
        dispatch({
          type: "GetItem",
          item: res.Data,
        });
      }
    } else {
      let itemNew: IModelItem = {
        Id: Guid.Empty,
        Ma: "",
        Ten: ""
      };
      dispatch({
        type: "GetItem",
        item: itemNew,
      });
    }
  },
  CreateItem: async (item: IModelItem, dispatch: any) => {
    let res: IResponseMessage = await QuanLyNhomAnhService.CreateItem(item);
    return res;
  },
  UpdateItem: async (item: IModelItem, dispatch: any) => {
    let res: IResponseMessage = await QuanLyNhomAnhService.UpdateItem(item);
    return res;
  },
  GetCategories: async (key: any, dispatch: any) => {
    let res: IResponseMessage = await QuanLyNhomAnhService.GetCategories();
    if (res && res.Success) {
      dispatch({
        type: "GetCategories",
        key: key,
        items: res.Data,
      });
    }
    return res;
  },
};
