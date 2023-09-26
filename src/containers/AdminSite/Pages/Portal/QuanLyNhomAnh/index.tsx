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
import nhomAnhListViewJson from "./ListView.json";
import NhomAnhForm from "./Form";
import { IResponseMessage } from "common/Models";

interface Props {}

const QuanLyNhomAnh = (props: Props) => {
  const [state, dispatch] = useReducer(Reducer, InitState);
  const [nhomAnhId, setnhomAnhId] = useState("");
  const NhomAnhListView: any = nhomAnhListViewJson;
  const refNotification = useRef<any>();
  const refConfirm_DeleteItem = useRef<any>();
  const refDynamicTable = useRef<any>();
  const [dialogVisible, setDialogVisible] = useState(false);
  useEffect(() => {
    Actions.GetItems(dispatch);
  }, []);
  const ActionEvents = {
    onClickCreate: () => {
      setnhomAnhId("");
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
      setnhomAnhId(getRowId());
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
        actionDefs={NhomAnhListView.DataGrid.ActionDefs}
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
            title={nhomAnhId ? "Sửa nhóm ảnh" : "Tạo mới nhóm ảnh"}
            dialogVisible={dialogVisible}
            onCancel={() => setDialogVisible(false)}
          >
            <NhomAnhForm Id={nhomAnhId} ReloadTableItems={ReloadTableItems} />
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
        Title="Thao tác này sẽ xóa nhóm ảnh này"
        Ok={async () => {
          await DeleteById();
        }}
        Canel={() => {}}
      />
      <CNotification ref={refNotification} />
      {DialogMemo}
      <ACard
        title={NhomAnhListView.DataGrid.Title}
        buttonGroups={ButtonGroupsRender()}
      >
        <CDynamicTable
          ref={refDynamicTable}
          id={NhomAnhListView.DataGrid.Key}
          key={NhomAnhListView.DataGrid.Key}
          columnDefs={NhomAnhListView.DataGrid.ColumnDefs}
          dataItems={state.DataItems}
        />
      </ACard>
    </>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(QuanLyNhomAnh);
