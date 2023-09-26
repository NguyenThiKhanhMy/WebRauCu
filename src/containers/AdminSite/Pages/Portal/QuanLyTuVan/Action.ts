import { IResponseMessage } from "common/Models";
import TuVanService from "services/TuVanService";

export const Actions: any = {
  GetItems: async (dispatch: any) => {
    let res: IResponseMessage = await TuVanService.GetItems();
    if (res && res.Success) {
      dispatch({
        type: "GetItems",
        items: res.Data.Items,
      });
    }
  },
};
