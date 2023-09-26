import request from "common/Request";
const Por_GiaoAnThucHanh = "Por_GiaoAnThucHanh";
const Por_GiaoAnThucHanhService = {
  GetItems: async () => {
    let res: any = await request({
      url: `/${Por_GiaoAnThucHanh}/List?page=1&pageSize=1000&totalLimitItems=0&searchBy=`,
      method: "get",
    });
    return res;
  },
  GetLinkVideoThucHanh: async (IdGiaoAn: any) => {
    let res: any = await request({
      url: `/${Por_GiaoAnThucHanh}/LinkVideo/GiaoAnHocThu/${IdGiaoAn}`,
      method: "get",
    });
    return res;
  },
  DeleteTree: async (id: any) => {
    let res: any = await request({
      url: `/${Por_GiaoAnThucHanh}/Delete?id=${id}`,
      method: "delete",
    });
    return res;
  },
  GetImportFile: async (data: any, IdKhoaHoc: any) => {
    var formData = new FormData();
    if (data.uploadedFile) {
      for (let i = 0; i < data.uploadedFile.length; i++) {
        if (typeof data.uploadedFile[i].Url == "object") {
          var file = data.uploadedFile[i].Url;
          formData.append("file_" + i, file);
        }
      }
    }
    var tempData = { ...data };
    delete tempData["Files"];
    formData.append("data", JSON.stringify(tempData));
    let res: any = await request({
      url: `/${Por_GiaoAnThucHanh}/ImportGiaoAn?IdKhoaHoc=${IdKhoaHoc}`,
      method: "post",
      data: formData,
    });
    return res;
  },
  GetLinkVideoThucHanhHocChinh: async (IdGiaoAn: any) => {
    let res: any = await request({
      url: `/${Por_GiaoAnThucHanh}/LinkVideo/GiaoAnHocChinh/${IdGiaoAn}`,
      method: "get",
    });
    return res;
  },
  GetCategories: async () => {
    let res: any = await request({
      url: `/${Por_GiaoAnThucHanh}/Categories`,
      method: "get",
    });
    return res;
  },
  GetList: async () => {
    let res: any = await request({
      url: `/${Por_GiaoAnThucHanh}/List`,
      method: "get",
    });
    return res;
  },
  GetTree: async (idKhoaHoc: String) => {
    let res: any = await request({
      url: `/${Por_GiaoAnThucHanh}/Tree/${idKhoaHoc}`,
      method: "get",
    });
    return res;
  },
  GetTreePortal: async (idKhoaHoc: String) => {
    let res: any = await request({
      url: `/${Por_GiaoAnThucHanh}/TreePortal/${idKhoaHoc}`,
      method: "get",
    });
    return res;
  },
  GetItem: async (id: String) => {
    let res: any = await request({
      url: `/${Por_GiaoAnThucHanh}/${id}`,
      method: "get",
    });
    return res;
  },
  CreateItem: async (data: any) => {
    let res: any = await request({
      url: `/${Por_GiaoAnThucHanh}`,
      method: "post",
      data,
    });
    return res;
  },
  CreateItemWithKhoaHoc: async (data: any, idKhoaHoc: any) => {
    let res: any = await request({
      url: `/${Por_GiaoAnThucHanh}/${idKhoaHoc}`,
      method: "post",
      data,
    });
    return res;
  },
  UpdateItem: async (data: any) => {
    let res: any = await request({
      url: `/${Por_GiaoAnThucHanh}`,
      method: "put",
      data,
    });
    return res;
  },
  CopyItem: async (idKhoaHoc: any, idGiaoAn: any) => {
    var data = {};
    let res: any = await request({
      url: `/${Por_GiaoAnThucHanh}/${idKhoaHoc}/${idGiaoAn}`,
      method: "post",
      data,
    });
    return res;
  },
  DeleteById: async (id: any) => {
    let res: any = await request({
      url: `/${Por_GiaoAnThucHanh}/DeleteById/${id}`,
      method: "delete",
    });
    return res;
  },
};
export default Por_GiaoAnThucHanhService;
