import request from "common/Request";
const TimKiem = "TimKiem";
const TimKiemService = {
  GetItemTimKiem: async (query:any, limit: any) => {
    let res: any = await request({
      url: `/${TimKiem}/KhoaHocVaTinTuc?tukhoa=${query}&limit=${limit}`,
      method: "get",
    });
    return res;
  }
};
export default TimKiemService;
