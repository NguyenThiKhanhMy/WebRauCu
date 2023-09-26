import { IResponseMessage } from "common/Models";
import { Guid } from "common/Enums";
import { IModelItem } from "./InitState";
import QuanLyVideoService from "services/QuanLyVideo";
import QuanLyNhomVideoService from "services/QuanLyNhomVideo";

export const Actions: any = {
  GetItem: async (id: String, dispatch: any) => {
    if (id) {
      let res: IResponseMessage = await QuanLyVideoService.GetItem(id);
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
        Ten: "",
        IdNhomVideo: "",
      };
      dispatch({
        type: "GetItem",
        item: itemNew,
      });
    }
  },
  CreateItem: async (item: IModelItem, dispatch: any) => {
    let res: IResponseMessage = await QuanLyVideoService.CreateItem(item);
    return res;
  },
  UpdateItem: async (item: IModelItem, dispatch: any) => {
    let res: IResponseMessage = await QuanLyVideoService.UpdateItem(item);
    return res;
  },
  GetCategories: async (key: any, dispatch: any) => {
    let res: IResponseMessage = await QuanLyNhomVideoService.GetCategories();
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
