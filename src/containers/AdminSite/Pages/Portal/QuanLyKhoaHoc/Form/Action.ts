import { IResponseMessage } from "common/Models";
import { Guid } from "common/Enums";
import { IModelItem } from "./InitState";
import KhoaHocService from "services/KhoaHocService";
import MonHocService from "services/MonHocService";
import QuanLyLoaiKhoahocService from "services/QuanLyLoaiKhoahoc";
import QuanLyNhomVideo from "services/QuanLyNhomVideo";
import QuanLyVideo from "services/QuanLyVideo";
import QuanLyNhomAnhService from "services/QuanLyNhomAnhService";
import QuanLyAnhService from "services/QuanLyAnhService";
import HocVienService from "services/HocVienService";
import Comment from "services/CommentService";

export const Actions: any = {
  GetItem: async (id: String, dispatch: any) => {
    if (id) {
      let res: IResponseMessage = await KhoaHocService.GetItem(id);
      if (res && res.Success) {
        dispatch({
          type: "GetItem",
          item: res.Data,
        });
      }
    } else {
      let itemNew: IModelItem = {
        Id: Guid.Empty,
        IdMonHoc: Guid.Empty,
        IdLoaiKhoaHoc: Guid.Empty,
        URL_AnhDaiDien: "",
        URL_AnhChiTiet: "",
        URL_VideoDaiDien: "",
        TieuDe: "",
        TrangThai: true,
        TyLeDanhGia: 0,
        HocPhiGoc: 0,
        HocPhiGiamGia: 0,
        ThoiHan: 0,
        ThoiHanTruyCapMienPhi: 0,
        GioiThieu: "",
        NoiDung: "",
        TrangThaiBanGhi: true,
        CreatedDateTime: new Date(),
      };
      dispatch({
        type: "GetItem",
        item: itemNew,
      });
    }
  },
  
  GetDsNhomVideo: async () => {
    let res: IResponseMessage = await QuanLyNhomVideo.GetCategories();
    if (res.Success) {
      return res.Data;
    }
    return null;
  },
  GetDsNhomAnh: async () => {
    let res: IResponseMessage = await QuanLyNhomAnhService.GetCategories();
    if (res.Success) {
      return res.Data;
    }
    return null;
  },
  setURL_Video: (URL_Video: any, dispatch: any) => {
    dispatch({
      type: "setURL_Video",
      item: URL_Video,
    });
  },
  setURL_Anh: (URL_Anh: any, dispatch: any) => {
    dispatch({
      type: "setURL_Anh",
      item: URL_Anh,
    });
  },
  setURL_AnhChiTiet: (URL_Anh: any, dispatch: any) => {
    dispatch({
      type: "setURL_AnhChiTiet",
      item: URL_Anh,
    });
  },
  GetDsVideoByIdNhomVideo: async (IdNhomVideo: any, dispatch: any) => {
    if (IdNhomVideo) {
      let res: IResponseMessage = await QuanLyVideo.GetDsVideoByIdNhomVideo(
        IdNhomVideo
      );
      if (res && res.Success) {
        dispatch({
          type: "GetItemsVideo",
          item: res.Data.Items,
        });
      }
    } else {
      dispatch({
        type: "GetItemsVideo",
        item: [],
      });
    }
  },
  GetDsVideoByIdNhomAnh: async (IdNhomAnh: any, dispatch: any) => {
    if (IdNhomAnh) {
      let res: IResponseMessage = await QuanLyAnhService.GetDsVideoByIdNhomAnh(
        IdNhomAnh
      );

      if (res && res.Success) {
        dispatch({
          type: "GetItemsAnh",
          item: res.Data.Items,
        });
      }
    } else {
      dispatch({
        type: "GetItemsAnh",
        item: [],
      });
    }
  },
  SaveState: async (data: String, dispatch: any) => {
    dispatch({
      type: "SaveState",
      item: data,
    });
  },
  CreateItem: async (item: IModelItem, dispatch: any) => {
    let res: IResponseMessage = await KhoaHocService.CreateItem(item);
    return res;
  },
  UpdateItem: async (item: IModelItem, dispatch: any) => {
    let res: IResponseMessage = await KhoaHocService.UpdateItem(item);
    return res;
  },
  GetTreeList: async (key: any, dispatch: any) => {
    let res: IResponseMessage = await MonHocService.GetTreeList();
    if (res && res.Success) {
      dispatch({
        type: "GetTreeList",
        key: key,
        items: res.Data,
      });
    }
    return res;
  },
  GetCategories: async (key: any, dispatch: any) => {
    let res: IResponseMessage = await QuanLyLoaiKhoahocService.GetList();
    if (res && res.Success) {
      dispatch({
        type: "GetCategories",
        key: key,
        items: res.Data.Items,
      });
    }
    return res;
  },
};
