import { IResponseMessage } from "common/Models";
import DevicesService from "services/DevicesService";

export const Actions: any = {
  GetItems: async (dispatch: any) => {
    let res: IResponseMessage = await DevicesService.GetItemList();
    if (res && res.Success) {
      dispatch({
        type: "GetItems",
        items: res.Data.Items,
      });
    }
  },
  DeleteById: async (id: String, dispatch: any) => {
    let res: IResponseMessage = await DevicesService.DeleteById([{ id: id }]);
    return res;
  },
};
