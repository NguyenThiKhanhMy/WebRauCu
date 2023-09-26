import { IResponseMessage } from "common/Models";
import QuanLyNhomTinTuc from "services/QuanLyNhomTinTuc";

export const Actions: any = {
  GetItems: async (idNhomTinTucCha: any, dispatch: any) => {
    let res: IResponseMessage = await QuanLyNhomTinTuc.GetByParentId(
      idNhomTinTucCha
    );

    if (res && res.Success) {
      dispatch({
        type: "GetItems",
        items: res.Data,
      });
    }
  },
  GetTree: async (dispatch: any) => {
    let res: IResponseMessage = await QuanLyNhomTinTuc.GetTree();

    if (res && res.Success) {
      dispatch({
        type: "GetTree",
        tree: res.Data,
      });
    }
  },
  DeleteById: async (id: String, dispatch: any) => {
    let res: IResponseMessage = await QuanLyNhomTinTuc.DeleteById([{ id: id }]);
    return res;
  },
};
