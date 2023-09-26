import { IResponseMessage } from "common/Models";
import QuanLyAnhService from "services/QuanLyAnhService";

export const Actions: any = {
  GetItems: async (dispatch: any) => {
    let res: IResponseMessage = await QuanLyAnhService.GetItemstim();
    if (res && res.Success) {
      dispatch({
        type: "GetItems",
        items: res.Data,
      });
    }
  },
  DeleteById: async (id: String, dispatch: any) => {
    let res: IResponseMessage = await QuanLyAnhService.DeleteById([{ id: id }]);
    return res;
  },
};
