import { Guid } from "common/Enums";

export interface IState {
  DataItem: any;
  DataItemCopy: any 
  Count: number
}
export const InitState: IState = {
  DataItem: [],
  DataItemCopy: [], 
  Count: 0
};
