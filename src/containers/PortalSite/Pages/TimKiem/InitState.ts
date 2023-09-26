import { Guid } from "common/Enums";
export interface IState {
  DataItem:any,
  Count: number
}
export const InitState: IState = {
  DataItem: [],
  Count:0
};
