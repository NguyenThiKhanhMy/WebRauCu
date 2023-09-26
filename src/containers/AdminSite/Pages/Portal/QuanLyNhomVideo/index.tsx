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
import nhomVideoListViewJson from "./ListView.json";
import NhomVideoForm from "./Form";
import { IResponseMessage } from "common/Models";

interface Props {}

const QuanLyNhomVideo = (props: Props) => {
  const [state, dispatch] = useReducer(Reducer, InitState);
  const [nhomVideoId, setnhomVideoId] = useState("");
  const NhomVideoListView: any = nhomVideoListViewJson;
  const refNotification = useRef<any>();
  const refConfirm_DeleteItem = useRef<any>();
  const refDynamicTable = useRef<any>();
  const [dialogVisible, setDialogVisible] = useState(false);
  useEffect(() => {
    Actions.GetItems(dispatch);
  }, []);
  const ActionEvents = {
    onClickCreate: () => {
      setnhomVideoId("");
      setDialogVisible(true);
    },
    onClickUpdate: () => {
      if (!getRowId()) {
        refNotification.current.showNotification(
          "warning",
          Message.Require_Row_Selection
        );
        return;
      }
      setnhomVideoId(getRowId());
      setDialogVisible(true);
    },
    onClickDelete: async () => {
      if (!getRowId()) {
        refNotification.current.showNotification(
          "warning",
          Message.Require_Row_Selection
        );
        return;
      }
      refConfirm_DeleteItem.current.showConfirm();
    },
  };
  const DeleteById = async () => {
    let res: IResponseMessage = await Actions.DeleteById(getRowId(), dispatch);
    if (res.Success) {
      refNotification.current.showNotification("success", res.Message);
      ReloadTableItems();
    }
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
        actionDefs={NhomVideoListView.DataGrid.ActionDefs}
        actions={ActionEvents}
      />
    );
  };
  const DialogMemo = useMemo(() => {
    return (
      <>
        {dialogVisible == true ? (
          <CDialog
            style={{ width: "300px", top: "5%" }}
            title={nhomVideoId ? "Sửa nhóm video" : "Tạo mới nhóm video"}
            dialogVisible={dialogVisible}
            onCancel={() => setDialogVisible(false)}
          >
            <NhomVideoForm
              Id={nhomVideoId}
              ReloadTableItems={ReloadTableItems}
            />
          </CDialog>
        ) : (
          <div></div>
        )}
      </>
    );
  }, [dialogVisible]);
  return (
    <>
      <CConfirm
        ref={refConfirm_DeleteItem}
        Title="Thao tác này sẽ xóa nhóm video này"
        Ok={async () => {
          await DeleteById();
        }}
        Canel={() => {}}
      />
      <CNotification ref={refNotification} />
      {DialogMemo}
      <ACard
        title={NhomVideoListView.DataGrid.Title}
        buttonGroups={ButtonGroupsRender()}
      >
        <CDynamicTable
          ref={refDynamicTable}
          id={NhomVideoListView.DataGrid.Key}
          key={NhomVideoListView.DataGrid.Key}
          columnDefs={NhomVideoListView.DataGrid.ColumnDefs}
          dataItems={state.DataItems}
        />
      </ACard>
    </>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(QuanLyNhomVideo);
