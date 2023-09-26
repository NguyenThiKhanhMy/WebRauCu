import request from "common/Request";
const Sys_Device = "Sys_Device";
const DevicesService = {
  GetItemList: async () => {
    let res: any = await request({
      url: `/${Sys_Device}/List?page=1&pageSize=1000&totalLimitItems=0&searchBy=&&orderBy=CreatedDateTime%20desc`,
      method: "get",
    });
    return res;
  },
  DeleteById: async (data: any) => {
    let res: any = await request({
      url: `/${Sys_Device}`,
      method: "delete",
      data,
    });
    return res;
  },
};
export default DevicesService;
