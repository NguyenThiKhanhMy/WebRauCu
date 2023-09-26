import { IResponseMessage } from "common/Models";
import { Guid } from "common/Enums";
import { IModelItem } from "./InitState";
import ThanhToanService from "services/ThanhToanService";
import QuanLyAnhService from "services/QuanLyAnhService";
import QuanLyNhomAnhService from "services/QuanLyNhomAnhService";

export const Actions: any = {
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
  setURL_Anh: (URL_Anh: any, dispatch: any) => {
    dispatch({
      type: "setURL_Anh",
      item: URL_Anh,
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
  GetItem: async (id: String, dispatch: any) => {
    if (id) {
      let res: IResponseMessage = await ThanhToanService.GetItem(id);
      if (res && res.Success) {
        dispatch({
          type: "GetItem",
          item: res.Data,
        });
      }
    } else {
      let itemNew: IModelItem = {
        Id: Guid.Empty,
        TenNganhang: "",
        ChuThe: "",
        SoTaiKhoan: "",
        NoiDungChuyenKhoan: "",
        URL_AnhQRCode: "",
        TrangThaiBanGhi: false
      };
      dispatch({
        type: "GetItem",
        item: itemNew,
      });
    }
  },
  CreateItem: async (item: IModelItem, dispatch: any) => {
    let res: IResponseMessage = await ThanhToanService.CreateItem(item);
    return res;
  },
  UpdateItem: async (item: IModelItem, dispatch: any) => {
    let res: IResponseMessage = await ThanhToanService.UpdateItem(item);
    return res;
  },
};
