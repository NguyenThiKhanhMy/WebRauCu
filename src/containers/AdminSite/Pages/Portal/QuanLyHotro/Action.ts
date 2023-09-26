import { IResponseMessage } from "common/Models";
import HoTroService from "services/HoTroService";

export const Actions: any = {
  GetItems: async (dispatch: any) => {
    let res: IResponseMessage = await HoTroService.GetItemList();
    if (res && res.Success) {
      dispatch({
        type: "GetItems",
        items: res.Data.Items,
      });
    }
  },
  DeleteById: async (id: String, dispatch: any) => {
    let res: IResponseMessage = await HoTroService.DeleteById([{ id: id }]);
    return res;
  },
};
