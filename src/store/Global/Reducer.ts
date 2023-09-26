
import { InitState, IState }  from "./InitState"
export const Reducer = (state:IState = InitState, action:any) =>
{  
  switch (action.type) {    
    case "GetToInfoShop":
      return {
        ...state,
        InfoShop: action.item
      }
    case "GetToSocialMedia":
      return {
        ...state,
        SocialMedia: action.item
      }
    case "AddToCard":
      return {
        ...state,
        CartQuantity: action.item
      }   
    default:
      return state;
  }
}