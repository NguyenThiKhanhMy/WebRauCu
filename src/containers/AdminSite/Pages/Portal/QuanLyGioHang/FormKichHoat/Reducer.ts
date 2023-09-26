import { InitState, IState } from "./InitState";
export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "ChangeBox":
      for(let i = 0;i < state.DataItem.length;i++)
      {
        if(state.DataItem[i].IdKhoaHoc == action.item.IdKhoaHoc)
        {
          state.DataItem[i].caNhan = action.item.Checked;
        }
      }
      return {
        ...state
      }
    case "GetItems":
      let newData = action.items.map((item: any) => {
        return {
          ...item,
          caNhan:false
        };
      });
      return {
        ...state,
        DataItem: newData,
      };
    case "GetGiaoViens":
      let data = action.items.map((item: any) => {
        return {
          value: item.UserName,
          label: item.FullName,
        };
      });
      return {
        ...state,
        GiaoVien: data,
      };
    case "changeCheckBox":
      let olddata = state.DataItem
      olddata[action.index] = {...olddata[action.index],check:action.e}
      return {
        ...state,
        DataItem: olddata,
      };
    default:
      return state;
  }
};
