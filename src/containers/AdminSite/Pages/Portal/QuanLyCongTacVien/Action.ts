import { IResponseMessage } from "common/Models";
import QuanLyCTVService from "services/QuanLyCTVService";

export const Actions: any = {
  GetItems: async (dispatch: any) => {
    let res: IResponseMessage = await QuanLyCTVService.GetItems();
    if (res && res.Success) {
      dispatch({
        type: "GetItems",
        items: res.Data.Items,
      });
    }
  },
  DeleteById: async (id: String, dispatch: any) => {
    let res: IResponseMessage = await QuanLyCTVService.DeleteById([{ id: id }]);
    return res;
  },
};
