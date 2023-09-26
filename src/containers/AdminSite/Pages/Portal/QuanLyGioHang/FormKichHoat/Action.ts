import { IResponseMessage } from "common/Models";
import { Guid } from "common/Enums";
import GioHangService from "services/GioHangService";
import ChiTietGioHangService from "services/ChiTietGioHangService";
import KhoaHocService from "services/KhoaHocService";
import GiaoVienService from "services/GiaoVienService";

export const Actions: any = {
  ChangeBox: async (e:any, IdKhoaHoc:any, dispatch: any) => {
    dispatch({
      type: "ChangeBox",
      item: { Checked: e, IdKhoaHoc: IdKhoaHoc },
    });
  },
  SaveItem: async (data: any) => {
    let res: IResponseMessage = await KhoaHocService.KichHoat(data);
    return res.Success;
  },
  GetItem: async (idGioHang: any, dispatch: any) => {
    let res: IResponseMessage = await ChiTietGioHangService.GetItems(idGioHang);
    if (res && res.Success) {
      dispatch({
        type: "GetItems",
        items: res.Data,
      });
    }
    return res.Data;
  },
  GetItems: async (idGioHang: any, dispatch: any) => {
    let res: IResponseMessage = await ChiTietGioHangService.GetItems(idGioHang);
    if (res && res.Success) {
      dispatch({
        type: "GetItems",
        items: res.Data,
      });
    }
  },
  GetGiaoViens: async (dispatch: any) => {
    let res: IResponseMessage = await GiaoVienService.GetGiaoVien();
    if (res && res.Success) {
      dispatch({
        type: "GetGiaoViens",
        items: res.Data,
      });
    }
  },
  changeCheckBox: async (e: any, index: any, dispatch: any) => {
    dispatch({
      type: "changeCheckBox",
      e: e,
      index: index,
    });
  },
};

const checkType = (canhan: any) => {
  for (var i in canhan) {
    return false;
  }
  return true;
};
