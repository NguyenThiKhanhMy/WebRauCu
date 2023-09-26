import request from "common/Request";
const Por_LopHoc_HocVien = "Por_LopHoc_HocVien";
const QuanLyLopHoc = {
    CreateItemAndFileSystem: async (data: any,objectData: any) => {
    var formData = new FormData();
    if (data) {
      for (let i = 0; i < data.length; i++) {
        if (typeof data[i] == "object") {
          var file = data[i];
          formData.append("file_" + i, file);
        }
      }
    }
    var tempData = { ...objectData };
    formData.append("data", JSON.stringify(tempData));
  
    let res: any = await request({
      url: `/${Por_LopHoc_HocVien}/NopBai`,
      method: "post",
      data: formData,
    });
    return res;
  },
  LichSu: async (IdLopHoc: any, IdGiaoAn:any, LoaiGiaoAnLy: any) => {
  
    let res: any = await request({
      url: `/${Por_LopHoc_HocVien}/LichSu/${IdLopHoc}/${IdGiaoAn}/${LoaiGiaoAnLy}`,
      method: "get"
    });
    return res;
  },
  NhanXet: async (data: any) => {
    let res: any = await request({
      url: `/${Por_LopHoc_HocVien}/NhanXet`,
      method: "post",
      data
    });
    return res;
  },
  GetLichSuHocVien: async (userName: any) => {
  
    let res: any = await request({
      url: `/${Por_LopHoc_HocVien}/LichSu?userName=${userName}`,
      method: "get"
    });
    return res;
  },
};
export default QuanLyLopHoc;
