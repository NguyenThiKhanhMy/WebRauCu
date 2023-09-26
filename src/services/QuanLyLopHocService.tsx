import request from "common/Request";
const Por_LopHoc = "Por_LopHoc";
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
  GetItemGV: async (IdLopHoc: any) => {
    let res: any = await request({
      url: `/${Por_LopHoc}/DanhSachGiangVien?IdLopHoc=${IdLopHoc}`,
      method: "get",
    });
    return res;
  }
};
export default QuanLyLopHocService;
