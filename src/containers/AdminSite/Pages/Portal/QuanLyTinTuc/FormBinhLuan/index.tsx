import CNotification from "components/CNotification";
import { Message } from "common/Enums";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { connect } from "react-redux";
import { InitState } from "./InitState";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import ACard from "components/ACard";
import CDynamicTable from "components/CDynamicTable";
import CButton from "components/CButton";
import NhanXetFormInputJson from "./NhanXetHocVien.json";


interface Props {
  Id: string;
  ReloadTableItems: any;
}

const BinhLuanForm = (props: Props) => {
  const [state, dispatch] = useReducer(Reducer, InitState);
  const refDynamicFormHocVien = useRef<any>();

  useEffect(() => {
    Actions.GetItemHocVien(props.Id, dispatch);
  }, [props.Id]);

  const refNotification = useRef<any>();
  const changeStatus = async() => {
    if(refDynamicFormHocVien.current.getRowId()){
      let data = state.DataHocVien.find((value:any) => value.Id == refDynamicFormHocVien.current.getRowId())
      let res = await Actions.change(data)
      if(res && res.Success){
        refNotification.current.showNotification(
          "success",
          "Chuyển trạng thái thành công"
        );
        Actions.GetItemHocVien(props.Id, dispatch);
      }
    }
    else{
      refNotification.current.showNotification(
        "warning",
        Message.Require_Row_Selection
      );
    }
  }
  const ButtonGroupsRendersReturn = () => {
    return (
      <>
        <CButton
          title="Đổi trạng thái"
          onClick={() => {changeStatus()}}
        />
      </>
    );
  };
 
  return (
    <>
      <CNotification ref={refNotification} />
        <ACard title={""} buttonGroups={ButtonGroupsRendersReturn()}>
          <CDynamicTable
            ref={refDynamicFormHocVien}
            id={NhanXetFormInputJson.DataGrid.Key}
            key={NhanXetFormInputJson.DataGrid.Key}
            columnDefs={NhanXetFormInputJson.DataGrid.ColumnDefs}
            dataItems={state.DataHocVien}
          />
        </ACard>
   
    </>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(BinhLuanForm);
