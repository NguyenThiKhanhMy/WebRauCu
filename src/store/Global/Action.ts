import { Storage } from "common/Storage";
import { IResponseMessage, IUserInfo } from "common/Models";
import UserService from "services/UserService";
import PermissionService from "services/PermissionService";
import { HubConnectionBuilder } from "@microsoft/signalr";
import ConfigService from "services/ConfigService";
import CauHinhGiaoDienService from "services/CauHinhGiaoDienService";
export const Actions: any = {
  GetToInfoShop: () => async (dispatch: any, getState: any) => {
    let res: IResponseMessage = await ConfigService.GetLoai(1);
    dispatch({
      type: "GetToInfoShop",
      item: res.Data.Items,
    });
  },
  GetToSocialMedia: () => async (dispatch: any, getState: any) => {
    let res: IResponseMessage = await ConfigService.GetLoai(0);
    dispatch({
      type: "GetToSocialMedia",
      item: res.Data.Items,
    });
  },
  AddToCard: (CartQuantity: any) => async (dispatch: any, getState: any) => {
    dispatch({
      type: "AddToCard",
      item: CartQuantity,
    });
  },
  SendEmailRestorePassword:
    (address: any, email: any) => async (dispatch: any, getState: any) => {
      let res: IResponseMessage = await UserService.SendEmailRestorePassword(
        address,
        email
      );
      return res;
    },
  UserSocialLogin:
    (inputSocialLogin: any) => async (dispatch: any, getState: any) => {
      let isLogged = false;
      let userRes: IResponseMessage = await UserService.SocialLogin(
        inputSocialLogin
      );
      if (userRes && userRes.Success) {
        if (userRes.Data === false) {
          return false;
        } else {
          let permRes: IResponseMessage =
            await PermissionService.GetMenusByRoles(userRes.Data.Roles);
          let menus = [];
          if (permRes && permRes.Success) {
            menus = permRes.Data.Menus;
          }
          let accessToken = userRes.Data.AccessToken;
          Storage.setSession("Token", accessToken);
          let userInfo: IUserInfo = {
            Roles: userRes.Data.Roles,
            UserId: userRes.Data.UserId,
            UserName: userRes.Data.UserName,
            RoleName: userRes.Data.RoleName,
            Menus: menus,
          };
          Storage.setSession("UserInfo", JSON.stringify(userInfo));
          return true;
        }
      }
      return isLogged;
    },
  UserLogin: (inputLogin: any) => async (dispatch: any, getState: any) => {
    let userRes: IResponseMessage = await UserService.Login(inputLogin);
    if (userRes && userRes.Success) {
      let permRes: IResponseMessage = await PermissionService.GetMenusByRoles(
        userRes.Data.Roles
      );
      let menus = [];
      if (permRes && permRes.Success) {
        menus = permRes.Data.Menus;
      }
      let accessToken = userRes.Data.AccessToken;
      Storage.setSession("Token", accessToken);
      let userInfo: IUserInfo = {
        Roles: userRes.Data.Roles,
        UserId: userRes.Data.UserId,
        UserName: userRes.Data.UserName,
        RoleName: userRes.Data.RoleName,
        Menus: menus,
      };
      Storage.setSession("UserInfo", JSON.stringify(userInfo));
      return true;
    }
    return false;
  },
  UserLogout: () => async (dispatch: any, getState: any) => {
    Storage.removeSession("Token");
    Storage.removeSession("UserInfo");
  },
  GetUserInfo: () => async (dispatch: any, getState: any) => {
    let res: IResponseMessage = await UserService.Info();
    if (res && res.Success) {
      return res.Data;
    }
    return null;
  },
  EditUserInfo: (inputProfile: any) => async (dispatch: any, getState: any) => {
    let res: IResponseMessage = await UserService.EditInfo(inputProfile);
    return res;
  },
  ChangePassword:
    (inputChangePassword: any) => async (dispatch: any, getState: any) => {
      let res: IResponseMessage = await UserService.ChangePassword(
        inputChangePassword
      );
      return res;
    },
  ChangePasswordNew:
    (inputChangePasswordNew: any) => async (dispatch: any, getState: any) => {
      let res: IResponseMessage = await UserService.ChangePasswordNew(
        inputChangePasswordNew
      );
      return res;
    },
  UserSignup: (inputSignup: any) => async (dispatch: any, getState: any) => {
    let res: IResponseMessage = await UserService.Signup(inputSignup);
    return res;
  },
  GetMenusByRoles: (roles: any) => async (dispatch: any, getState: any) => {
    let res: IResponseMessage = await PermissionService.GetMenusByRoles(roles);
    return res;
  },
  GetLoai: (type: number) => async (dispatch: any, getState: any) => {
    let res: IResponseMessage = await ConfigService.GetLoai(type);
    return res;
  },
  GetFooter: (ma: any, sl: any) => async() => {
    let res: IResponseMessage = await CauHinhGiaoDienService.GetFooter(ma, sl);
    return res;
  },
};
