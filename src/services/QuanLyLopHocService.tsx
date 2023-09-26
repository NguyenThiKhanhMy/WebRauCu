import request from "common/Request";
const Por_LopHoc = "Por_LopHoc";
const Por_LopHoc_HocVien = "Por_LopHoc_HocVien";
const QuanLyLopHocService = {
  GetItems: async () => {
    let res: any = await request({
      url: `/${Por_LopHoc}/DanhSach`,
      method: "get",
    });
    return res;
  },
  GetItem: async (IdLopHoc: any) => {
    let res: any = await request({
      url: `/${Por_LopHoc}/DanhSachHocVien?IdLopHoc=${IdLopHoc}`,
      method: "get",
    });
    return res;
  },
  XoaHocVien: async (idLopHoc: any, idHocVien: any) => {
    let res: any = await request({
      url: `/${Por_LopHoc_HocVien}/XoaHocVien?IdLopHoc=${idLopHoc}&IdHocVien=${idHocVien}`,
      method: "delete",
    });
    return res;
  },
  GetItemGV: async (IdLopHoc: any) => {
    let res: any = await request({
      url: `/${Por_LopHoc}/DanhSachGiangVien?IdLopHoc=${IdLopHoc}`,
      method: "get",
    });
    return res;
  }
};
export default QuanLyLopHocService;
