import { IResponseMessage } from "common/Models";
import { GiaoDienPortal, Guid } from "common/Enums";
import { IModelItem } from "./InitState";
import QuanLyGiaoDienService from "services/QuanLyGiaoDien";

export const Actions: any = {
  GetItem: async (id: String, dispatch: any) => {
    if (id) {
      let res: IResponseMessage = await QuanLyGiaoDienService.GetItem(id);

      if (res && res.Success) {
        dispatch({
          type: "GetItem",
          item: res.Data,
        });
      }
    } else {
      let itemNew: IModelItem = {
        Id: Guid.Empty,
        GiaoDien: GiaoDienPortal.TrangChu,
        NoiDung: "",
      };
      dispatch({
        type: "GetItem",
        item: itemNew,
      });
    }
  },
  CreateItem: async (item: IModelItem, dispatch: any) => {
    let res: IResponseMessage = await QuanLyGiaoDienService.CreateItem(item);
    return res;
  },
  UpdateItem: async (item: IModelItem, dispatch: any) => {
    let res: IResponseMessage = await QuanLyGiaoDienService.UpdateItem(item);
    return res;
  },
};
