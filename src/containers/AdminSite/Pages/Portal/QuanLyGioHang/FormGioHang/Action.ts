import { IResponseMessage } from "common/Models";
import { Guid } from "common/Enums";
import { IModelItem } from "./InitState";
import GioHangService from "services/GioHangService";

export const Actions: any = {
  GetItem: async (id: String, dispatch: any) => {
    if (id) {
      let res: IResponseMessage = await GioHangService.GetItem(id);
      let Temp:any = [];
      if(res.Data.URL_FileDinhKem)
      {
        res.Data.URL_FileDinhKem.split("\\")
      }
      if (res && res.Success) {
        if (Temp.length > 0 && Temp[Temp.length - 1] && res.Data.URL_FileDinhKem) {
          res.Data.Files = [
            {
              Id: res.Data.Id,
              Name: Temp[Temp.length - 1],
              Url: res.Data.URL_FileDinhKem,
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
    }
  },
  SaveItem: async(item: any, dispatch: any) => {
    let res: IResponseMessage = await GioHangService.SaveXacNhanThanhToanThanhCong(item);
    return res;
  }
};
