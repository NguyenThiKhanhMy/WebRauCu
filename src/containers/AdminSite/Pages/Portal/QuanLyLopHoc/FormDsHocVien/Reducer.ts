import { InitState, IState } from "./InitState";
export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "GetItemHocViens":
      return {
        ...state,
        DataItemHocVien: action.item,
      };
    case "GetItemLichSu":
      return {
        ...state,
        DataItemLichSu: action.item,
        DataItemLichSuCopy: action.item,
      };
    case "getAll":
      let dataAll = state.DataItemLichSuCopy.filter(
        (value: any) => value.QuanTrong && value.KiemTra
      );
      return {
        ...state,
        DataItemLichSu: dataAll,
      };
    case "getReset":
      let dataReset = state.DataItemLichSuCopy
       return {
        ...state,
        DataItemLichSu: dataReset,
      };
    case "getQuanTrong":
      let dataQuanTrong = state.DataItemLichSuCopy.filter(
        (value: any) => value.QuanTrong && !value.KiemTra
      );
      return {
        ...state,
        DataItemLichSu: dataQuanTrong,
      };
    case "getKiemTra":
      let dataKiemTra = state.DataItemLichSuCopy.filter(
        (value: any) => !value.QuanTrong && value.KiemTra
      );
      return {
        ...state,
        DataItemLichSu: dataKiemTra,
      };
    default:
      return state;
  }
};
