import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Home from "containers/AdminSite/Pages/Home";
import { Config, Log } from "containers/AdminSite/Pages/System";
import {
  Account,
  Organ,
  Permission,
  Role,
} from "containers/AdminSite/Pages/User";
import { Category0, Category1 } from "containers/AdminSite/Pages/Category";
import admin_config from "assets/json/admin_config.json";
import Page404 from "containers/AdminSite/Pages/Page404";
import Profile from "containers/AdminSite/Pages/Profile";
import Setting from "containers/AdminSite/Pages/Setting";
import Support from "containers/AdminSite/Pages/Support";
import { Storage } from "common/Storage";
import { IUserInfo } from "common/Models";
import Login from "containers/AdminSite/Pages/Login";
import RestorePassword from "containers/AdminSite/Pages/RestorePassword";
import Signup from "containers/AdminSite/Pages/Signup";
import LayoutAdmin from "containers/AdminSite/Layouts";
import Page401 from "containers/AdminSite/Pages/Page401";
import QuanLyMenu from "containers/AdminSite/Pages/Portal/QuanLyMenu";
import QuanlyNhomTinTuc from "containers/AdminSite/Pages/Portal/QuanLyNhomTinTuc";
import QuanLyMonHoc from "containers/AdminSite/Pages/Portal/QuanLyMonHoc";
import QuanLyNhomSuKien from "containers/AdminSite/Pages/Portal/QuanLyNhomSuKien";
import QuanLyTinTuc from "containers/AdminSite/Pages/Portal/QuanLyTinTuc";
import QuanLyKhoaHoc from "containers/AdminSite/Pages/Portal/QuanLyKhoaHoc";
import QuanLySuKien from "containers/AdminSite/Pages/Portal/QuanLySuKien";
import QuanLyNhomAnh from "containers/AdminSite/Pages/Portal/QuanLyNhomAnh";
import QuanLyAnh from "containers/AdminSite/Pages/Portal/QuanLyAnh";
import QuanLyTuVan from "containers/AdminSite/Pages/Portal/QuanLyTuVan";
import QuanLyHocVien from "containers/AdminSite/Pages/Portal/QuanLyHocVien";
import QuanLyLoaiKhoaHoc from "containers/AdminSite/Pages/Portal/QuanLyLoaiKhoaHoc";
import QuanLyGiaoDien from "containers/AdminSite/Pages/Portal/QuanLyGiaoDien";
import QuanLyNhomVideo from "containers/AdminSite/Pages/Portal/QuanLyNhomVideo";
import QuanLyVideo from "containers/AdminSite/Pages/Portal/QuanLyVideo";
import QuanLyGioHang from "containers/AdminSite/Pages/Portal/QuanLyGioHang";
import QuanLyThongTinThanhToan from "containers/AdminSite/Pages/Portal/QuanLyThongTinThanhToan";
import QuanLyLopHoc from "containers/AdminSite/Pages/Portal/QuanLyLopHoc";
import QuanLyThietBiTruyCap from "containers/AdminSite/Pages/Portal/QuanLyThietBiTruyCap";
import HoTro from "containers/AdminSite/Pages/Portal/QuanLyHotro";
import QuanLyCongTacVien from "containers/AdminSite/Pages/Portal/QuanLyCongTacVien";
import QuanLyThanhTichHocVien from "containers/AdminSite/Pages/Portal/QuanLyThanhTichHocVien";
interface Props {
  Apps: any;
}

const AdminRoute = (props: Props) => {
  const LayoutAdminPaths: any = [];
  const GetPage = (code: String) => {
    switch (code) {
      case "Home":
        return <Home />;
      case "Config":
        return <Config />;
      case "Log":
        return <Log />;
      case "Account":
        return <Account />;
      case "QuanLyCongTacVien":
        return <QuanLyCongTacVien />;
      case "Organ":
        return <Organ />;
      case "QuanLyHoTro":
        return <HoTro />;
      case "QuanLyMenu":
        return <QuanLyMenu />;
      case "QuanLyNhomTinTuc":
        return <QuanlyNhomTinTuc />;
      case "QuanLyThongTinThanhToan":
        return <QuanLyThongTinThanhToan />;
      case "QuanLyTuVan":
        return <QuanLyTuVan />;
      case "QuanLyHocVien":
        return <QuanLyHocVien />;
      case "QuanLyMonHoc":
        return <QuanLyMonHoc />;
      case "QuanLyNhomVideo":
        return <QuanLyNhomVideo />;
      case "QuanLyVideo":
        return <QuanLyVideo />;
      case "QuanLyKhoaHoc":
        return <QuanLyKhoaHoc />;
      case "QuanLySuKien":
        return <QuanLySuKien />;
      case "QuanLyGioHang":
        return <QuanLyGioHang />;
      case "QuanLyLopHoc":
        return <QuanLyLopHoc />;
      case "QuanLyTinTuc":
        return <QuanLyTinTuc />;
      case "QuanLyAnh":
        return <QuanLyAnh />;
      case "QuanLyNhomAnh":
        return <QuanLyNhomAnh />;
      case "QuanLyLoaiKhoaHoc":
        return <QuanLyLoaiKhoaHoc />;
      case "QuanLyGiaoDien":
        return <QuanLyGiaoDien />;
      case "QuanLyNhomSuKien":
        return <QuanLyNhomSuKien />;
      case "QuanLyThietBiTruyCap":
        return <QuanLyThietBiTruyCap />
      case "QuanLyThanhTichHocVien":
        return <QuanLyThanhTichHocVien />
      case "Permission":
        return <Permission />;
      case "Role":
        return <Role />;
      case "Category0":
        return <Category0 />;
      case "Category1":
        return <Category1 />;
      //
      case "Profile":
        return <Profile />;
      case "Setting":
        return <Setting />;
      case "Support":
        return <Support />;
      case "Page401":
        return <Page401 />;
      case "Page404":
        return <Page404 />;
      case "Login":
        return <Login />;
      case "Signup":
        return <Signup />;
      case "RestorePassword":
        return <RestorePassword />;
      default:
        return <Page404 />;
    }
  };

  const IsRouteOfUser = (route: any) => {
    let userInfo: IUserInfo = JSON.parse(Storage.getSession("UserInfo"));
    if (userInfo && userInfo.UserName == "admin") return true;
    if (userInfo) {
      for (let i = 0; i < userInfo.Menus.length; i++) {
        if (userInfo.Menus[i] == route.code) {
          return true;
        }
      }
    }
    return false;
  };
  const RoutesRender = (isLayout: Boolean) => {
    let routesHtml: any = [];
    let routesConfig: any = admin_config.routes;
    for (let i = 0; i < routesConfig.length; i++) {
      if (!IsRouteOfUser(routesConfig[i]) && routesConfig[i].isMenu) {
        continue;
      }
      if (isLayout && isLayout == routesConfig[i].isLayout) {
        LayoutAdminPaths.push(routesConfig[i].url);
        routesHtml.push(
          <Route
            key={routesConfig[i].code}
            path={routesConfig[i].url}
            component={() => GetPage(routesConfig[i].code)}
          />
        );
      }
      if (!isLayout && isLayout == routesConfig[i].isLayout) {
        routesHtml.push(
          <Route
            key={routesConfig[i].code}
            path={routesConfig[i].url}
            component={() => GetPage(routesConfig[i].code)}
          />
        );
      }
    }
    return routesHtml;
  };
  return (
    <div id="app-admin">
      <Route path={LayoutAdminPaths}>
        <LayoutAdmin>
          <Switch>{RoutesRender(true)}</Switch>
        </LayoutAdmin>
      </Route>
      {RoutesRender(false)}
    </div>
  );
};
const mapState = ({ ...state }) => ({
  Apps: state.apps,
});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(AdminRoute);
