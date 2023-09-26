import QuanLy_LopHoc_HocVien from "services/QuanLy_LopHoc_HocVien";
import { Guid } from "common/Enums";
import { IResponseMessage } from "common/Models";
import QuanLyLopHocService from "services/QuanLyLopHocService";
import { IModelItem } from "../InitState";

export const Actions: any = {
  XoaHocVien: async (idLopHoc: any, idHocVien: any, dispatch: any) => {
    let res: IResponseMessage = await QuanLyLopHocService.XoaHocVien(idLopHoc, idHocVien);
    return res;
  },
  GetItem: async (id: String, dispatch: any) => {
    if (id) {
      let res: IResponseMessage = await QuanLyLopHocService.GetItem(id);
      if (res && res.Success) {
        dispatch({
          type: "GetItemHocViens",
          item: res.Data,
        });
      }
    } else {
      dispatch({
        type: "GetItemHocViens",
        item: [],
      });
    }
  },
  Search: async (data: String, dispatch: any) => {
    if (data == "all") {
      dispatch({
        type: "getAll",
      });
    }
    if (data == "lammoi") {
      dispatch({
        type: "getReset",
      });
    }
    if (data = "quantrong") {
      dispatch({
        type: "getQuanTrong",
      });
    }
    if (data = "kiemtra") {
      dispatch({
        type: "getKiemTra",
      });
    }
  },
  GetItemLichSu: async (username: String, dispatch: any) => {
    if (username) {
      let res: IResponseMessage = await QuanLy_LopHoc_HocVien.GetLichSuHocVien(
        username
      );
      if (res && res.Success) {
        dispatch({
          type: "GetItemLichSu",
          item: res.Data,
        });
      }
    } else {
      dispatch({
        type: "GetItemLichSu",
        item: [],
      });
    }
  },
  CreateItem: async (data: any, idLichSuHoc: any, nguoiNhanXet: any) => {
    let newData = {
      idLichSuHoc: idLichSuHoc,
      nguoiNhanXet: nguoiNhanXet,
      noiDungNhanXet: data.noiDungNhanXet,
      chamDiem: data.chamDiem,
    };
    let res: IResponseMessage = await QuanLy_LopHoc_HocVien.NhanXet(newData);
    return res;
  },
};
