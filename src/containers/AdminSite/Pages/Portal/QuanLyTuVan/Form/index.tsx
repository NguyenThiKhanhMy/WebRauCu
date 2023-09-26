import CDynamicForm from "components/CDynamicForm";
import CNotification from "components/CNotification";
import { IResponseMessage } from "common/Models";
import { Message } from "common/Enums";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { connect } from "react-redux";
import { InitState } from "./InitState";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import TuVanFormInputJson from "./FormInput.json";
interface Props {
  Id: string;
  ReloadTableItems: any;
}

const HocVienForm = (props: Props) => {
  const [state, dispatch] = useReducer(Reducer, InitState);
  useEffect(() => {
    Actions.GetItem(props.Id, dispatch);
  }, [props.Id]);
  let HocVienFormInput: any = TuVanFormInputJson;
  const refNotification = useRef<any>();
  const refDynamicForm = useRef<any>();

  return (
    <>
      <CNotification ref={refNotification} />
      <CDynamicForm
        ref={refDynamicForm}
        options={state.Options}
        initValues={state.DataItem}
        formDefs={HocVienFormInput}
      />
    </>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(HocVienForm);
