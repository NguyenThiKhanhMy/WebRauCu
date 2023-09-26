import request from "common/Request";

const Por_CauHinhGiaoDien = "Por_CauHinhGiaoDien";
const CauHinhGiaoDienService = {
  GetCauHinhGioiThieu: async (MaNhomTinTuc: any, SoLuong: any) => {
    let res: any = await request({
      url: `/${Por_CauHinhGiaoDien}/TrangChu/KhoiGioiThieu?MaNhomTinTuc=${MaNhomTinTuc}&SoLuong=${SoLuong}`,
      method: "get",
    });
    return res;
  },
  GetCauHinhKhoaHoc: async (data: any) => {
    let res: any = await request({
      url: `/${Por_CauHinhGiaoDien}/TrangChu/KhoiKhoaHoc`,
      method: "post",
      data,
    });
    return res;
  },
  GetCauHinhMonHoc: async (data: any) => {
    let res: any = await request({
      url: `/${Por_CauHinhGiaoDien}/TrangChu/KhoiMonHoc`,
      method: "post",
      data,
    });
    return res;
  },
  GetCauHinhSuKien: async (data: any) => {
    let res: any = await request({
      url: `/${Por_CauHinhGiaoDien}/TrangChu/KhoiSuKien`,
      method: "post",
      data,
    });
    return res;
  },
  GetCauHinhBlog: async (MaNhomTinTuc: any,SoLuong:any) => {
    let res: any = await request({
      url: `/${Por_CauHinhGiaoDien}/TrangChu/KhoiTinTuc?MaNhomTinTuc=${MaNhomTinTuc}&SoLuong=${SoLuong}`,
      method: "get",
    });
    return res;
  },
  GetThanhTich: async () => {
    let res: any = await request({
      url: `/${Por_CauHinhGiaoDien}/TrangChu/KhoiHocVienTop`,
      method: "get",
    });
    return res;
  },
  GetThanhTichDetail: async (hocvien:any) => {
    let res: any = await request({
      url: `/${Por_CauHinhGiaoDien}/TrangChu/KhoiThanhTichHocVien/${hocvien}`,
      method: "get",
    });
    return res;
  },
  GetFooter: async (ma:any, sl:any) => {        
    let res:any = await request({
        url: `/${Por_CauHinhGiaoDien}/Footer/KhoiTinTuc?MaNhomTinTuc=${ma}&SoLuong=${sl}`,
        method: 'get'
    });
    return res
},
};
export default CauHinhGiaoDienService;
