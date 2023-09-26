import request from "common/Request";
const Por_CauHinhGiaoDien = "Por_CauHinhGiaoDien";
const QuanLyGiaoDienService = {
  GetItems: async () => {
    let res: any = await request({
      url: `/${Por_CauHinhGiaoDien}/List?page=1&pageSize=1000&totalLimitItems=0&searchBy=`,
      method: "get",
    });
    return res;
  },
  GetCategories: async () => {
    let res: any = await request({
      url: `/${Por_CauHinhGiaoDien}/Categories`,
      method: "get",
    });
    return res;
  },
  GetList: async () => {
    let res: any = await request({
      url: `/${Por_CauHinhGiaoDien}/List`,
      method: "get",
    });
    return res;
  },
  GetItem: async (id: String) => {
    let res: any = await request({
      url: `/${Por_CauHinhGiaoDien}/${id}`,
      method: "get",
    });
    return res;
  },
  CreateItem: async (data: any) => {
    let res: any = await request({
      url: `/${Por_CauHinhGiaoDien}`,
      method: "post",
      data,
    });
    return res;
  },
  UpdateItem: async (data: any) => {
    let res: any = await request({
      url: `/${Por_CauHinhGiaoDien}`,
      method: "put",
      data,
    });
    return res;
  },
  DeleteById: async (data: any) => {
    let res: any = await request({
      url: `/${Por_CauHinhGiaoDien}`,
      method: "delete",
      data,
    });
    return res;
  },
};
export default QuanLyGiaoDienService;
