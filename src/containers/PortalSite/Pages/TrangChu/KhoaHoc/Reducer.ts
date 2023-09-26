import { InitState, IState } from "./InitState";

export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "GetItemsKhoaHoc":
      let dataKhoaHoc = action.items.map((value: any) => {
        return {
          TenMonHoc: value.length > 0 ? value[0].TenMonHoc : "",
          DanhSachKhoaHoc: [...value],
        };
      });
      return {
        ...state,
        DataItemsKhoaHoc: dataKhoaHoc,
      };

    default:
      return state;
  }
};
