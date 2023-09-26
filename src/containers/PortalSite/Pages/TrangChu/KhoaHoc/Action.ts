import { IResponseMessage } from "common/Models";
import CauHinhGiaoDienService from "services/CauHinhGiaoDienService";
import data from "assets/json/TrangChu_config.json";

export const Actions: any = {
  GetItemKhoaHoc: async (dispatch: any) => {
    let res: IResponseMessage = await CauHinhGiaoDienService.GetCauHinhKhoaHoc(
      data.KhoaHoc
    );

    dispatch({
      type: "GetItemsKhoaHoc",
      items: res.Data,
    });
  }
};
