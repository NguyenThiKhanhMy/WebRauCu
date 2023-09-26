import CDynamicForm from "components/CDynamicForm";
import CNotification from "components/CNotification";
import { IResponseMessage } from "common/Models";
import { Message } from "common/Enums";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { connect } from "react-redux";
import { InitState } from "./InitState";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import HocVienFormInputJson from "./FormInput.json";
import HocVienFormJSON from "./FormInputHocVien.json";
import HocVienFormTaoMoi from "./FormInputTaoMoi.json";
import CConfirm from "components/CConfirm";
interface Props {
  Id: string;
  ReloadTableItems: any;
  build: any;
  hideDialog: Function;
}

const HocVienForm = (props: Props) => {
  const [state, dispatch] = useReducer(Reducer, InitState);
  useEffect(() => {
    if (props.Id) {
      if (props.build == 1 || props.build == 2 || props.build == 3) {
        Actions.GetItem(props.Id, dispatch);
      }
    }
  }, [props.Id]);
  let HocVienFormInput: any = HocVienFormInputJson;
  const refNotification = useRef<any>();
  const refDynamicForm = useRef<any>();

  const ActionEvents = {};

  const ActionEvents2 = {
    onClickUpdateNewItem: async () => {
      let isValid = refDynamicForm.current.onValidation();
      if (isValid) {
        let stateValues = refDynamicForm.current.getStateValues();
        let res: IResponseMessage = null;

        if (props.Id) {
          res = await Actions.UpdateItem(stateValues);
        }
        if (res.Success) {
          refNotification.current.showNotification("success", res.Message);
          props.ReloadTableItems();
        }
      }
    },
  };
  const ActionEvents3 = {
    onClickCreateNewItem: async () => {
      let isValid = refDynamicForm.current.onValidation();
      if (isValid) {
        let stateValues = refDynamicForm.current.getStateValues();
        let res: IResponseMessage = null;

        res = await Actions.CreateItem(stateValues);

        if (res.Success) {
          refNotification.current.showNotification("success", res.Message);
          props.ReloadTableItems();
        }
      }
    },
  };
  return (
    <>
     

      <CNotification ref={refNotification} />
      {props.build == 1 ? (
        <>
          <CDynamicForm
            ref={refDynamicForm}
            options={state.Options}
            initValues={state.DataItem}
            formDefs={
              HocVienFormInput[0]
            }
            // actionEvents={ActionEvents}
          />
        </>
      ) : (
        <></>
      )}
      {props.build == 3 ? (
        <>
          <CDynamicForm
            ref={refDynamicForm}
            options={state.Options}
            initValues={state.DataItem}
            formDefs={HocVienFormJSON}
            actionEvents={ActionEvents2}
          />
        </>
      ) : (
        <></>
      )}
      {props.build == 4 ? (
        <>
          <CDynamicForm
            ref={refDynamicForm}
            options={state.Options}
            initValues={state.Item}
            formDefs={HocVienFormTaoMoi}
            actionEvents={ActionEvents3}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(HocVienForm);
