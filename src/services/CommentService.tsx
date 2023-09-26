import request from "common/Request";

const Por_NhanXetHocVien = "Por_NhanXetHocVien";
const Por_LopHoc_HocVien_BinhLuan = "Por_LopHoc_HocVien_BinhLuan"
const Por_TinTuc_BinhLuan = "Por_TinTuc_BinhLuan"
const Comment = {
  GetComment: async (id:any) => {
    let res: any = await request({
      url: `/${Por_NhanXetHocVien}/DanhSachNhanXetCuaKhoaHoc/${id}`,
      method: "get",
    });
    return res;
  },
  ChangeDataKhoaHoc:  async (data:any) => {
    let res: any = await request({
      url: `/${Por_NhanXetHocVien}`,
      method: "put",
      data
    });
    return res;
  },
  ChangeDataLopHoc:  async (data:any) => {
    let res: any = await request({
      url: `/${Por_LopHoc_HocVien_BinhLuan}`,
      method: "put",
      data
    });
    return res;
  },
  ChangeDataTinTuc:  async (data:any) => {
    let res: any = await request({
      url: `/${Por_TinTuc_BinhLuan}`,
      method: "put",
      data
    });
    return res;
  },
  GetCommentAdmin: async (id:any) => {
    let res: any = await request({
      url: `/${Por_NhanXetHocVien}/List?pageSize=1000&searchBy=IdKhoaHoc%3D"${id}"`,
      method: "get",
    });
    return res;
  },
  GetCommentLopHocAdmin: async (id:any) => {
    let res: any = await request({
      url: `/${Por_LopHoc_HocVien_BinhLuan}/List?pageSize=1000&searchBy=IdLopHoc%3D"${id}"`,
      method: "get",
    });
    return res;
  },
  getCommentHocChinh: async (id:any) => {
    let res: any = await request({
      url: `/${Por_LopHoc_HocVien_BinhLuan}/DanhSachBinhLuanHocVienCuaLopHoc/${id}`,
      method: "get",
    });
    return res;
  },
  getCommentTinTuc: async (id:any) => {
    let res: any = await request({
      url: `/${Por_TinTuc_BinhLuan}/DanhSachTinTucBinhLuan/${id}`,
      method: "get",
    });
    return res;
  },

  SaveComment: async (data:any,id: any) => {
    let res: any = await request({
      url: `/${Por_NhanXetHocVien}/GuiNhanXetCuaKhoaHoc/${id}`,
      method: "post",
      data
    });
    return res;
  },
  getCommentTinTucAdmin: async (id:any) => {
    let res: any = await request({
      url: `/${Por_TinTuc_BinhLuan}/List?pageSize=1000&searchBy=IdTinTuc%3D"${id}"`,
      method: "get",
    });
    return res;
  },
  SaveCommentTinTuc: async (data:any,id: any) => {
    let res: any = await request({
      url: `/${Por_TinTuc_BinhLuan}/GuiTinTucBinhLuan/${id}`,
      method: "post",
      data
    });
    return res;
  },
  saveCommentHocChinh: async (data:any,id: any) => {
    let res: any = await request({
      url: `/${Por_LopHoc_HocVien_BinhLuan}/GuiBinhLuanHocVienCuaLopHoc/${id}`,
      method: "post",
      data
    });
    return res;
  },
};
export default Comment;
