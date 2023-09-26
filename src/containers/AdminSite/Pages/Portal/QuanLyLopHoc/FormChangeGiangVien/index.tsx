import {
  CConfirm,
  CDialog,
  CNotification,
  CDynamicTable,
  CDynamicButton,
  CDynamicForm,
} from "components";
import ACard from "components/ACard";
import { Message } from "common/Enums";
import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { connect } from "react-redux";
import { InitState } from "./InitState";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import FormInputJson from "./FormInput.json";
import { IResponseMessage } from "common/Models";

interface Props {
  Id: any,
  ReloadTableItems: any
}

const HocVienList = (props: Props) => {
  let FormInput:any = FormInputJson;
  const [state, dispatch] = useReducer(Reducer, InitState);
  const refNotification = useRef<any>();
  const refDynamicForm = useRef<any>();
  useEffect(() => {
    Actions.GetGiangVienCuaLopHoc(props.Id, dispatch);
    Actions.GetGiangVien(dispatch);
  }, [props.Id]);

  const ActionEvents = {
    onClickChange : async () => {
      let isValid = refDynamicForm.current.onValidation();
      if (isValid) {
        let stateValues = refDynamicForm.current.getStateValues();
        var item = {
          IdLopHoc: props.Id,
          GiaoViens: stateValues.ItemsGiangVienCuaLop.join(",")
        }
        var res:IResponseMessage = await Actions.ChonVaoLopHoc(item, dispatch);
        if(res && res.Data && res.Success)
        {
          refNotification.current.showNotification("success", res.Message);
          props.ReloadTableItems();
        }
      }
    }
  }
  return (
    <>
      <CNotification ref={refNotification} />
      <CDynamicForm
        options={state.Options}
        ref={refDynamicForm}
        initValues={state.Item}
        formDefs={FormInput}
        actionEvents={ActionEvents}
      />
    </>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(HocVienList);
