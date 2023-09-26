import { Guid } from "common/Enums";
import { IControlOptions } from "common/Models";

export interface IModelItem {
    Id: String;
    IdGiaoAnLyThuyet: String;
    Loai: Number;
    TieuDe: String;
    URL_Video: String;
    ThoiLuong: Number,
    MienPhi: Boolean,
    SoThuTu: Number,
    Diem: Number
}
export interface IModelTree {
    Id: String;
    Code: String;
    Name: String;
    Children: Array<IModelTree>;
}
export interface ti{
    TieuDe: string
}
export interface IState {
    ItemVideos: any,
    Item: IModelItem,
    Tree: IModelTree[],
    Options: IControlOptions[],
    ItemChuyen: any,
    ItemAnhs: ti[] 
}
export const InitState: IState = {
    ItemAnhs: [],
    ItemChuyen: {
        // IdKhoaHocSrc: Guid.Empty,
        // IdGiaoAnSrc: Guid.Empty,
        Id: "",
        IdKhoaHocDes: ""
    },
    ItemVideos: [],
    Item: {
        Id: Guid.Empty,
        IdGiaoAnLyThuyet: Guid.Empty,
        Loai: 0,
        TieuDe: "",
        URL_Video: "",
        ThoiLuong: 0,
        MienPhi: false,
        SoThuTu: 0,
        Diem: 0
    },
    Tree: [
        {
            Id: Guid.Empty,
            Code: "DsGiaoAnLyThuyet",
            Name: "Danh sách giáo án lý thuyết",
            Children: [],
        }
    ],
    Options: []
};
