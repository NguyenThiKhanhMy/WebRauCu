import { IResponseMessage } from "common/Models";
import GioHangService from "services/GioHangService";

export const Actions: any = {
    GetItems: async (dispatch: any) => {
        let res: IResponseMessage = await GioHangService.GetItems();
    
        if (res && res.Success) {
          dispatch({
            type: "GetItems",
            items: res.Data.Items,
          });
        }
    },
};
