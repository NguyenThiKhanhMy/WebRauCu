import { IResponseMessage } from "common/Models";
import { Guid } from "common/Enums";
import { IModelItem } from "./InitState";
import ThanhTichHocVienService from "services/ThanhTichHocVienService";
import QuanLyAnhService from "services/QuanLyAnhService";
import QuanLyNhomAnhService from "services/QuanLyNhomAnhService";

export const Actions: any = {
  GetItem: async (id: String, dispatch: any) => {
    if (id) {
      let res: IResponseMessage = await ThanhTichHocVienService.GetItem(id);
      if (res && res.Success) {
        dispatch({
          type: "GetItem",
          item: res.Data,
        });
      }
    } else {
      let itemNew: IModelItem = {
        Id: Guid.Empty,
        TenGiaiChay: "",
        URL_AnhGioiThieu1: "",
        URL_AnhGioiThieu2: "",
        TieuDe: "",
        NoiDung: "",
        SoThuTu: 0
      };
      dispatch({
        type: "GetItem",
        item: itemNew,
      });
    }
  },
  CreateItem: async (item: IModelItem, dispatch: any) => {
    let res: IResponseMessage = await ThanhTichHocVienService.CreateItem(item);
    return res;
  },
  UpdateItem: async (item: IModelItem, dispatch: any) => {
    let res: IResponseMessage = await ThanhTichHocVienService.UpdateItem(item);
    return res;
  },
  GetCategories: async (key: any, dispatch: any) => {
    let res: IResponseMessage = await ThanhTichHocVienService.GetCategories();
    if (res && res.Success) {
      dispatch({
        type: "GetCategories",
        key: key,
        items: res.Data,
      });
    }
    return res;
  },
  SetURL_AnhGioiThieu1: (value:any, dispatch: any) => {
    dispatch({
      type: "SetURL_AnhGioiThieu1",
      item: value,
    });
  },
  SetURL_AnhGioiThieu2: (value:any, dispatch: any) => {
    dispatch({
      type: "SetURL_AnhGioiThieu2",
      item: value,
    });
  },
  SaveState: async (data: String, dispatch: any) => {
    dispatch({
      type: "SaveState",
      item: data,
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
};
