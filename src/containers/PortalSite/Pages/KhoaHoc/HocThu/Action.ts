import { IResponseMessage } from "common/Models";
import GioHangService from "services/GioHangService";
import KhoaHocService from "services/KhoaHocService";
import GiaoAnLyThuyet from "services/GiaoAnLyThuyet";
import GiaoAnThucHanh from "services/GiaoAnThucHanh";
import Por_GiaoAnLyThuyetService from "services/GiaoAnLyThuyet";
import Por_GiaoAnThucHanhService from "services/GiaoAnThucHanh";
export const Actions: any = {
  // GetGiaoAnLyThuyetTheoIdKhoaHoc: async (idKhocHoc: any, dispatch: any) => {
  //   let res: IResponseMessage = await GiaoAnLyThuyet.GetTreePortal(idKhocHoc);
  //   dispatch({
  //     type: "getGiaoAnLyThuyet",
  //     items: res.Data,
  //   });
  // },
  // GetGiaoAnThucHanhTheoIdKhoaHoc: async (idKhocHoc: any, dispatch: any) => {
  //   let res: IResponseMessage = await GiaoAnThucHanh.GetTreePortal(idKhocHoc);
  //   dispatch({
  //     type: "getGiaoAnThucHanh",
  //     items: res.Data,
  //   });
  // },
  GetLinkVideoLyThuyet: async (id:any) => {
    let res: IResponseMessage = await Por_GiaoAnLyThuyetService.GetLinkVideoLyThuyet(id);
    return res.Data;
  },
  GetLinkVideoThucHanh: async (id:any) => {
    let res: IResponseMessage = await Por_GiaoAnThucHanhService.GetLinkVideoThucHanh(id);
    return res.Data;
  },
  GetKhoaHocThuPortal: async (idKhocHoc: any, dispatch: any) => {
    let res: IResponseMessage = await KhoaHocService.GetKhoaHocThuPortal(idKhocHoc);
    dispatch({
      type: "GetKhoaHocThuPortal",
      items: res.Data,
    });
  },
  GetKhoaHocThu: async (idKhocHoc: any) => {
    let res: IResponseMessage = await KhoaHocService.GetKhoaHocThuPortal(idKhocHoc);
    return res.Data
  },
  GetDetailKhoaHoc: async (id: any, dispatch: any) => {
    let res: IResponseMessage = await KhoaHocService.getById(id);
    dispatch({
      type: "getDetail",
      items: res.Data,
    });
  }
};
