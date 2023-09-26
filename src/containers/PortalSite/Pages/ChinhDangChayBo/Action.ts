import { IResponseMessage } from "common/Models";
import QuanLyNhomSuKien from "services/QuanLyNhomSuKien";
import SuKienService from "services/SuKienService";

export const Actions: any = {
  GetLoaiKhoaHocHoatDongPortal: async (dispatch: any) => {
    let res: IResponseMessage = await QuanLyNhomSuKien.GetHoatDong();
    dispatch({
      type: "GetHoatDong",
      items: res.Data,
    });
  },
  GetSuKienChangePortal: async (start: any, end: any, dispatch: any) => {
    dispatch({
      type: "getSuKienPortalChange",
      start: start,
      end: end,
    });
  },
  getSuKienPortal: async (idNhomSuKien:any, dispatch: any) => {
    let res: IResponseMessage = await SuKienService.getSuKienPortal(idNhomSuKien);
    dispatch({
      type: "getSuKienPortal",
      items: res.Data,
    });
  },
  getSapDienRa: async (dispatch: any) => {
    let res: IResponseMessage = await SuKienService.getSapDienRa();
    dispatch({
      type: "getSapDienRa",
      items: res.Data,
    });
  },
};
