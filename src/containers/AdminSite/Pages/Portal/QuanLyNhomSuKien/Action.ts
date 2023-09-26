import { IResponseMessage } from "common/Models";
import QuanLyNhomSuKien from "services/QuanLyNhomSuKien";

export const Actions: any = { 
    GetItems: async (dispatch:any)  =>  {
        let res:IResponseMessage = await QuanLyNhomSuKien.GetItems();               
        if(res && res.Success)
        {           
            dispatch({
                type: "GetItems",
                items: res.Data.Items
            })
        }                       
    },
    DeleteById: async (id:String, dispatch:any) => {             
        var data = [{ Id: id}];   
        let res:IResponseMessage = await QuanLyNhomSuKien.DeleteById(data);               
        return res;
    }
}