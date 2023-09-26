export interface IModelItem {
  Id: String;
  Ma: String;
  Ten: String;
  KhoaHoc: String;
  SLHocVien: String;
}

export interface ImodelLichSu{
  Id: String,
  TenGiaoAn: String,
  Diem: Number,
  NguoiNopBai: String,
  NoiDungNopBai: String,
}

export interface IState {
  DataItemHocVien: IModelItem[];
  DataItemLichSu: ImodelLichSu[],
  DataItemLichSuCopy: ImodelLichSu[],
  DataNhanXet: {
    chamDiem: Number,
    noiDungNhanXet: String
  }
}
export const InitState: IState = {
  DataItemHocVien: [],
  DataItemLichSu: [],
  DataNhanXet: {
    noiDungNhanXet: "",
    chamDiem: 0
  },
  DataItemLichSuCopy: []
};
