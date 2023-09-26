import { IResponseMessage } from "common/Models";
import GioHangService from "services/GioHangService";
import KhoaHocService from "services/KhoaHocService";

export const Actions: any = {
  GetDetailKhoaHoc: async (id: any, dispatch: any) => {
    let res: IResponseMessage = await KhoaHocService.getById(id);
    dispatch({
      type: "getDetail",
      items: res.Data,
    });
  },
  CreateGioHang: async (data: any, dispatch: any) => {
    let res: IResponseMessage = null;
    return res;
  },

  GetKhoaHocLienQuan: async (id: any, dispatch: any) => {
    let res: IResponseMessage = await KhoaHocService.GetKhoaHocLienQuan(id);
    dispatch({
      type: "GetKhoaHocLienQuan",
      items: res.Data,
    });
  },
};
