import { IResponseMessage } from "common/Models";
import ThanhToanService from "services/ThanhToanService";

export const Actions: any = {
  GetItems: async (dispatch: any) => {
    let res: IResponseMessage = await ThanhToanService.GetItems();
    if (res && res.Success) {
      dispatch({
        type: "GetItems",
        items: res.Data.Items,
      });
    }
  },
  DeleteById: async (id: String, dispatch: any) => {
    let res: IResponseMessage = await ThanhToanService.DeleteById([{ id: id }]);
    return res;
  },
};
