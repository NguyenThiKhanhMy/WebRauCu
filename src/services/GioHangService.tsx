import request from "common/Request";
const Por_GioHang = "Por_GioHang";
const GioHangService = {
  DeleteById: async (id: any) => {
    let data = [{ id: id }]
    let res: any = await request({
      url: `/${Por_GioHang}`,
      method: 'delete',
      data
    })
    return res;
  },
  GetItems: async () => {
    let res: any = await request({
      url: `/${Por_GioHang}/List?page=1&pageSize=500&totalLimitItems=500&orderBy=CreatedDateTime%20desc`,
      method: 'get'
    });
    return res
  },
  GetItem: async (id: any) => {
    let res: any = await request({
      url: `/${Por_GioHang}/${id}`,
      method: 'get'
    });
    return res
  },
  SaveXacNhanThanhToanThanhCong: async (data: any) => {
    var formData = new FormData();
    if (data.Files) {
      for (let i = 0; i < data.Files.length; i++) {
        if (typeof data.Files[i].Url == "object") {
          var file = data.Files[i].Url;
          formData.append("file_" + i, file);
        }
      }
    }
    var tempData = { ...data };
    delete tempData["Files"];
    formData.append("data", JSON.stringify(tempData));
    let res: any = await request({
      url: `/${Por_GioHang}/XacNhanThanhToan/ThanhCong`,
      method: "post",
      data: formData,
    });
    return res
  },
  GetXacNhanThanhToan: async (data: any) => {
    let res: any = await request({
      url: `/${Por_GioHang}/XacNhanThanhToan`,
      method: "post",
      data
    });
    return res;
  },
};
export default GioHangService;
