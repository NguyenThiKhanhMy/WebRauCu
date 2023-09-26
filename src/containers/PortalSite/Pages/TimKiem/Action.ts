import { IResponseMessage } from "common/Models";
import TimKiemService from 'services/TimKiemService';

export const Actions: any = {
  GetItemTimKiem: async (query:any, limit: any,dispatch: any) => {
    let res: IResponseMessage = await TimKiemService.GetItemTimKiem(query, limit);
    dispatch({
      type: "GetItemTimKiem",
      items: res.Data,
    });
  },
};
