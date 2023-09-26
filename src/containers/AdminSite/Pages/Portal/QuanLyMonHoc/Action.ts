import { IResponseMessage } from "common/Models";
import MonHocService from "services/MonHocService";

export const Actions: any = {
  ChangeParent: async (id:any, idMonHocCha: any, dispatch: any) => {
    let res: IResponseMessage = await MonHocService.ChangeParent(id, idMonHocCha);
    return res;
  },
  GetItems: async (idMonHocCha: any, dispatch: any) => {
    let res: IResponseMessage = await MonHocService.GetByParentId(idMonHocCha);
    if (res && res.Success) {
      dispatch({
        type: "GetItems",
        items: res.Data,
      });
    }
  },
  GetTree: async (dispatch: any) => {
    let res: IResponseMessage = await MonHocService.GetTree();
    if (res && res.Success) {
      dispatch({
        type: "GetTree",
        tree: res.Data,
      });
    }
  },
  DeleteById: async (id: String, dispatch: any) => {
    let res: IResponseMessage = await MonHocService.DeleteById([{ id: id }]);
    return res;
  },
};
