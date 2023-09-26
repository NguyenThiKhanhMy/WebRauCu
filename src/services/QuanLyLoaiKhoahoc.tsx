import request from "common/Request";
const Por_LoaiKhoaHoc = "Por_LoaiKhoaHoc";
const QuanLyLoaiKhoaHocService = {
  GetItems: async () => {
    let res: any = await request({
      url: `/${Por_LoaiKhoaHoc}/List?page=1&pageSize=1000&totalLimitItems=0&searchBy=`,
      method: "get",
    });
    return res;
  },
  GetHoatDong: async () => {
    let res: any = await request({
      url: `/${Por_LoaiKhoaHoc}/HoatDong/Portal`,
      method: "get",
    });
    return res;
  },

  GetCategories: async () => {
    let res: any = await request({
      url: `/${Por_LoaiKhoaHoc}/Categories`,
      method: "get",
    });
    return res;
  },
  GetList: async () => {
    let res: any = await request({
      url: `/${Por_LoaiKhoaHoc}/List?page=1&pageSize=10&totalLimitItems=500&searchBy=TrangThaiBanGhi%3Dtrue`,
      method: "get",
    });
    return res;
  },
  GetItem: async (id: String) => {
    let res: any = await request({
      url: `/${Por_LoaiKhoaHoc}/${id}`,
      method: "get",
    });
    return res;
  },
  CreateItem: async (data: any) => {
    let res: any = await request({
      url: `/${Por_LoaiKhoaHoc}`,
      method: "post",
      data,
    });
    return res;
  },
  UpdateItem: async (data: any) => {
    let res: any = await request({
      url: `/${Por_LoaiKhoaHoc}`,
      method: "put",
      data,
    });
    return res;
  },
  DeleteById: async (data: any) => {
    let res: any = await request({
      url: `/${Por_LoaiKhoaHoc}`,
      method: "delete",
      data,
    });
    return res;
  },
};
export default QuanLyLoaiKhoaHocService;
