import { IResponseMessage } from "common/Models";
import { Guid } from "common/Enums";
import { IModelItem } from "./InitState";
import SuKienService from "services/SuKienService";
import QuanLyNhomSuKien from "services/QuanLyNhomSuKien";
import QuanLyNhomAnhService from "services/QuanLyNhomAnhService";
import QuanLyAnhService from "services/QuanLyAnhService";
import Comment from "services/CommentService";


export const Actions: any = {
  GetItem: async (id: String, dispatch: any) => {
    if (id) {
      let res: IResponseMessage = await SuKienService.GetItem(id);
      if (res && res.Success) {
        dispatch({
          type: "GetItem",
          item: res.Data,
        });
      }
    } else {
      let itemNew: IModelItem = {
        Id: Guid.Empty,
        Ten: "",
        NoiDung: "",
        DiaChi: "",
        URL_AnhDaiDien: "",
        ThoiGian: new Date(),
        GiaTien: 0,
        IdNhomSuKien: "",
        TrangThaiBanGhi: true,
        TrangThai: 1,
      };
      dispatch({
        type: "GetItem",
        item: itemNew,
      });
    }
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
  CreateItem: async (item: IModelItem, dispatch: any) => {
    let res: IResponseMessage = await SuKienService.CreateItem(item);

    return res;
  },
  UpdateItem: async (item: IModelItem, dispatch: any) => {
    let res: IResponseMessage = await SuKienService.UpdateItem(item);
    return res;
  },
  GetNhomSuKienList: async (key: any, dispatch: any) => {
    let res: IResponseMessage = await QuanLyNhomSuKien.GetHoatDong();
    if (res && res.Success) {
      dispatch({
        type: "GetNhomSuKienList",
        key: key,
        items: res.Data,
      });
    }
    return res;
  },
};
