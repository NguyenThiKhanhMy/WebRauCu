import { IResponseMessage } from "common/Models";
import Por_GiaoAnLyThuyetService from "services/GiaoAnLyThuyet";
import HoTroService from "services/HoTroService";

export const Actions: any = {
  GetItem: async (dispatch: any) => {
    let res: IResponseMessage = await HoTroService.GetItem();
    dispatch({
      type: "GetItem",
      items: res.Data,
    });
  },

  GetItemChange: async (start:any, end:any,dispatch: any) => {
    let res: IResponseMessage = await HoTroService.GetItem();
    dispatch({
      type: "GetItemChange",
      items: res.Data,
      start: start,
      end: end
    });
  },
 
};
