import request from "common/Request";
const Por_KhoaHoc = "Por_KhoaHoc";
const KhoaHocService = {
  GetKhoaHocThuPortal: async (id: String) => {
    let res: any = await request({
      url: `/${Por_KhoaHoc}/HocThuPortal?idKhoaHoc=${id}`,
      method: "get",
    });
    return res;
  },
  GetKhoaHocChinhPortal: async (id: String) => {
    let res: any = await request({
      url: `/${Por_KhoaHoc}/HocChinhPortal?idKhoaHoc=${id}`,
      method: "get",
    });
    return res;
  },
  GetTreeList: async () => {        
    let res:any = await request({
        url: `/${Por_KhoaHoc}/List?pageSize=1000`,
        method: 'get'
    });
    return res
},
  KichHoat: async (data: any) => {        
    let res:any = await request({
        url: `/${Por_KhoaHoc}/KichHoat`,
        method: 'post',
        data
    });
    return res
  },
  GetKhoaHocLienQuan: async (id: String) => {
    let res: any = await request({
      url: `/${Por_KhoaHoc}/KhoaHocLienQuan?IdKhoaHoc=${id}&limit=2`,
      method: "get",
    });
    return res;
  },
  GetChonKhoaHoc: async (data: any) => {
    let res: any = await request({
      url: `/${Por_KhoaHoc}/ChonVaoGioHang`,
      method: "post",
      data
    });
    return res;
  },
  GetKhoaHocTheoMaMonHocPortal: async (id: String) => {
    let res: any = await request({
      url: `/${Por_KhoaHoc}/TheoMaMonHoc?maMonHoc=${id}`,
      method: "get",
    });
    return res;
  },
  GetKhoaHocTheoIdMonHocPortal: async (id: String) => {
    let res: any = await request({
      url: `/${Por_KhoaHoc}/TheoMonHoc?idMonHoc=${id}`,
      method: "get",
    });
    return res;
  },
  getTheoLoaiKhoaHocPortal: async (id: String) => {
    let res: any = await request({
      url: `/${Por_KhoaHoc}/TheoLoaiKhoaHoc?idLoaiKhoaHoc=${id}`,
      method: "get",
    });
    return res;
  },
  GetItems: async () => {
    let res: any = await request({
      url: `/${Por_KhoaHoc}/List?page=1&pageSize=1000&totalLimitItems=0&searchBy=`,
      method: "get",
    });
    return res;
  },
  GetItemstim: async () => {
    let res: any = await request({
      url: `/${Por_KhoaHoc}/DanhSach`,
      method: "get",
    });
    return res;
  },
  GetCategories: async () => {
    let res: any = await request({
      url: `/${Por_KhoaHoc}/Categories`,
      method: "get",
    });
    return res;
  },
  GetItem: async (id: String) => {
    let res: any = await request({
      url: `/${Por_KhoaHoc}/${id}`,
      method: "get",
    });
    return res;
  },
  CreateItem: async (data: any) => {
    let res: any = await request({
      url: `/${Por_KhoaHoc}`,
      method: "post",
      data,
    });
    return res;
  },
  UpdateItem: async (data: any) => {
    let res: any = await request({
      url: `/${Por_KhoaHoc}`,
      method: "put",
      data,
    });
    return res;
  },
  DeleteById: async (data: any) => {
    let res: any = await request({
      url: `/${Por_KhoaHoc}`,
      method: "delete",
      data,
    });
    return res;
  },
  getById: async (ma: any) => {
    let res: any = await request({
      url: `/${Por_KhoaHoc}/ChiTiet/${ma}`,
      method: "get",
    });
    return res;
  },
};
export default KhoaHocService;
