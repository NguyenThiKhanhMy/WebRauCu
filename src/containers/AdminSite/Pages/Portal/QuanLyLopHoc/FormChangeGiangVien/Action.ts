import { Guid } from "common/Enums";
import { IResponseMessage } from "common/Models";
import QuanLyLopHocService from "services/QuanLyLopHocService";
import GioHangService from "services/GioHangService";
import GiaoVienService from "services/GiaoVienService";
export const Actions: any = {
  ChonVaoLopHoc: async (data:any, dispatch: any) => {
    let res: IResponseMessage = await GiaoVienService.ChonVaoLopHoc(data);
    return res;
  },
  GetGiangVien: async (dispatch: any) => {
    let res: IResponseMessage = await GiaoVienService.GetGiaoVien();
    if (res && res.Success) {
      dispatch({
        type: "GetGiangVien",
        items: res.Data,
      });
    }
  },
  GetGiangVienCuaLopHoc: async (id: String, dispatch: any) => {
    if (id) {
      let res: IResponseMessage = await QuanLyLopHocService.GetItemGV(id);
      if (res && res.Success) {
        dispatch({
          type: "GetGiangVienCuaLopHoc",
          items: res.Data,
        });
      }
    } else {
      dispatch({
        type: "GetGiangVienCuaLopHoc",
        item: [],
      });
    }
  },
};
