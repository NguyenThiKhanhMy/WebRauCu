import { IResponseMessage } from "common/Models";
import CauHinhGiaoDienService from "services/CauHinhGiaoDienService";
import data from "assets/json/TrangChu_config.json";

export const Actions: any = {
  GetItemBlog: async (dispatch: any) => {
    let res: IResponseMessage = await CauHinhGiaoDienService.GetCauHinhBlog(
      data.TinTuc.MaNhomTinTuc,
      data.TinTuc.SoLuong
    );

    if (res && res.Success) {
      dispatch({
        type: "GetItemBlogPortal",
        items: res.Data,
      });
    }
  },
};
