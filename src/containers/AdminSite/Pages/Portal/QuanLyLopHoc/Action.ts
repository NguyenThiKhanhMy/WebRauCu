import { IResponseMessage } from "common/Models";
import QuanLyLopHocService from "services/QuanLyLopHocService";

export const Actions: any = {
  GetItems: async (dispatch: any) => {
    let res: IResponseMessage = await QuanLyLopHocService.GetItems();
    if (res && res.Success) {
      dispatch({
        type: "GetItems",
        items: res.Data,
      });
    }
  },
};
