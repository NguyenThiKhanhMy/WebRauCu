import { IResponseMessage } from "common/Models";
import { Guid } from "common/Enums";
import { IModelItem } from "./InitState";
import TinTucService from "services/TinTucService";
import QuanLyNhomTinTuc from "services/QuanLyNhomTinTuc";
import QuanLyAnhService from "services/QuanLyAnhService";
import QuanLyNhomAnhService from "services/QuanLyNhomAnhService";
import Comment from "services/CommentService";

export const Actions: any = {
  SetTacGia: async (tacGia: any, dispatch: any) => {
    dispatch({
      type: "setTacGia",
      item: tacGia,
    });
  },
  SaveState: async (data: String, dispatch: any) => {
    dispatch({
      type: "SaveState",
      item: data,
    });
  },

  setURL_Anh: (URL_Anh: any, dispatch: any) => {
    dispatch({
      type: "setURL_Anh",
      item: URL_Anh,
    });
  },
  GetDsNhomAnh: async () => {
    let res: IResponseMessage = await QuanLyNhomAnhService.GetCategories();
    if (res.Success) {
      return res.Data;
    }
    return null;
  },
  GetDsVideoByIdNhomAnh: async (IdNhomAnh: any, dispatch: any) => {
    if (IdNhomAnh) {
      let res: IResponseMessage = await QuanLyAnhService.GetDsVideoByIdNhomAnh(
        IdNhomAnh
      );

      if (res && res.Success) {
        dispatch({
          type: "GetItemsAnh",
          item: res.Data.Items,
        });
      }
    } else {
      dispatch({
        type: "GetItemsAnh",
        item: [],
      });
    }
  },
  GetItem: async (id: String, dispatch: any) => {
    if (id) {
      let res: IResponseMessage = await TinTucService.GetItem(id);
      if (res && res.Success) {
        dispatch({
          type: "GetItem",
          item: res.Data,
        });
      }
    } else {
      let itemNew: IModelItem = {
        Id: Guid.Empty,
        TieuDe: "",
        MoTa: "",
        NoiDung: "",
        TacGia: "",
        URL_AnhDaiDien: "",
        NgayXuatBan: new Date(),
        TinNoiBat: false,
        TinMoi: false,
        LuotXem: 0,
        IdNhomTinTuc: "",
        TrangThaiBanGhi: true,
      };
      dispatch({
        type: "GetItem",
        item: itemNew,
      });
    }
  },
  CreateItem: async (item: IModelItem, dispatch: any) => {
    let res: IResponseMessage = await TinTucService.CreateItem(item);
    return res;
  },
  UpdateItem: async (item: IModelItem, dispatch: any) => {
    let res: IResponseMessage = await TinTucService.UpdateItem(item);
    return res;
  },
  GetTreeList: async (key: any, dispatch: any) => {
    let res: IResponseMessage = await QuanLyNhomTinTuc.GetTreeList();
    if (res && res.Success) {
      dispatch({
        type: "GetTreeList",
        key: key,
        items: res.Data,
      });
    }
    return res;
  },
};
