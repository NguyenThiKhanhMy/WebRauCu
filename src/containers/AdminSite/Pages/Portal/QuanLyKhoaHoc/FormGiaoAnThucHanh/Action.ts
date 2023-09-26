import { Guid } from "common/Enums";
import { IResponseMessage } from "common/Models";
import GiaoAnThucHanh from "services/GiaoAnThucHanh";
import QuanLyNhomVideo from "services/QuanLyNhomVideo";
import QuanLyVideo from "services/QuanLyVideo";

export const Actions: any = {
  DeleteById: async (id: String, dispatch: any) => {
    let res: IResponseMessage = await GiaoAnThucHanh.DeleteById(id);
    return res;
  },
  GetImportFile: async (data: any, IdKhoaHoc: any) => {
    let res: IResponseMessage = await GiaoAnThucHanh.GetImportFile(
      data,
      IdKhoaHoc
    );
    return res;
  },
  DeleteTree: async (idKhoaHoc:any, dispatch: any) => {
    let res: IResponseMessage = await GiaoAnThucHanh.DeleteTree(idKhoaHoc);
    return res;
},
  GetItem: async (id: String, dispatch: any) => {
    if (id) {
      let res: IResponseMessage = await GiaoAnThucHanh.GetItem(id);
      if (res && res.Success) {
        dispatch({
          type: "GetItem",
          item: res.Data,
        });
      }
    }
  },
  SaveState: async (data: String, dispatch: any) => {
    dispatch({
      type: "SaveState",
      item: data,
    });
  },
  setURL_VideoGiaoAnThucHanh: (URL_Video: any, dispatch: any) => {
    dispatch({
      type: "setURL_VideoGiaoAnThucHanh",
      item: URL_Video,
    });
  },
  GetDsNhomVideo: async () => {
    let res: IResponseMessage = await QuanLyNhomVideo.GetCategories();
    if (res.Success) {
      return res.Data;
    }
    return null;
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
  GetTree: async (idKhoaHoc: any, dispatch: any) => {
    let res: IResponseMessage = await GiaoAnThucHanh.GetTree(idKhoaHoc);
    if (res && res.Success) {
      dispatch({
        type: "GetTree",
        item: res.Data,
      });
    }
    return res;
  },
  CreateItemWithKhoaHoc: async (data: any, idKhoaHoc: any, dispatch: any) => {
    let res: IResponseMessage = await GiaoAnThucHanh.CreateItemWithKhoaHoc(
      data,
      idKhoaHoc
    );
    if (res && res.Success) {
      data.Id = res.Data.IdGiaoAn;
      dispatch({
        type: "GetItem",
        item: data,
      });
    }
    return res;
  },
  UpdateItem: async (data: any, dispatch: any) => {
    let res: IResponseMessage = await GiaoAnThucHanh.UpdateItem(data);
    if (res && res.Success) {
      dispatch({
        type: "GetItem",
        item: data,
      });
    }
    return res;
  },
  onClickRemove: async () => {},
  RefeshItem: (dispatch: any) => {
    dispatch({
      type: "GetItem",
      item: {
        Id: Guid.Empty,
        IdGiaoAnThucHanh: Guid.Empty,
        Loai: 0,
        TieuDe: "",
        GhiChu: "",
        URL_Video: "",
        ThoiLuong: 0,
        MienPhi: false,
        QuanTrong: false,
        SoThuTu: 0,
        DiemNopBai: 0
      },
    });
  },
  CopyItem: async (idKhoaHoc: any, idGiaoAn: any, dispatch: any) => {
    let res: IResponseMessage = await GiaoAnThucHanh.CopyItem(
      idKhoaHoc,
      idGiaoAn
    );
    return res;
  },
};
