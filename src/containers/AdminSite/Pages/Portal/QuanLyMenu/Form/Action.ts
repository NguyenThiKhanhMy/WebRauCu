import MenuService from "services/MenuService";
import { IResponseMessage } from "common/Models";
import { Guid } from "common/Enums";
import { IModelItem } from "./InitState";

export const Actions: any = {
  GetItem: async (id: String, treeId: String, dispatch: any) => {
    if (id) {
      let res: IResponseMessage = await MenuService.GetItem(id);
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
        URL: "",
        Ten: "",
        ThuTu: "",
        TrangThaiBanGhi: true,
        IdMenuCha: treeId,
      };
      dispatch({
        type: "GetItem",
        item: itemNew,
      });
    }
  },
  CreateItem: async (item: IModelItem, dispatch: any) => {
    let res: IResponseMessage = await MenuService.CreateItem(item);
    return res;
  },
  UpdateItem: async (item: IModelItem, dispatch: any) => {
    let res: IResponseMessage = await MenuService.UpdateItem(item);
    return res;
  },
  CheckDuplicateAttributes: async (
    id: any,
    ma: any,
    idMenuCha: any,
    dispatch: any
  ) => {
    let res: IResponseMessage = await MenuService.CheckDuplicateAttributes(
      id,
      ma,
      idMenuCha
    );
    return res;
  },
  CheckDuplicateAttributesCreateNew: async (
    ma: any,
    idMenuCha: any,
    dispatch: any
  ) => {
    let res: IResponseMessage =
      await MenuService.CheckDuplicateAttributesCreateNew(ma, idMenuCha);
    return res;
  },
};
