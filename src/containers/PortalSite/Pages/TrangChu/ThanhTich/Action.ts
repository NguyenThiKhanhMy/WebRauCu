import { IResponseMessage } from "common/Models";
import CauHinhGiaoDienService from "services/CauHinhGiaoDienService";

export const Actions: any = {
  GetThanhTich: async (dispatch: any) => {
    let res: IResponseMessage = await CauHinhGiaoDienService.GetThanhTich();
    dispatch({
      type: "GetThanhTich",
      items: res.Data,
    });
    return res.Data
  },
  GetThanhTichDetail: async(hocvien: any, dispatch:any) => {
    let res: IResponseMessage = await CauHinhGiaoDienService.GetThanhTichDetail(hocvien);
    dispatch({
      type: "GetThanhTichDetail",
      items: res.Data,
    });
  }
};
