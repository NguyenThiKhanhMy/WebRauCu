import request from "common/Request";
const Sys_Account = "Sys_Account";
const Sys_User = "Sys_User";
const UserService = {
  GetItems: async (loginName: any, isActive: any) => {
    let res: any = await request({
      url: `/${Sys_User}?page=1&pageSize=1000&totalLimitItems=1000&isActive=${isActive}&loginName=${loginName}`,
      method: "get",
    });
    return res;
  },
  Login: async (data: any) => {
    let res: any = await request({
      url: `/${Sys_Account}/Login`,
      method: "post",
      data,
    });
    return res;
  },
  SocialLogin: async (data: any) => {
    let res: any = await request({
      url: `/${Sys_Account}/SocialLogin`,
      method: "post",
      data,
    });
    return res;
  },
  EditPortal: async (data: any) => {
    let res: any = await request({
      url: `/Sys_User`,
      method: "post",
      data,
    });
    return res;
  },
  SendEmailRestorePassword: async (address: any, email: any) => {
    let data = { Address: address, Email: email };
    let res: any = await request({
      url: `/${Sys_Account}/SendEmailRestorePassword`,
      method: "post",
      data,
    });
    return res;
  },
  Signup: async (data: any) => {
    let res: any = await request({
      url: `/${Sys_Account}/Signup`,
      method: "post",
      data,
    });
    return res;
  },
  Info: async () => {
    let res: any = await request({
      url: `/${Sys_Account}/Info`,
      method: "get",
    });
    return res;
  },
  EditInfo: async (data: any) => {
    let res: any = await request({
      url: `/${Sys_Account}/EditInfo`,
      method: "post",
      data,
    });
    return res;
  },
  ChangePassword: async (data: any) => {
    let res: any = await request({
      url: `/${Sys_Account}/ChangePassword`,
      method: "post",
      data,
    });
    return res;
  },
  ChangePasswordNew: async (data: any) => {
    let res: any = await request({
      url: `/${Sys_Account}/ChangePasswordNew`,
      method: "post",
      data,
    });
    return res;
  },
  GetByOrganId: async (organId: any) => {
    let res: any = await request({
      url: `/${Sys_User}/List/${organId}`,
      method: "get",
    });
    return res;
  },
  GetByList: async () => {
    let res: any = await request({
      url: `/${Sys_User}/List/?page=1&pageSize=10&totalLimitItems=500&searchBy=type%3D2`,
      method: "get",
    });
    return res;
  },
  DeleteById: async (id: any) => {
    let res: any = await request({
      url: `/${Sys_User}/DeleteById/${id}`,
      method: "delete",
    });
    return res;
  },
  CreateItem: async (data: any, organId: any, roleId: any) => {
    let res: any = request({
      url: `/${Sys_User}/${organId}/${roleId}`,
      method: "post",
      data: data,
    });
    return res;
  },
  UpdateItem: async (data: any, organId: any, roleId: any) => {
    let res: any = request({
      url: `/${Sys_User}/${organId}/${roleId}`,
      method: "put",
      data: data,
    });
    return res;
  },
  GetItem: async (id: any) => {
    let res: any = request({
      url: "/Sys_User/" + id,
      method: "get",
    });
    return res;
  },
  GetItemPortal: async (id: any) => {
    let res: any = request({
      url: "/Sys_User/" + id + "/Portal",
      method: "get",
    });
    return res;
  },
  CheckDuplicateAttributes: async (id: any, userName: any, email: any) => {
    let res: any = await request({
      url: `/${Sys_User}/CheckDuplicateAttributes?Id=${id}&UserName=${userName}&Email=${email}`,
      method: "get",
    });
    return res;
  },
  UnActive: async (id: any) => {
    let res: any = await request({
      url: `/${Sys_User}/UnActive?UserId=${id}`,
      method: "get",
    });
    return res;
  },
  Active: async (id: any) => {
    let res: any = await request({
      url: `/${Sys_User}/Active?UserId=${id}`,
      method: "get",
    });
    return res;
  },
};
export default UserService;
