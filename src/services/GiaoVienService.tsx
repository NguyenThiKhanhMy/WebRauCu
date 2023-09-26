import request from "common/Request"
const Por_GiaoVien = "Por_GiaoVien";
const GiaoVienService = {    
    ChonVaoLopHoc: async (data:any) => {        
        let res:any = await request({
            url: `/${Por_GiaoVien}/ChonVaoLopHoc`,
            method: 'post',
            data
        });
        return res
    },
  GetGiaoVien: async () => {        
    let res:any = await request({
        url: `${Por_GiaoVien}/DanhSach`,
        method: 'get'
    });
    return res
  },
 
};
export default GiaoVienService;
