import request from "common/Request";
const Por_Anh = "Por_Anh";
const QuanLyAnhService = {
  GetItems: async () => {
    let res: any = await request({
      url: `/${Por_Anh}/List?page=1&pageSize=1000&totalLimitItems=0&searchBy=`,
      method: "get",
    });
    return res;
  },
  GetItemstim: async () => {
    let res: any = await request({
      url: `/${Por_Anh}/DanhSach`,
      method: "get",
    });
    return res;
  },
  GetDsVideoByIdNhomAnh: async (IdNhomAnh:any) => {
    let res: any = await request({
      url: `/${Por_Anh}/List?page=1&pageSize=1000&totalLimitItems=1000&searchBy=IdNhomAnh%3D%22${IdNhomAnh}%22`,
      method: "get",
    });
    return res;
  },
  GetCategories: async () => {
    let res: any = await request({
      url: `/${Por_Anh}/Categories`,
      method: "get",
    });
    return res;
  },
  GetItem: async (id: String) => {
    let res: any = await request({
      url: `/${Por_Anh}/${id}`,
      method: "get",
    });
    return res;
  },
  CreateItem: async (data: any) => {
    let res: any = await request({
      url: `/${Por_Anh}`,
      method: "post",
      data,
    });
    return res;
  },

  CreateItemAndFile: async (data: any) => {
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
      url: `/${Por_Anh}/UploadAnh`,
      method: "post",
      data: formData,
    });
    return res;
  },
  UploadAnhEdtior: async (Files: any) => {
    var formData = new FormData();
    if (Files) {
      for (let i = 0; i < Files.length; i++) {
        formData.append("file_" + i, Files[i]);
      }
      let res: any = await request({
        url: `/${Por_Anh}/UploadAnhEdtior`,
        method: "post",
        data: formData,
      });
      return res;
    }
  },
  UpdateItem: async (data: any) => {
    let res: any = await request({
      url: `/${Por_Anh}`,
      method: "put",
      data,
    });
    return res;
  },
  DeleteById: async (data: any) => {
    let res: any = await request({
      url: `/${Por_Anh}`,
      method: "delete",
      data,
    });
    return res;
  },
};
export default QuanLyAnhService;
