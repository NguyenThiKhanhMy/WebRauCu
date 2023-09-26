import { Guid } from "common/Enums";
import { IResponseMessage } from "common/Models";
import { async } from "q";
import GiaoAnLyThuyet from "services/GiaoAnLyThuyet";
import QuanLyNhomVideo from "services/QuanLyNhomVideo";
import QuanLyVideo from "services/QuanLyVideo";
export const Actions: any = {
    DeleteById: async (id:String, dispatch:any) => {                
        let res:IResponseMessage = await GiaoAnLyThuyet.DeleteById(id);               
        return res;
    },
    GetDsNhomVideo: async () => {
        let res:IResponseMessage = await QuanLyNhomVideo.GetCategories();    
        if(res.Success)
        {
            return res.Data;
        }           
        return null;
    },
    SaveState: async (data: String, dispatch: any) => {
        dispatch({
          type: "SaveState",
          item: data,
        });
      },
    GetImportFile: async (data:any,IdKhoaHoc:any) => {
        let res:IResponseMessage = await GiaoAnLyThuyet.GetImportFile(data, IdKhoaHoc);    
        return res
    },
    setURL_VideoGiaoAnLyThuyet: (URL_Video:any, dispatch:any) => {
        dispatch({
            type: "setURL_VideoGiaoAnLyThuyet",
            item: URL_Video,
          });
    },
    GetDsVideoByIdNhomVideo: async (IdNhomVideo:any, dispatch:any) => {
        if(IdNhomVideo) {
            let res:IResponseMessage = await QuanLyVideo.GetDsVideoByIdNhomVideo(IdNhomVideo);    
            if (res && res.Success) {
                dispatch({
                  type: "GetItemsVideo",
                  item: res.Data.Items,
                });
            }
        }
        else {
            dispatch({
                type: "GetItemsVideo",
                item: []
            });
        }
    },
    GetItem: async (id: String, dispatch: any) => {
        if (id) {
          let res: IResponseMessage = await GiaoAnLyThuyet.GetItem(id);
          if (res && res.Success) {
            dispatch({
              type: "GetItem",
              item: res.Data,
            });
          }
        }
    },
    GetTree: async (idKhoaHoc:any, dispatch: any) => {
        let res: IResponseMessage = await GiaoAnLyThuyet.GetTree(idKhoaHoc);
        if (res && res.Success) {
            dispatch({
                type: "GetTree",
                item: res.Data,
            });
        }
        return res;
    },

    DeleteTree: async (idKhoaHoc:any, dispatch: any) => {
        let res: IResponseMessage = await GiaoAnLyThuyet.DeleteTree(idKhoaHoc);
        return res;
    },
    CreateItemWithKhoaHoc: async (data: any, idKhoaHoc:any, dispatch: any) => {
        let res: IResponseMessage = await GiaoAnLyThuyet.CreateItemWithKhoaHoc(data, idKhoaHoc);
        if (res && res.Success) {
            data.Id = res.Data.IdGiaoAn;
            dispatch({
                type: "GetItem",
                item: data,
            });
        }
        return res;
    },
    UpdateItem: async (data: any, dispatch: any) => {
        let res: IResponseMessage = await GiaoAnLyThuyet.UpdateItem(data);
        if (res && res.Success) {
            dispatch({
                type: "GetItem",
                item: data,
            });
        }
        return res;
    },
    onClickRemove: async () => {

    },
    RefeshItem: (dispatch: any) => {
        dispatch({
            type: "GetItem",
            item: {
                Id: Guid.Empty,
                IdGiaoAnLyThuyet: Guid.Empty,
                Loai: 0,
                TieuDe: "",
                URL_Video: "",
                ThoiLuong: 0,
                MienPhi: false,
                SoThuTu: 0
            },
        });
    },
    CopyItem: async (idKhoaHoc:any, idGiaoAn:any, dispatch: any) => {
        let res: IResponseMessage = await GiaoAnLyThuyet.CopyItem(idKhoaHoc, idGiaoAn);
        return res;
    }
};
