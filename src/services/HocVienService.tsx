import request from "common/Request";
const Por_HocVien = "Por_HocVien";
const HocVienService = {
  GetLichSuGiaoDich: async () => {
    let res: any = await request({
      url: `/${Por_HocVien}/LichSuGiaoDich`,
      method: "get",
    });
    return res;
  },
  GetDanhSach: async () => {
    let res: any = await request({
      url: `/${Por_HocVien}/DsKhoaHoc`,
      method: "get",
    });
    return res;
  },
};
export default HocVienService;
