import { Guid } from "common/Enums";

export interface IState {
  DataItem: any;
  Count: any,
  CountSort: any
}
export const InitState: IState = {
  DataItem: [],
  Count: 0,
  CountSort: 0
};
