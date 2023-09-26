import { Guid } from "common/Enums";
import { IControlOptions } from "common/Models";

export interface IModelItem {
  Id: String;
  FullName: String;
  Email: String;
  Phone: String;
  Address: String;
  IsActive: Boolean;
  Note: String
}

export interface IModel {
  Id: String;
  UserName: String;
  PassWord: String;
  FullName: String;
  Email: String;
  Phone: String;
  Address: String;
  Note: String;
  IsActive: Boolean;
}

export interface IState {
  DataItem: IModelItem;
  Options: IControlOptions[];
  Item: IModel;
}
export const InitState: IState = {
  DataItem: {
    Id: Guid.Empty,
    FullName: "",
    Email: "",
    Phone: "",
    Address: "",
    IsActive: false,
    Note: ""
  },
  Options: [],
  Item: {
    Id: "",
    UserName: "",
    PassWord: "",
    FullName: "",
    Email: "",
    Phone: "",
    Address: "",
    Note: "",
    IsActive: false,
  },
};
