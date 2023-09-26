import { IResponseMessage } from "common/Models";
import KhoaHocService from "services/KhoaHocService";
import MonHocService from "services/MonHocService";
import QuanLyLoaiKhoaHocService from "services/QuanLyLoaiKhoahoc";

export const Actions: any = {
  GetKhoaHocPortal: async (start: any, end: any, key: any, dispatch: any) => {
    let ids = key.split("/");
    let id = ids[ids.length - 1];
    let res: IResponseMessage =
      await KhoaHocService.GetKhoaHocTheoIdMonHocPortal(id);

    dispatch({
      type: "GetItemKhoaHoc",
      items: res.Data,
      count: res.Data.length,
      start: start,
      end: end,
    });
  },
  GetKhoaHocSearch: async (search: any, dispatch: any) => {
    dispatch({
      type: "GetItemKhoaHocSearch",
      search: search,
    });
  },

  GetKhoaHocCount: async (key: any) => {
    let ids = key.split("/");
    let id = ids[ids.length - 1];
    let res: IResponseMessage =
      await KhoaHocService.GetKhoaHocTheoIdMonHocPortal(id);

    return Math.ceil(res.Data.length / 10);
  },
  GetKhoaHocChangePortal: async (start: any, end: any, dispatch: any) => {
    dispatch({
      type: "GetItemKhoaHocChange",
      start: start,
      end: end,
    });
  },
  GetMonHocPortal: async (ma: any, limit: any, dispatch: any) => {
    let res: IResponseMessage = await MonHocService.getMonHocPortal(ma, limit);

    dispatch({
      type: "GetItem",
      items: res.Data,
    });
  },
  GetKhoaHocTheoLoaiKhoaHoc: async (Id: any, dispatch: any) => {
    let res: IResponseMessage = await KhoaHocService.getTheoLoaiKhoaHocPortal(
      Id
    );

    dispatch({
      type: "GetItemTheoLoaiKhoaHoc",
      items: res.Data,
    });
  },
  GetTreeMonHocPortal: async (dispatch: any) => {
    let res: IResponseMessage = await MonHocService.GetTreePortal();
    var treeJson = JSON.stringify(res.Data);
    treeJson = treeJson.replace(new RegExp("Id", "g"), "key");
    treeJson = treeJson.replace(new RegExp("Name", "g"), "label");
    treeJson = treeJson.replace(new RegExp("Children", "g"), "nodes");
    dispatch({
      type: "GetItemMonHoc",
      item: JSON.parse(treeJson),
    });
  },
  GetLoaiKhoaHocHoatDongPortal: async (dispatch: any) => {
    let res: IResponseMessage = await QuanLyLoaiKhoaHocService.GetHoatDong();
    dispatch({
      type: "GetHoatDong",
      items: res.Data,
    });
  },
};
