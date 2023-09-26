import MonHocService from "services/MonHocService";
import { IResponseMessage } from "common/Models";
import { Guid } from "common/Enums";
import { IModelItem } from "./InitState";
import QuanLyAnhService from "services/QuanLyAnhService";
import QuanLyNhomAnhService from "services/QuanLyNhomAnhService";

export const Actions: any = {
  GetItem: async (id: String, treeId: String, dispatch: any) => {
    if (id) {
      let res: IResponseMessage = await MonHocService.GetItem(id);
      if (res && res.Success) {
        res.Data.IdMenuCha = treeId;
        dispatch({
          type: "GetItem",
          item: res.Data,
        });
      }
    } else {
      let itemNew: IModelItem = {
        Id: Guid.Empty,
        Ma: "",
        MoTa: "",
        GiaGiaoDongTu: 0,
        GiaGiaoDongDen: 0,
        Ten: "",
        TrangThaiBanGhi: true,
        IdMonHocCha: treeId,
        URL_AnhDaiDien: "",
      };
      dispatch({
        type: "GetItem",
        item: itemNew,
      });
    }
  },
  CreateItem: async (item: IModelItem, dispatch: any) => {
    let res: IResponseMessage = await MonHocService.CreateItem(item);
    return res;
  },
  UpdateItem: async (item: IModelItem, dispatch: any) => {
    let res: IResponseMessage = await MonHocService.UpdateItem(item);
    return res;
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
  CheckDuplicateAttributes: async (
    id: any,
    ma: any,
    idMonHocCha: any,
    dispatch: any
  ) => {
    let res: IResponseMessage = await MonHocService.CheckDuplicateAttributes(
      id,
      ma,
      idMonHocCha
    );
    return res;
  },
  CheckDuplicateAttributesCreateNew: async (
    ma: any,
    idMonHocCha: any,
    dispatch: any
  ) => {
    let res: IResponseMessage =
      await MonHocService.CheckDuplicateAttributesCreateNew(ma, idMonHocCha);
    return res;
  },
};
