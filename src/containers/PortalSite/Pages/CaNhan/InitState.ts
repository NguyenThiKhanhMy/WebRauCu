import { Guid } from "common/Enums";
export interface IState {
  DataLichSuGiaoDich: any;
  DataDanhSach: any;
  DataUser: any;
}
export const InitState: IState = {
  DataLichSuGiaoDich: [],
  DataDanhSach: [],
  DataUser: {
    Id: Guid.Empty,
    FullName: "",
    Email: "",
    Phone: "",
    Address: "",
    IsActive: false,
  },
};
