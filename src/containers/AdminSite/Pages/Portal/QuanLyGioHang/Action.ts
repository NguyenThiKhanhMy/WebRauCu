import { IResponseMessage } from "common/Models";
import GioHangService from "services/GioHangService";

export const Actions: any = {
  DeleteById: async (id: String, dispatch: any) => {
    let res: IResponseMessage = await GioHangService.DeleteById(id);
    return res;
  },
  GetItems: async (dispatch: any) => {
    let res: IResponseMessage = await GioHangService.GetItems();

    if (res && res.Success) {
      dispatch({
        type: "GetItems",
        items: res.Data.Items,
      });
    }
  },
};
