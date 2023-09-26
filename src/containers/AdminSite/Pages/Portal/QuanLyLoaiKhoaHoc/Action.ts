import { IResponseMessage } from "common/Models";
import QuanLyLoaiKhoaHocService from "services/QuanLyLoaiKhoahoc";

export const Actions: any = {
  GetItems: async (dispatch: any) => {
    let res: IResponseMessage = await QuanLyLoaiKhoaHocService.GetItems();
    if (res && res.Success) {
      dispatch({
        type: "GetItems",
        items: res.Data.Items,
      });
    }
  },
  DeleteById: async (id: String, dispatch: any) => {
    let res: IResponseMessage = await QuanLyLoaiKhoaHocService.DeleteById([
      { id: id },
    ]);
    return res;
  },
};
