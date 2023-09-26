import request from "common/Request";
const Por_DangKyTuVan = "Por_DangKyTuVan";
const TuVanService = {
  GetItems: async () => {
    let res: any = await request({
      url: `/${Por_DangKyTuVan}/List?page=1&pageSize=1000&totalLimitItems=0&searchBy=`,
      method: "get",
    });
    return res;
  },
  GetItem: async (id: String) => {
    let res: any = await request({
      url: `/${Por_DangKyTuVan}/${id}`,
      method: "get",
    });
    return res;
  },
  CreateItem: async (data: any) => {
    let res: any = await request({
      url: `/${Por_DangKyTuVan}`,
      method: "post",
      data,
    });
    return res;
  },
};
export default TuVanService;
