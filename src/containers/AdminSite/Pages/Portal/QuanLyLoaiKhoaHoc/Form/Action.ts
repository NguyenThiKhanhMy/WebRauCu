import { IResponseMessage } from "common/Models";
import { Guid } from "common/Enums";
import { IModelItem } from "./InitState";
import QuanLyLoaiKhoaHocService from "services/QuanLyLoaiKhoahoc";

export const Actions: any = {
  GetItem: async (id: String, dispatch: any) => {
    if (id) {
      let res: IResponseMessage = await QuanLyLoaiKhoaHocService.GetItem(id);

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
        TieuDe: "",
        TrangThaiBanGhi: "",
      };
      dispatch({
        type: "GetItem",
        item: itemNew,
      });
    }
  },
  CreateItem: async (item: IModelItem, dispatch: any) => {
    let res: IResponseMessage = await QuanLyLoaiKhoaHocService.CreateItem(item);
    return res;
  },
  UpdateItem: async (item: IModelItem, dispatch: any) => {
    let res: IResponseMessage = await QuanLyLoaiKhoaHocService.UpdateItem(item);
    return res;
  },
};
