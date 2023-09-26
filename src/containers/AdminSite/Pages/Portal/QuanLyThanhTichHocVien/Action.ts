import { IResponseMessage } from "common/Models";
import ThanhTichHocVienService from "services/ThanhTichHocVienService";

export const Actions: any = {
  GetItems: async (dispatch: any) => {
    let res: IResponseMessage = await ThanhTichHocVienService.GetItems();
    if (res && res.Success) {
      dispatch({
        type: "GetItems",
        items: res.Data.Items,
      });
    }
  },
  DeleteById: async (id: String, dispatch: any) => {
    let res: IResponseMessage = await ThanhTichHocVienService.DeleteById([
      { id: id },
    ]);
    return res;
  },
};
