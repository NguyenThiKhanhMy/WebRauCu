import { Guid } from "common/Enums";
import { InitState, IState } from "./InitState";
export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "GetItem":
      let tree: any = [];
      let node = action.items;
      tree = action.items.filter(
        (item: any) => item.IdLopHocHocVienBinhLuan == Guid.Empty
      ); //n
      tree = tree.map((item: any) => {
        return { ...item, ["Child"]: [] };
      }); //n
      tree.forEach((item: any, indexParent: any) => {
        //n^2
        node.forEach((childItem: any, index: any) => {
          if (item.Id == childItem.IdLopHocHocVienBinhLuan) {
            tree[indexParent].Child.push(childItem);
          }
        });
      });

      tree.sort(function (a: any, b: any) {
        //n
        return (
          new Date(b.CreatedDateTime).valueOf() -
          new Date(a.CreatedDateTime).valueOf()
        );
      });

      return {
        ...state,
        DataItem: tree,
        Count: action.items.length,
        CountSort: tree.length,
      };
    default:
      return state;
  }
};
