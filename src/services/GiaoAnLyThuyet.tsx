import request from "common/Request";
const Por_GiaoAnLyThuyet = "Por_GiaoAnLyThuyet";
const Por_GiaoAnLyThuyetService = {
  GetLinkVideoLyThuyet: async (IdGiaoAn: any) => {
    let res: any = await request({
      url: `/${Por_GiaoAnLyThuyet}/LinkVideo/GiaoAnHocThu/${IdGiaoAn}`,
      method: "get",
    });
    return res;
  },
  GetMove: async (data: any) => {
    let res: any = await request({
      url: `/${Por_GiaoAnLyThuyet}/MoveGiaoAn?IdKhoaHocSrc=${data.IdKhoaHocSrc}&IdGiaoAnSrc=${data.IdGiaoAnSrc}&IdKhoaHocDes=${data.IdKhoaHocDes}`,
      method: "get",
    });
    return res;
  },
  GetImportFile: async (data: any, IdKhoaHoc: any) => {
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
      url: `/${Por_GiaoAnLyThuyet}/Import?IdKhoaHoc=${IdKhoaHoc}`,
      method: "post",
      data: formData,
    });
    return res;
  },
  GetLinkVideoLyThuyetHocChinh: async (IdGiaoAn: any) => {
    let res: any = await request({
      url: `/${Por_GiaoAnLyThuyet}/LinkVideo/GiaoAnHocChinh/${IdGiaoAn}`,
      method: "get",
    });
    return res;
  },
  GetItems: async () => {
    let res: any = await request({
      url: `/${Por_GiaoAnLyThuyet}/List?page=1&pageSize=1000&totalLimitItems=0&searchBy=`,
      method: "get",
    });
    return res;
  },
  GetCategories: async () => {
    let res: any = await request({
      url: `/${Por_GiaoAnLyThuyet}/Categories`,
      method: "get",
    });
    return res;
  },
  GetList: async () => {
    let res: any = await request({
      url: `/${Por_GiaoAnLyThuyet}/List`,
      method: "get",
    });
    return res;
  },
  GetTree: async (idKhoaHoc: String) => {
    let res: any = await request({
      url: `/${Por_GiaoAnLyThuyet}/Tree/${idKhoaHoc}`,
      method: "get",
    });
    return res;
  },
  GetTreePortal: async (idKhoaHoc: String) => {
    let res: any = await request({
      url: `/${Por_GiaoAnLyThuyet}/TreePortal/${idKhoaHoc}`,
      method: "get",
    });
    return res;
  },
  GetItem: async (id: String) => {
    let res: any = await request({
      url: `/${Por_GiaoAnLyThuyet}/${id}`,
      method: "get",
    });
    return res;
  },
  CreateItem: async (data: any) => {
    let res: any = await request({
      url: `/${Por_GiaoAnLyThuyet}`,
      method: "post",
      data,
    });
    return res;
  },
  CreateItemWithKhoaHoc: async (data: any, idKhoaHoc: any) => {
    let res: any = await request({
      url: `/${Por_GiaoAnLyThuyet}/${idKhoaHoc}`,
      method: "post",
      data,
    });
    return res;
  },
  UpdateItem: async (data: any) => {
    let res: any = await request({
      url: `/${Por_GiaoAnLyThuyet}`,
      method: "put",
      data,
    });
    return res;
  },
  CopyItem: async (idKhoaHoc: any, idGiaoAn: any) => {
    var data = {};
    let res: any = await request({
      url: `/${Por_GiaoAnLyThuyet}/${idKhoaHoc}/${idGiaoAn}`,
      method: "post",
      data,
    });
    return res;
  },
  DeleteById: async (id: any) => {
    let res: any = await request({
      url: `/${Por_GiaoAnLyThuyet}/DeleteById/${id}`,
      method: "delete",
    });
    return res;
  },
  DeleteTree: async (id: any) => {
    let res: any = await request({
      url: `/${Por_GiaoAnLyThuyet}/Delete?id=${id}`,
      method: "delete",
    });
    return res;
  },
};
export default Por_GiaoAnLyThuyetService;
