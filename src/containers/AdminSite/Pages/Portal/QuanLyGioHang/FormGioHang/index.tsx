import React, { useEffect, useReducer, useRef, useState } from 'react'
import { connect } from "react-redux";
import { InitState } from './InitState';
import { Actions } from './Action';
import { Reducer } from './Reducer';
import GioHangFormInputJson from './FormInput.json';
import CDynamicForm from 'components/CDynamicForm';
import { IResponseMessage } from 'common/Models';
import CNotification from 'components/CNotification';
interface Props {
  Id: string;
  ReloadTableItems: any
}

const GioHangForm = (props: Props) => {  
  const [state, dispatch] = useReducer(Reducer, InitState);
  const GioHangFormInput = GioHangFormInputJson;
  const refDynamicForm = useRef<any>();
  const refNotification = useRef<any>();
  useEffect(() => {
    Actions.GetItem(props.Id, dispatch);
  }, [props.Id])
  const ActionEvents = {
    onClickSave: async () => {
      let isValid = refDynamicForm.current.onValidation();
      if(isValid)
      {  
        let stateValues = refDynamicForm.current.getStateValues();
        if(stateValues.Files.length == 0)
        {
          stateValues.URL_FileDinhKem = "";
        }
        let res:IResponseMessage = null;                                      
        if(props.Id) 
        {            
          res = await Actions.SaveItem(stateValues);                      
        }                
        if(res.Success) {            
          refNotification.current.showNotification("success", res.Message);          
          props.ReloadTableItems();
        } 
      }
    }
  }
  return(
    <>
      <CNotification ref={refNotification} />   
      <CDynamicForm
          ref={refDynamicForm}
          options={state.Options}
          initValues={state.DataItem}
          formDefs={GioHangFormInput}
          actionEvents={ActionEvents}
        />
    </>
  )
}
const mapState = ({ ...state }) => ({
  
});
const mapDispatchToProps = {
  
};

export default connect(mapState, mapDispatchToProps)(GioHangForm);