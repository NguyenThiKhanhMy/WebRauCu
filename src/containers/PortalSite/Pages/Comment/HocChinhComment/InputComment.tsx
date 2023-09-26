import CButton from "components/CButton";
import React, { useEffect, useMemo, useReducer, useState } from "react";
import { InitState } from "./InitState";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import { IUserInfo } from "common/Models";
import { Storage } from "common/Storage";
interface Props {
  value: any;
  id: any;
  idKhoaHoc: any;
  reloads: Function;
}

const InputComment = (props: Props) => {
  const [binhLuanChild, setBinhLuanChild] = useState(props.value);
  let userInfo: IUserInfo = JSON.parse(Storage.getSession("UserInfo"));
  const [state, dispatch] = useReducer(Reducer, InitState);

  const SaveMainCommentChild = async (id: any) => {
      if (binhLuanChild.length > 0) {
        let res = await Actions.saveCommentChildHocChinh(
          id,
          props.idKhoaHoc,
          userInfo.UserName,
          binhLuanChild
        );
        if (res && res.Success) {
          props.reloads();
          setBinhLuanChild("");
        }
      }
    
  };
  return (
    <>
      <input
        type="text"
        className="form-control input-comment-siz shadow-none"
        placeholder="Bình luận"
        value={binhLuanChild}
        onChange={(e) => {
          setBinhLuanChild(e.target.value);
        }}
      />
      <CButton
        title="Bình luận"
        className={"bg-danger no-border"}
        onClick={() => {
          SaveMainCommentChild(props.id);
        }}
      />
    </>
  );
};
export default InputComment;
