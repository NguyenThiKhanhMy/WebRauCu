import { IResponseMessage } from "common/Models";
import Comment from "services/CommentService";

export const Actions: any = {
  GetItemHocVien: async (Id:any,dispatch: any) => {
    let res: IResponseMessage = await Comment.getCommentTinTucAdmin(Id);
    dispatch({
      type: "GetItemHocVien",
      item: res.Data.Items,
    });
  },
  change: async (data:any,dispatch: any) => {
    data.TrangThaiBanGhi = !data.TrangThaiBanGhi
    let res: IResponseMessage = await Comment.ChangeDataTinTuc(data)
    return res
   
  }
};
