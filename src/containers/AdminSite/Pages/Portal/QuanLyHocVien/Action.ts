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
  },
};
