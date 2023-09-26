import { IResponseMessage } from 'common/Models';
import UserService  from 'services/UserService';
export const Actions: any = {
    GetInfor: async (dispatch: any) => {
        let res: IResponseMessage = await UserService.Info();
        dispatch({
          type: "GetInfor",
          items: res.Data,
        });
      },
     
};
