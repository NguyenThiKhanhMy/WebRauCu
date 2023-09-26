import { IResponseMessage } from "common/Models";
import CauHinhGiaoDienService from "services/CauHinhGiaoDienService";
import data from "assets/json/TrangChu_config.json";

export const Actions: any = {
  GetSuKien: async (dispatch: any) => {
    let suKien = {
      TinhTrang: data.SuKien.TinhTrang,
      SoLuong: data.SuKien.SoLuong,
    };
    let res: IResponseMessage = await CauHinhGiaoDienService.GetCauHinhSuKien(
      suKien
    );
    dispatch({
      type: "GetItemSuKien",
      items: res.Data,
    });
  },
};
