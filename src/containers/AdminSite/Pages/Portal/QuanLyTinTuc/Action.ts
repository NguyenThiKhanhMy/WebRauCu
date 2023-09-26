import { IResponseMessage } from "common/Models";
import TinTucService from "services/TinTucService";

export const Actions: any = {
  GetItems: async (dispatch: any) => {
    let res: IResponseMessage = await TinTucService.GetItemstim();
    if (res && res.Success) {
      dispatch({
        type: "GetItems",
        items: res.Data,
      });
    }
  },
  DeleteById: async (id: String, dispatch: any) => {
    let res: IResponseMessage = await TinTucService.DeleteById([{ id: id }]);
    return res;
  },
};
