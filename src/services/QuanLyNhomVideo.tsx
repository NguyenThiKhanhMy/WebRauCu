import request from "common/Request";
const Por_NhomVideo = "Por_NhomVideo";
const QuanLyNhomVideoService = {
  GetItems: async () => {
    let res: any = await request({
      url: `/${Por_NhomVideo}/List?page=1&pageSize=1000&totalLimitItems=0&searchBy=`,
      method: "get",
    });
    return res;
  },
  GetCategories: async () => {
    let res: any = await request({
      url: `/${Por_NhomVideo}/Categories`,
      method: "get",
    });
    return res;
  },
  GetTreeList: async () => {
    let res: any = await request({
      url: `/${Por_NhomVideo}/List`,
      method: "get",
    });
    return res;
  },
  GetItem: async (id: String) => {
    let res: any = await request({
      url: `/${Por_NhomVideo}/${id}`,
      method: "get",
    });
    return res;
  },
  CreateItem: async (data: any) => {
    let res: any = await request({
      url: `/${Por_NhomVideo}`,
      method: "post",
      data,
    });
    return res;
  },
  UpdateItem: async (data: any) => {
    let res: any = await request({
      url: `/${Por_NhomVideo}`,
      method: "put",
      data,
    });
    return res;
  },
  DeleteById: async (data: any) => {
    let res: any = await request({
      url: `/${Por_NhomVideo}`,
      method: "delete",
      data,
    });
    return res;
  },
};
export default QuanLyNhomVideoService;
