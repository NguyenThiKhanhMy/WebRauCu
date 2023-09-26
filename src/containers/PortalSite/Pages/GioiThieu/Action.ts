import { IResponseMessage } from "common/Models";
import CauHinhGiaoDienService from "services/CauHinhGiaoDienService";
import data from "assets/json/GioiThieu_config.json";

export const Actions: any = {
  GetCauHinhBlog: async (dispatch: any) => {
    let res: IResponseMessage = await CauHinhGiaoDienService.GetCauHinhBlog(data.TinTuc.MaNhomTinTuc, data.TinTuc.SoLuong);
    dispatch({
      type: "GetCauHinhBlog",
      items: res.Data,
    });
  }
};
