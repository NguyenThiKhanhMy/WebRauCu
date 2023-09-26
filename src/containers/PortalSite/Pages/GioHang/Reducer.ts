import { InitState, IState } from "./InitState";
export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "GetGioHang":
      let data = action.items.map((item: any) => {
        return {
          ...item,
          Check: false,
        };
      });
      return {
        ...state,
        DataItem: data,
        Count: data.length,
        Totalpre: 0,
        Totalnext: 0,
      };
    case "restore":
      let resA: number = state.Totalpre;
      let resB: number = state.Totalnext;
      if (state.DataItem[action.items].Check) {
        resA = resA - Number(state.DataItem[action.items].HocPhiGiamGia);
        resB = resB - Number(state.DataItem[action.items].HocPhiGoc);
      }
      let newDatas = state.DataItem.filter((val:any, ie:any) => {
        return ie != action.items
      });
      return {
        ...state,
        DataItem: newDatas,
        Totalpre: resA,
        Totalnext: resB,
      };
    case "ChangeData":
      let datas = state.DataItem;
      datas[action.index].Check = action.check;
      let countA = state.Totalpre;
      let countB = state.Totalnext;
      if (action.check) {
        countA = countA + action.HocPhiGiamGia;
        countB = countB + action.HocPhiGoc;
      } else {
        countA = countA - action.HocPhiGiamGia;
        countB = countB - action.HocPhiGoc;
      }
      return {
        ...state,
        DataItem: datas,
        Totalpre: countA,
        Totalnext: countB,
      };
    case "ChangeAll":
      let totalnext = 0;
      let totalprev = 0;
      if (action.check == true) {
        if (state.DataItem.length > 0) {
          totalprev = state.DataItem.reduce((pre: any, cons: any) => {
            return pre + cons.HocPhiGiamGia;
          }, 0);
          totalnext = state.DataItem.reduce((pre: any, cons: any) => {
            return pre + cons.HocPhiGoc;
          }, 0);
        }
      }

      let newData = state.DataItem.map((value: any) => {
        return {
          ...value,
          Check: action.check,
        };
      });
      return {
        ...state,
        DataItem: newData,
        Totalpre: totalprev,
        Totalnext: totalnext,
      };
    case "GetGioHangs":
      return {
        ...state,
        DataItem: [],
        Totalpre: 0,
        Totalnext: 0,
      };
    default:
      return state;
  }
};
