import { IResponseMessage } from "common/Models";
import QuanLyNhomVideoService from "services/QuanLyNhomVideo";

export const Actions: any = {
  GetItems: async (dispatch: any) => {
    let res: IResponseMessage = await QuanLyNhomVideoService.GetItems();
    if (res && res.Success) {
      dispatch({
        type: "GetItems",
        items: res.Data.Items,
      });
    }
  },
  DeleteById: async (id: String, dispatch: any) => {
    let res: IResponseMessage = await QuanLyNhomVideoService.DeleteById([
      { id: id },
    ]);
    return res;
  },
};
