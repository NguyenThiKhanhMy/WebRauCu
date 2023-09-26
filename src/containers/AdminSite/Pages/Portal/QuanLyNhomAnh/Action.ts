import { IResponseMessage } from "common/Models";
import QuanLyNhomAnhService from "services/QuanLyNhomAnhService";

export const Actions: any = {
  GetItems: async (dispatch: any) => {
    let res: IResponseMessage = await QuanLyNhomAnhService.GetItems();
    if (res && res.Success) {
      dispatch({
        type: "GetItems",
        items: res.Data.Items,
      });
    }
  },
  DeleteById: async (id: String, dispatch: any) => {
    let res: IResponseMessage = await QuanLyNhomAnhService.DeleteById([
      { id: id },
    ]);
    return res;
  },
};
