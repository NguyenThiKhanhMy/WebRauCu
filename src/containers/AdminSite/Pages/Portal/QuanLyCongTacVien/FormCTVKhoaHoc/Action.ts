import { IResponseMessage } from "common/Models";
import QuanLyCTVKhoaHocService from "services/QuanLyCTVKhoaHocService";

export const Actions: any = {
  GetItem: async (id: String, dispatch: any) => {
    if (id) {
      let res: IResponseMessage =
        await QuanLyCTVKhoaHocService.GetLichSuKhoaHoc(id);
      if (res && res.Success) {
        dispatch({
          type: "GetItem",
          item: res.Data,
        });
      }
    }
  },
  DeleteById: async (id: String, dispatch: any) => {
    let res: IResponseMessage = await QuanLyCTVKhoaHocService.DeleteById([
      { id: id },
    ]);
    return res;
  },
  GetTimKiem: async (data: any, id: any, dispatch: any) => {
    if (id) {
      let datas = {
        idCongTacVien: id,
        fromDate: data.fromDate,
        toDate: data.toDate,
      };
      let res: IResponseMessage = await QuanLyCTVKhoaHocService.GetTimKiem(
        datas
      );
      if (res && res.Success) {
        dispatch({
          type: "GetTimKiem",
          item: res.Data,
        });
      }
      return res
    }
  },
  GetReload: async (dispatch: any) => {
    dispatch({
      type: "GetReload",
    });
  },
};
