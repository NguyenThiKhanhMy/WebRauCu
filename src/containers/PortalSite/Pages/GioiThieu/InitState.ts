import { Guid } from "common/Enums";

export interface IState {
    DataItem: any
    DataThanhTichLeft: any,
    DataThanhTichRight: any
}

export const InitState: IState = {
    DataItem: [],
    DataThanhTichLeft: [],
    DataThanhTichRight: []
};
