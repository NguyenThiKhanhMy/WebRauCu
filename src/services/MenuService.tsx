import request from "common/Request"
const Por_Menu = "Por_Menu";

const MenuService =  {
    GetByParentId: async (idMenuCha:any) => {
        let res:any = await request({
          url: `/${Por_Menu}/List/${idMenuCha}`,
          method: 'get'
        })
        return res;
    },
    GetItem: async (id:String) => {        
      let res:any = await request({
          url: `/${Por_Menu}/${id}`,
          method: 'get'
      });
      return res
    },   
    GetTree: async () => {
        let res:any = await request({
          url: `/${Por_Menu}/Tree`,
          method: 'get'
        })
        return res;
    },
    GetTreePortal: async () => {
      let res:any = await request({
        url: `/${Por_Menu}/TreePortal`,
        method: 'get'
      })
      return res;
  },
    CreateItem: async (data:any) => {        
    let res:any = await request({
        url: `/${Por_Menu}`,
        method: 'post',
          data
        });
        return res
    },   
    UpdateItem: async (data:any) => {        
      let res:any = await request({
          url: `/${Por_Menu}`,
          method: 'put',
          data
      });
      return res
    },   
    CheckDuplicateAttributes: async (id:any, ma:any, idMenuCha:any) => {
      let res:any = await request({
        url: `/${Por_Menu}/CheckDuplicateAttributes?id=${id}&ma=${ma}&idMenuCha=${idMenuCha}`,
        method: 'get'
      })
      return res;
    },
    CheckDuplicateAttributesCreateNew: async (ma:any, idMenuCha:any) => {
      let res:any = await request({
        url: `/${Por_Menu}/CheckDuplicateAttributes?ma=${ma}&idMenuCha=${idMenuCha}`,
        method: 'get'
      })
      return res;
    },
    // CheckDuplicateAttributesCreateNew
    DeleteById: async (id:any) => {
      let res:any = await request({
        url: `/${Por_Menu}/DeleteById/${id}`,
        method: 'delete'
      })
      return res;
    }
}

export default MenuService;