import { IResponseMessage } from "common/Models";
import UserService from "services/UserService";

export const Actions: any = {
  GetItems: async (dispatch: any) => {
    let res: IResponseMessage = await UserService.GetByList();
    if (res && res.Success) {
      dispatch({
        type: "GetItems",
        items: res.Data.Items,
      });
    }
    return res.Data.Items;
  },
  Active: async (id: String, dispatch: any) => {
    let res: IResponseMessage = await UserService.Active(id);
    return res;
  },
  UnActive: async (id: String, dispatch: any) => {
    let res: IResponseMessage = await UserService.UnActive(id);
    return res;
  },
};
