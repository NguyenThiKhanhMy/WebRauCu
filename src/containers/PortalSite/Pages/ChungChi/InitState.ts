import { Guid } from "common/Enums";
export interface IState {
  Infor: any;
}
export const InitState: IState = {
  Infor: {
    Id: Guid.Empty,
    FullName: "",
    UserName: "",
    Email: "",
    Phone: "",
    Address: "",
    Note: "",
    Roles: [],
  },
};
