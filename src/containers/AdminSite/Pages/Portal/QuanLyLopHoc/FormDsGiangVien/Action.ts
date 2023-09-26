import { Guid } from "common/Enums";
import { IResponseMessage } from "common/Models";
import QuanLyLopHocService from "services/QuanLyLopHocService";
import { IModelItem } from "../InitState";

export const Actions: any = {
  GetItem: async (id: String, dispatch: any) => {
    if (id) {
      let res: IResponseMessage = await QuanLyLopHocService.GetItemGV(id);
      if (res && res.Success) {
        dispatch({
          type: "GetItemHocViens",
          item: res.Data,
        });
      }
    } else {
      dispatch({
        type: "GetItemHocViens",
        item: [],
      });
    }
  },
};
