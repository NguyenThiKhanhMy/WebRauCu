import request from "common/Request";
const Por_CauHoi = "Por_CauHoi";
const HoTroService = {
  GetItem: async () => {
    let res: any = await request({
      url: `/${Por_CauHoi}/HoatDong`,
      method: "get",
    });
    return res;
  },
  GetItemList: async () => {
    let res: any = await request({
      url: `/${Por_CauHoi}/List`,
      method: "get",
    });
    return res;
  },
  DeleteById: async (data: any) => {
    let res: any = await request({
      url: `/${Por_CauHoi}`,
      method: "delete",
      data,
    });
    return res;
  },
  CreateItem: async (data: any) => {
    let res: any = await request({
      url: `/${Por_CauHoi}`,
      method: "post",
      data,
    });
    return res;
  },
  UpdateItem: async (data: any) => {
    let res: any = await request({
      url: `/${Por_CauHoi}`,
      method: "put",
      data,
    });
    return res;
  },
  GetItems: async (id: String) => {
    let res: any = await request({
      url: `/${Por_CauHoi}/${id}`,
      method: "get",
    });
    return res;
  },
};
export default HoTroService;
