import { Guid } from "common/Enums";
import { IResponseMessage } from "common/Models";
import Comment from "services/CommentService";

export const Actions: any = {
  
  getComment: async (id:any, dispatch: any) => {
    let res: IResponseMessage = await Comment.GetComment(id);
    dispatch({
      type: "GetItem",
      items: res.Data,
    });
  },

  saveComment: async (id: any,username:any, binhluan:any) => {
    let data = {taiKhoan:username, noiDung: binhluan, idNhanXetHocVien: Guid.Empty}
    let res: IResponseMessage = await Comment.SaveComment(data,id);
    return res
  },
 
  saveCommentChild: async (id: any, idkhoahoc:any,username:any, binhluan:any) => {
    let data = {taiKhoan:username, noiDung: binhluan, idNhanXetHocVien: id}
    let res: IResponseMessage = await Comment.SaveComment(data,idkhoahoc);
    return res
  },

};
