import { Guid } from "common/Enums";
import { IControlOptions } from "common/Models";

export interface IState {
  DataItem: any;
  Data: []
  Options: any
  GiaoVien: any
}
export const InitState: IState = {
  DataItem: [],
  Options: [],
  Data: [],
  GiaoVien: []
};
