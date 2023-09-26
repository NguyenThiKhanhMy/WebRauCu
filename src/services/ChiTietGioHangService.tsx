import request from "common/Request";
const Por_ChiTietGioHang = "Por_ChiTietGioHang";
const ChiTietGioHangService = {
  GetItems: async (idGioHang:any) => {        
    let res:any = await request({
        url: `/${Por_ChiTietGioHang}?IdGioHang=${idGioHang}`,
        method: 'get'
    });
    return res;
  },
  ChangeThoiHanTruyCap: async (item:any) => {
    let res:any = await request({
      url: `/${Por_ChiTietGioHang}/ChangeThoiHanTruyCap`,
      method: 'post',
      data:item
  });
  return res;
  }
};
export default ChiTietGioHangService;
