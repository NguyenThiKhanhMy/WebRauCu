import { InitState, IState } from "./InitState";
export const Reducer = (state: IState = InitState, action: any) => {
  switch (action.type) {
    case "GetInfor":
      return{
        ...state,
        Infor: action.items
      }
    default:
      return state;
  }
};
