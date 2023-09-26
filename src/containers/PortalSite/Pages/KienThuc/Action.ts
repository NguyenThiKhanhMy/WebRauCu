import { IResponseMessage } from "common/Models";
import QuanLyNhomTinTuc from "services/QuanLyNhomTinTuc";
import TinTucService from "services/TinTucService";

export const Actions: any = {
  GetTinTucNoiBatPortal: async (dispatch: any) => {
    let res: IResponseMessage = await TinTucService.GetTinTucNoiBat(5);
    dispatch({
      type: "GetItemTnTucNoiBat",
      items: res.Data,
    });
  },
  GetTinTucPortal: async (start: any, end: any, key: any, dispatch: any) => {
    let ids = key.split("/");
    let id = ids[ids.length - 1];
    let res: IResponseMessage = await TinTucService.GetTinTucTheoIdMonHocPortal(
      id
    );
    dispatch({
      type: "GetItemTnTuc",
      items: res.Data,
      start: start,
      end: end,
    });
  },
  GetTinTucPortalChange: async (start: any, end: any, dispatch: any) => {
    dispatch({
      type: "GetItemTnTucChange",
      start: start,
      end: end,
    });
  },
  GetTreeMonHocPortal: async (dispatch: any) => {
    let res: IResponseMessage = await QuanLyNhomTinTuc.GetTreePortal();
    var treeJson = JSON.stringify(res.Data);
    treeJson = treeJson.replace(new RegExp("Id", "g"), "key");
    treeJson = treeJson.replace(new RegExp("Name", "g"), "label");
    treeJson = treeJson.replace(new RegExp("Children", "g"), "nodes");
    dispatch({
      type: "GetItemChuyenMuc",
      item: JSON.parse(treeJson),
    });
  },
  GetItemByMa: async (ma: any, dispatch: any) => {
    let res: IResponseMessage = await QuanLyNhomTinTuc.KienThucPortal(ma);
    dispatch({
      type: "GetItemByMa",
      items: res.Data,
    });
  },
};
