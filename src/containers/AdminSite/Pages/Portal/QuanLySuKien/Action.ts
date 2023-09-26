import { IResponseMessage } from "common/Models";
import SuKienService from "services/SuKienService";

export const Actions: any = {
  GetItems: async (dispatch: any) => {
    let res: IResponseMessage = await SuKienService.GetItemstim();
    if (res && res.Success) {
      dispatch({
        type: "GetItems",
        items: res.Data,
      });
    }
  },
  DeleteById: async (id: String, dispatch: any) => {
    let res: IResponseMessage = await SuKienService.DeleteById([{ id: id }]);
    return res;
  },
};
