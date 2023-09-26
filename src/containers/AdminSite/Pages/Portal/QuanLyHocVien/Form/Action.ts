import { IResponseMessage } from "common/Models";
import { Guid } from "common/Enums";
import { IModelItem } from "./InitState";
import UserService from "services/UserService";

export const Actions: any = {
  GetItem: async (id: String, dispatch: any) => {
    if (id) {
      let res: IResponseMessage = await UserService.GetItem(id);
      if (res && res.Success) {
        dispatch({
          type: "GetItem",
          item: res.Data,
        });
      }
    } else {
      let itemNew: IModelItem = {
        Id: Guid.Empty,
        FullName: "",
        Email: "",
        Phone: "",
        Address: "",
        IsActive: false,
        Note: "",
      };
      dispatch({
        type: "GetItem",
        item: itemNew,
      });
    }
  },
  Active: async (id: String, dispatch: any) => {
    let res: IResponseMessage = await UserService.Active(id);
    return res;
  },
  UnActive: async (id: String, dispatch: any) => {
    let res: IResponseMessage = await UserService.UnActive(id);
    return res;
  },
  UpdateItem: async (data: any) => {
    let datas = {
      fullName: data.FullName,
      userName: data.Email,
      email: data.Email,
      phone: data.Phone,
      address: data.Address,
      note: data.Note,
    };
    let res: IResponseMessage = await UserService.EditInfo(datas);
    return res;
  },
  CreateItem: async (data: any) => {
    let datas = {
      fullName: data.FullName,
      userName: data.Email,
      email: data.Email,
      phone: data.Phone,
      address: data.Address,
      password: data.PassWord,
      type: 2
    };
    let res: IResponseMessage = await UserService.Signup(datas);
    return {Success: true};
  },
};
