import { IResponseMessage } from "common/Models";
import KhoaHocService from "services/KhoaHocService";
import QuanLyCTVKhoaHocService from "services/QuanLyCTVKhoaHocService";

export const Actions: any = {
  GetItem: async (dispatch: any) => {
    let res: IResponseMessage = await KhoaHocService.GetItemstim();
    if (res && res.Success) {
      dispatch({
        type: "GetItems",
        items: res.Data,
      });
    }
  },
  DeleteById: async (id: String, dispatch: any) => {
    let res: IResponseMessage = await KhoaHocService.DeleteById([{ id: id }]);
    return res;
  },
  CreateItem: async (
    IdCongTacVien: any,
    IdKhoaHoc: any,
    SoLuong: any,
    TongHocPhiGoc: any,
    TongHocPhiGiamGia: any,
    ChietKhau: any,
    NgayBan: any
  ) => {
    let data = {
      IdCongTacVien: IdCongTacVien,
      IdKhoaHoc: IdKhoaHoc,
      SoLuong: SoLuong,
      TongHocPhiGoc: TongHocPhiGoc * SoLuong,
      TongHocPhiGiamGia: TongHocPhiGiamGia * SoLuong,
      ChietKhau: ChietKhau,
      NgayBan: NgayBan
    };
    let res: IResponseMessage = await QuanLyCTVKhoaHocService.CreateItem(data);
    return res;
  },
};
