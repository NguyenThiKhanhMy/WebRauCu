import { IResponseMessage } from "common/Models";
import HocVienService from "services/HocVienService";
import UserService from "services/UserService";

export const Actions: any = {
  GetLichSuKhoaHoc: async (dispatch: any) => {
    let res: IResponseMessage = await HocVienService.GetLichSuGiaoDich();
    dispatch({
      type: "getLichSuGiaoDich",
      items: res.Data,
    });
  },
  GetDachSachKhoaHoc: async (dispatch: any) => {
    let res: IResponseMessage = await HocVienService.GetDanhSach();
    dispatch({
      type: "getDanhSach",
      items: res.Data,
    });
  },
  GetIteamuser: async (id:any,dispatch: any) => {
    let res: IResponseMessage = await UserService.GetItemPortal(id);
    return res.Data
  },
  saveUser: async (data:any) => {
    let res: IResponseMessage = await UserService.EditInfo(data);
    return res.Data
  },
};
