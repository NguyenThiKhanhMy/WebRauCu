import { IResponseMessage } from "common/Models";
import { Guid } from "common/Enums";
import { IModelItem } from "./InitState";
import ChiTietGioHangService from "services/ChiTietGioHangService";

export const Actions: any = {
  GetItems: async (idGioHang:any, dispatch: any) => {
    let res: IResponseMessage = await ChiTietGioHangService.GetItems(idGioHang);
    if (res && res.Success) {
      dispatch({
        type: "GetItems",
        items: res.Data,
      });
    }
  },
  ChangeThoiHanTruyCap: async (item:any, dispatch: any) => {
    let res: IResponseMessage = await ChiTietGioHangService.ChangeThoiHanTruyCap(item);
    return res;
  }
};
