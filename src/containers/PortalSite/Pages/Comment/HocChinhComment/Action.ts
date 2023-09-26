import { Guid } from "common/Enums";
import { IResponseMessage } from "common/Models";
import Comment from "services/CommentService";

export const Actions: any = {
  getCommentHocChinh: async (id: any, dispatch: any) => {
    let res: IResponseMessage = await Comment.getCommentHocChinh(id);
    dispatch({
      type: "GetItem",
      items: res.Data,
    });
  },
  saveCommentHocChinh: async (id: any, username: any, binhluan: any) => {
    let data = {
      taiKhoan: username,
      binhluan: binhluan,
      idLopHocHocVienBinhLuan: Guid.Empty,
    };
    let res: IResponseMessage = await Comment.saveCommentHocChinh(data, id);
    return res;
  },
  saveCommentChildHocChinh: async (
    id: any,
    idkhoahoc: any,
    username: any,
    binhluan: any
  ) => {
    let data = {
      taiKhoan: username,
      binhluan: binhluan,
      idLopHocHocVienBinhLuan: id,
    };
    let res: IResponseMessage = await Comment.saveCommentHocChinh(
      data,
      idkhoahoc
    );
    return res;
  },
};
