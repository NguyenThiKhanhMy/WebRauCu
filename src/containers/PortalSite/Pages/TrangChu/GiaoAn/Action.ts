import { IResponseMessage } from "common/Models";
import CauHinhGiaoDienService from "services/CauHinhGiaoDienService";
import data from "assets/json/TrangChu_config.json";

export const Actions: any = {
  GetItemGiaoan: async (dispatch: any) => {
    let res: IResponseMessage = await CauHinhGiaoDienService.GetCauHinhMonHoc(
      data.MonHoc.DsMaMonHoc
    );
    dispatch({
      type: "GetItemGiaoAn",
      items: res.Data,
    });
  },
};
