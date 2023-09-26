import { IResponseMessage } from "common/Models";
import ThanhTichHocVienService from "services/ThanhTichHocVienService";

export const Actions: any = {
  GetChiTiet: async (dispatch: any) => {
    let res: IResponseMessage = await ThanhTichHocVienService.GetChiTiet();
    dispatch({
      type: "GetChiTiet",
      items: res.Data,
    });
  }
};
