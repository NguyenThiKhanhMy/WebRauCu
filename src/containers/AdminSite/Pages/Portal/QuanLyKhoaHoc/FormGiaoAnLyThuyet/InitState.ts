import { Guid } from "common/Enums";

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
export interface IState {
    ItemVideos: any,
    Item: IModelItem,
    Tree: IModelTree[]
}
export const InitState: IState = {
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
    ]
};
