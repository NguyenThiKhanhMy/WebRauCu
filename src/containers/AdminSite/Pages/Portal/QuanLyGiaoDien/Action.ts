import { IResponseMessage } from "common/Models";
import QuanLyGiaoDienService from "services/QuanLyGiaoDien";

export const Actions: any = {
  GetItems: async (dispatch: any) => {
    let res: IResponseMessage = await QuanLyGiaoDienService.GetItems();
    if (res && res.Success) {
      dispatch({
        type: "GetItems",
        items: res.Data.Items,
      });
    }
  },
  DeleteById: async (id: String, dispatch: any) => {
    let res: IResponseMessage = await QuanLyGiaoDienService.DeleteById([
      { id: id },
    ]);
    return res;
  },
};
