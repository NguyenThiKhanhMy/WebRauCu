import { IResponseMessage } from "common/Models";
import { Guid } from "common/Enums";
import { IModelItem } from "./InitState";
import TuVanService from "services/TuVanService";

export const Actions: any = {
  GetItem: async (id: String, dispatch: any) => {
    if (id) {
      let res: IResponseMessage = await TuVanService.GetItem(id);
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
        GioiTinh: 0,
        Sdt: "",
        Email: "",
        NoiDung: "",
      };
      dispatch({
        type: "GetItem",
        item: itemNew,
      });
    }
  },
};
