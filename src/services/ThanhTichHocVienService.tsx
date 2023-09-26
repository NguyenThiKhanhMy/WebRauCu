import request from "common/Request"
const Por_ThanhTichHocVien = "Por_ThanhTichHocVien";
const ThanhTichHocVienService = {    
    GetItems: async () => {        
        let res:any = await request({
            url: `/${Por_ThanhTichHocVien}/List?page=1&pageSize=1000&totalLimitItems=0&searchBy=`,
            method: 'get'
        });
        return res
    },
    GetChiTiet: async () => {        
        let res:any = await request({
            url: `/${Por_ThanhTichHocVien}/ChiTiet`,
            method: 'get'
        });
        return res
    },
    GetCategories: async () => {        
        let res:any = await request({
            url: `/${Por_ThanhTichHocVien}/Categories`,
            method: 'get'
        });
        return res
    },
    GetItem: async (id:String) => {        
        let res:any = await request({
            url: `/${Por_ThanhTichHocVien}/${id}`,
            method: 'get'
        });
        return res
    },
    CreateItem: async (data:any) => {        
        let res:any = await request({
            url: `/${Por_ThanhTichHocVien}`,
            method: 'post',
            data
        });
        return res
    },
    UpdateItem: async (data:any) => {        
        let res:any = await request({
            url: `/${Por_ThanhTichHocVien}`,
            method: 'put',
            data
        });
        return res
    },
    DeleteById: async (id:any) => {        
        let res:any = await request({
            url: `/${Por_ThanhTichHocVien}/DeleteById/${id}`,
            method: 'delete'            
        });
        return res
    },
    CheckDuplicateAttributes: async (id:any, code:any) => {
        let res:any = await request({
          url: `/${Por_ThanhTichHocVien}/CheckDuplicateAttributes?Id=${id}&Code=${code}`,
          method: 'get'
        })
        return res;
    }
}
export default ThanhTichHocVienService
