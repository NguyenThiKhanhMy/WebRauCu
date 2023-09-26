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
import TuVanListViewJson from "./ListView.json";
import TuVanForm from "./Form";
import { IResponseMessage } from "common/Models";

interface Props {}

const TuVanList = (props: Props) => {
  const [state, dispatch] = useReducer(Reducer, InitState);
  const [tuVanId, settuVanId] = useState("");
  const TuVanListView: any = TuVanListViewJson;
  const refNotification = useRef<any>();
  const refDynamicTable = useRef<any>();
  const [dialogVisible, setDialogVisible] = useState(false);
  useEffect(() => {
    Actions.GetItems(dispatch);
  }, []);
  const ActionEvents = {
    onClickShow: () => {
      if (!getRowId()) {
        refNotification.current.showNotification(
          "warning",
          Message.Require_Row_Selection
        );
        return;
      }
      settuVanId(getRowId());
      setDialogVisible(true);
    },
  };
  const ReloadTableItems = () => {
    Actions.GetItems(dispatch);
  };
  const getRowId = () => {
    return refDynamicTable.current.getRowId();
  };
  let ButtonGroupsRender = () => {
    return (
      <CDynamicButton
        actionDefs={TuVanListView.DataGrid.ActionDefs}
        actions={ActionEvents}
      />
    );
  };
  const DialogMemo = useMemo(() => {
    return (
      <>
        {dialogVisible == true ? (
          <CDialog
            style={{ width: "50%", top: "5%" }}
            title={"Xem tư vấn"}
            dialogVisible={dialogVisible}
            onCancel={() => setDialogVisible(false)}
          >
            <TuVanForm Id={tuVanId} ReloadTableItems={ReloadTableItems} />
          </CDialog>
        ) : (
          <div></div>
        )}
      </>
    );
  }, [dialogVisible]);
  return (
    <>
      {/* <CConfirm ref={refConfirm_DeleteItem} Title="Thao tác này sẽ xóa sự kiện này" /> */}
      <CNotification ref={refNotification} />
      {DialogMemo}
      <ACard
        title={TuVanListView.DataGrid.Title}
        buttonGroups={ButtonGroupsRender()}
      >
        <CDynamicTable
          ref={refDynamicTable}
          id={TuVanListView.DataGrid.Key}
          key={TuVanListView.DataGrid.Key}
          columnDefs={TuVanListView.DataGrid.ColumnDefs}
          dataItems={state.DataItems}
        />
      </ACard>
    </>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(TuVanList);
