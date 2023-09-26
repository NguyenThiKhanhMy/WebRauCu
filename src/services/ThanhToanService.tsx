import request from "common/Request";
const Por_ThongTinChuyenKhoan = "Por_ThongTinChuyenKhoan";
const QuanLyAnhService = {
  GetItems: async () => {
    let res: any = await request({
      url: `/${Por_ThongTinChuyenKhoan}/List?page=1&pageSize=1000&totalLimitItems=0&searchBy=`,
      method: "get",
    });
    return res;
  },
  GetItemstim: async () => {
    let res: any = await request({
      url: `/${Por_ThongTinChuyenKhoan}/DanhSach`,
      method: "get",
    });
    return res;
  },
  GetDsVideoByIdNhomAnh: async (IdNhomAnh:any) => {
    let res: any = await request({
      url: `/${Por_ThongTinChuyenKhoan}/List?page=1&pageSize=10&totalLimitItems=1000&searchBy=IdNhomAnh%3D%22${IdNhomAnh}%22`,
      method: "get",
    });
    return res;
  },
  GetCategories: async () => {
    let res: any = await request({
      url: `/${Por_ThongTinChuyenKhoan}/Categories`,
      method: "get",
    });
    return res;
  },
  GetItem: async (id: String) => {
    let res: any = await request({
      url: `/${Por_ThongTinChuyenKhoan}/${id}`,
      method: "get",
    });
    return res;
  },
  CreateItem: async (data: any) => {
    let res: any = await request({
      url: `/${Por_ThongTinChuyenKhoan}`,
      method: "post",
      data,
    });
    return res;
  },
  UploadAnhEdtior: async (Files: any) => {
    var formData = new FormData();
    if (Files) {
      for (let i = 0; i < Files.length; i++) {
        formData.append("file_" + i, Files[i]);
      }
      let res: any = await request({
        url: `/${Por_ThongTinChuyenKhoan}/UploadAnhEdtior`,
        method: "post",
        data: formData,
      });
      return res;
    }
  },
  UpdateItem: async (data: any) => {
    let res: any = await request({
      url: `/${Por_ThongTinChuyenKhoan}`,
      method: "put",
      data,
    });
    return res;
  },
  DeleteById: async (data: any) => {
    let res: any = await request({
      url: `/${Por_ThongTinChuyenKhoan}`,
      method: "delete",
      data,
    });
    return res;
  },
  GetItemsPortal: async () => {
    let res: any = await request({
      url: `/${Por_ThongTinChuyenKhoan}/HoatDong`,
      method: "get"
    });
    return res;
  }
};
export default QuanLyAnhService;
