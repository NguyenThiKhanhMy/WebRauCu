import QuanLyNhomTinTuc from "services/QuanLyNhomTinTuc";
import { IResponseMessage } from "common/Models";
import { Guid } from "common/Enums";
import { IModelItem } from "./InitState";

export const Actions: any = {
  GetItem: async (id: String, treeId: String, dispatch: any) => {
    if (id) {
      let res: IResponseMessage = await QuanLyNhomTinTuc.GetItem(id);
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
        Ten: "",
        TrangThaiBanGhi: true,
        IdNhomTinTucCha: treeId,
      };
      dispatch({
        type: "GetItem",
        item: itemNew,
      });
    }
  },
  CreateItem: async (item: IModelItem, dispatch: any) => {
    let res: IResponseMessage = await QuanLyNhomTinTuc.CreateItem(item);
    return res;
  },
  UpdateItem: async (item: IModelItem, dispatch: any) => {
    let res: IResponseMessage = await QuanLyNhomTinTuc.UpdateItem(item);
    return res;
  },
  CheckDuplicateAttributes: async (
    id: any,
    ma: any,
    idNhomTinTucCha: any,
    dispatch: any
  ) => {
    let res: IResponseMessage = await QuanLyNhomTinTuc.CheckDuplicateAttributes(
      id,
      ma,
      idNhomTinTucCha
    );
    return res;
  },
  CheckDuplicateAttributesCreateNew: async (
    ma: any,
    idNhomTinTucCha: any,
    dispatch: any
  ) => {
    let res: IResponseMessage =
      await QuanLyNhomTinTuc.CheckDuplicateAttributesCreateNew(
        ma,
        idNhomTinTucCha
      );
    return res;
  },
};
