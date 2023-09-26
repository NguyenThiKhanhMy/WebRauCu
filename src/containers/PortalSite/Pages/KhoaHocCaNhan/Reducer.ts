import { InitState, IState } from "./InitState";
export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "getLichSuGiaoDich":
      return{
        ...state,
        DataLichSuGiaoDich: action.items
      }
    case "getDanhSach":
      return{
        ...state,
        DataDanhSach: action.items
      }
  
    default:
      return state;
  }
};
