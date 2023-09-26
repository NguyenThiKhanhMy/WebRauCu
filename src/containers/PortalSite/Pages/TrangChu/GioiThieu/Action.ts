import { IResponseMessage } from "common/Models";
import CauHinhGiaoDienService from "services/CauHinhGiaoDienService";
import data from "assets/json/TrangChu_config.json";

export const Actions: any = {
  GetItemGioiThieu: async (arr: any, dispatch: any) => {
    let res: IResponseMessage =
      await CauHinhGiaoDienService.GetCauHinhGioiThieu(
        data.GioiThieu.MaNhomTinTuc,
        data.GioiThieu.SoLuong
      );
    let tieuDe = "";
    if (data.GioiThieu.TieuDe) {
      tieuDe = data.GioiThieu.TieuDe;
    }
    if (res && res.Success) {
      dispatch({
        type: "GetItemGioiThieu",
        items: res.Data,
        array: arr,
        tieuDe: tieuDe,
      });
    }
  }
};
