import { IResponseMessage } from "common/Models";
import KhoaHocService from "services/KhoaHocService";
import Por_GiaoAnLyThuyetService from "services/GiaoAnLyThuyet";
import Por_GiaoAnThucHanhService from "services/GiaoAnThucHanh";
import QuanLy_LopHoc_HocVien from "services/QuanLy_LopHoc_HocVien";
import ConfigService from "services/ConfigService";
export const Actions: any = {
  GetLinkVideoLyThuyet: async (id:any) => {
    let res: IResponseMessage = await Por_GiaoAnLyThuyetService.GetLinkVideoLyThuyetHocChinh(id);
    return res.Data;
  },
  GetLinkVideoThucHanh: async (id:any) => {
    let res: IResponseMessage = await Por_GiaoAnThucHanhService.GetLinkVideoThucHanhHocChinh(id);
    return res.Data;
  },
  GetKhoaHocThuPortal: async (idKhocHoc: any, dispatch: any) => {
    let res: IResponseMessage = await KhoaHocService.GetKhoaHocChinhPortal(idKhocHoc);
    dispatch({
      type: "GetKhoaHocThuPortal",
      items: res.Data,
    });
  },
  GetPopup: async (dispatch: any) => {
    let res: IResponseMessage = await ConfigService.GetPopup();
    dispatch({
      type: "GetPopup",
      items: res.Data.Items,
    });
  },
  // GetPopup
  GetKhoaHocThu: async (idKhocHoc: any) => {
    let res: IResponseMessage = await KhoaHocService.GetKhoaHocChinhPortal(idKhocHoc);
    return res.Data
  },
  GetDetailKhoaHoc: async (id: any, dispatch: any) => {
    let res: IResponseMessage = await KhoaHocService.getById(id);
    dispatch({
      type: "getDetail",
      items: res.Data,
    });
  },
  SaveFiles: async (data:any, objectData:any) => {
    // let res: IResponseMessage = 
    let res = await QuanLy_LopHoc_HocVien.CreateItemAndFileSystem(data,objectData);
    return res;
  },
  GetLichSu: async (IdLopHoc: any, IdGiaoAn:any, LoaiGiaoAnLy: any, dispatch:any) => {
    let res: IResponseMessage = await QuanLy_LopHoc_HocVien.LichSu(IdLopHoc, IdGiaoAn, LoaiGiaoAnLy);
    dispatch({
      type: "GetLichSu",
      items: res.Data,
    });
  }
};
