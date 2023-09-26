import { IResponseMessage } from "common/Models";
import { Guid } from "common/Enums";
import { IModelItem } from "./InitState";
import QuanLyAnhService from "services/QuanLyAnhService";
import QuanLyNhomAnhService from "services/QuanLyNhomAnhService";

export const Actions: any = {
  GetItem: async (id: String, dispatch: any) => {
    if (id) {
      let res: IResponseMessage = await QuanLyAnhService.GetItem(id);
      let Temp = res.Data.URL_Anh.split("\\");
      if (res && res.Success) {
        if (Temp[Temp.length - 1] && res.Data.URL_Anh) {
          res.Data.Files = [
            {
              Id: res.Data.Id,
              Name: Temp[Temp.length - 1],
              Url: res.Data.URL_Anh,
            },
          ];
        } else {
          res.Data.Files = [];
        }
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
        URL_Anh: "",
        IdNhomAnh: ""
      };
      dispatch({
        type: "GetItem",
        item: itemNew,
      });
    }
  },
  CreateItem: async (item: IModelItem, dispatch: any) => {
    let res: IResponseMessage = await QuanLyAnhService.CreateItemAndFile(item);
    return res;
  },
  UpdateItem: async (item: IModelItem, dispatch: any) => {
    let res: IResponseMessage = await QuanLyAnhService.CreateItemAndFile(item);
    return res;
  },
  GetTreeList: async (key: any, dispatch: any) => {
    let res: IResponseMessage = await QuanLyNhomAnhService.GetTreeList();

    if (res && res.Success) {
      dispatch({
        type: "GetTreeList",
        key: key,
        items: res.Data.Items,
      });
    }
    return res;
  },
};
