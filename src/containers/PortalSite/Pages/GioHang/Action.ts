import { IResponseMessage } from "common/Models";
import KhoaHocService from "services/KhoaHocService";

export const Actions: any = {
  GetGioHang: async (data: any,  dispatch: any) => {
    let res: IResponseMessage = await KhoaHocService.GetChonKhoaHoc(data);
    dispatch({
      type: "GetGioHang",
      items: res.Data,
      
    });
  },
  restore: async (id: any, dispatch: any) => {
    dispatch({
      type: "restore",
      items: id,
    });
  },
  ChangeData: async (check: any, index: any, HocPhiGiamGia:any, HocPhiGoc:any, dispatch: any) => {
    dispatch({
      type: "ChangeData",
      check: check,
      index: index,
      HocPhiGiamGia: HocPhiGiamGia,
      HocPhiGoc: HocPhiGoc,
    });
  },
  GetGioHangs: async (arr: any, dispatch: any) => {
    dispatch({
      type: "GetGioHangs",
      items: arr
    });
  },
  ChangeAll: async (check: any, dispatch: any) => {
    dispatch({
      type: "ChangeAll",
      check: check
    });
  },
};
