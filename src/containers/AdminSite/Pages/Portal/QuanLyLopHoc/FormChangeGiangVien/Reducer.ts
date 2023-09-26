import { InitState, IState } from "./InitState";
export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "GetGiangVien":
      let options: any = [...state.Options];
      options.push({ Key: "ItemsGiangVienCuaLop", Options: action.items });
      return {
        ...state,
        ItemsGiangVien: action.items,
        Options: options,
      };
    case "GetGiangVienCuaLopHoc":
      let items_giangvien:any = [];
      if (action.items) {
        for (let i = 0; i < action.items.length; i++) {
          items_giangvien.push(action.items[i].UserName);
        }
      }

      return {
        ...state,
        Item: {
          ...state.Item,
          ItemsGiangVienCuaLop: items_giangvien,
        },
      };
    default:
      return state;
  }
};
