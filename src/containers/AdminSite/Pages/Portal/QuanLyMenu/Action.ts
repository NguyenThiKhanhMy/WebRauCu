import { IResponseMessage } from "common/Models";
import MenuService from "services/MenuService";

export const Actions: any = {
  GetItems: async (idMenuCha: any, dispatch: any) => {
    let res: IResponseMessage = await MenuService.GetByParentId(idMenuCha);
    if (res && res.Success) {
      dispatch({
        type: "GetItems",
        items: res.Data,
      });
    }
  },
  GetTree: async (dispatch: any) => {
    let res: IResponseMessage = await MenuService.GetTree();
    if (res && res.Success) {
      dispatch({
        type: "GetTree",
        tree: res.Data,
      });
    }
  },
  DeleteById: async (id: String, dispatch: any) => {
    let res: IResponseMessage = await MenuService.DeleteById(id);
    return res;
  },
};
