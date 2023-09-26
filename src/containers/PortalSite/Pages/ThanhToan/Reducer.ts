import { InitState, IState } from "./InitState";
export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "GetGioHang":
      let data = action.items.reduce((pre: any, cons: any) => {
        return pre + cons.HocPhiGiamGia;
      }, 0);
      return {
        ...state,
        DataItem: action.items,
        Count: action.items.length,
        Total: data,
      };
    case "GetThanhToan":
      return {
        ...state,
        DataThanhToan: action.items,
      };
  }
};
