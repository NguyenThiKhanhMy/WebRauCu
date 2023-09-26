import {
  CConfirm,
  CDialog,
  CNotification,
  CDynamicTable,
  CDynamicButton,
} from "components";
import ACard from "components/ACard";
import { Message } from "common/Enums";
import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { connect } from "react-redux";
import { InitState } from "./InitState";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import HocVienListViewJson from "./ListView.json";
import { IResponseMessage } from "common/Models";

interface Props {
  Id: any,
}

const HocVienList = (props: Props) => {
  const [state, dispatch] = useReducer(Reducer, InitState);
  const HocVienListView: any = HocVienListViewJson;
  const refNotification = useRef<any>();
  const refDynamicaTable = useRef<any>();
  useEffect(() => {
    Actions.GetItem(props.Id, dispatch);
  }, [props.Id]);
  let ButtonGroupsRender = () => {
    return (
      <></>
    );
  };
  return (
    <>
      <CNotification ref={refNotification} />
      <CDynamicTable
          ref={refDynamicaTable}
          id={HocVienListView.DataGrid.Key}
          key={HocVienListView.DataGrid.Key}
          columnDefs={HocVienListView.DataGrid.ColumnDefs}
          dataItems={state.DataItemHocVien}
        />
    </>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(HocVienList);
