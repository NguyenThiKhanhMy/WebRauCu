import { Guid } from "common/Enums";

export interface IModelItem {
    Id: String;
    IdGiaoAnThucHanh: String;
    Loai: Number;
    TieuDe: String;
    GhiChu: String;
    URL_Video: String;
    ThoiLuong: Number,
    MienPhi: Boolean,
    QuanTrong: Boolean,
    SoThuTu: Number,
    DiemNopBai: Number
}
export interface IModelTree {
    Id: String;
    Code: String;
    Name: String;
    Children: Array<IModelTree>;
}
export interface IState {
    Item: IModelItem,
    Tree: IModelTree[],
    ItemVideos: any,
}
export const InitState: IState = {
    ItemVideos: [],
    Item: {
        Id: Guid.Empty,
        IdGiaoAnThucHanh: Guid.Empty,
        Loai: 0,
        TieuDe: "",
        GhiChu: "",
        URL_Video: "",
        ThoiLuong: 0,
        MienPhi: false,
        QuanTrong: false,
        SoThuTu: 0,
        DiemNopBai: 0
    },
    Tree: [
        {
            Id: Guid.Empty,
            Code: "DsGiaoAnThucHanh",
            Name: "Danh sách giáo án thực hành",
            Children: [],
        }
    ]
};
