import request from "common/Request"
const Por_NhomAnh = "Por_NhomAnh";
const QuanLyNhomAnhService = {    
    GetItems: async () => {        
        let res:any = await request({
            url: `/${Por_NhomAnh}/List?page=1&pageSize=1000&totalLimitItems=0&searchBy=`,
            method: 'get'
        });
        return res
    },
    GetCategories: async () => {        
        let res:any = await request({
            url: `/${Por_NhomAnh}/Categories`,
            method: 'get'
        });
        return res
    },
    GetTreeList: async () => {        
        let res:any = await request({
            url: `/${Por_NhomAnh}/List?pageSize=1000`,
            method: 'get'
        });
        return res
    },
    GetItem: async (id:String) => {        
        let res:any = await request({
            url: `/${Por_NhomAnh}/${id}`,
            method: 'get'
        });
        return res
    },
    CreateItem: async (data:any) => {        
        let res:any = await request({
            url: `/${Por_NhomAnh}`,
            method: 'post',
            data
        });
        return res
    },
    UpdateItem: async (data:any) => {        
        let res:any = await request({
            url: `/${Por_NhomAnh}`,
            method: 'put',
            data
        });
        return res
    },
    DeleteById: async (data:any) => {        
        let res:any = await request({
            url: `/${Por_NhomAnh}`,
            method: 'delete',
            data        
        });
        return res
    },
}
export default QuanLyNhomAnhService
