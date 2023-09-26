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
import HocVienForm from "./Form";
import { IResponseMessage } from "common/Models";

interface Props {}

const HocVienList = (props: Props) => {
  const [state, dispatch] = useReducer(Reducer, InitState);
  const refConfirm = useRef<any>();

  const [hocVienId, sethocVienId] = useState("");
  const HocVienListView: any = HocVienListViewJson;
  const refNotification = useRef<any>();
  const refDynamicTable = useRef<any>();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [build, setBuild] = useState(1);
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
      setBuild(1);
      sethocVienId(getRowId());
      setDialogVisible(true);
    },
    onClickActivate: async () => {
      if (!getRowId()) {
        refNotification.current.showNotification(
          "warning",
          Message.Require_Row_Selection
        );
        return;
      }
      refConfirm.current.showConfirm();
    },
    onClickUpdate: () => {
      if (!getRowId()) {
        refNotification.current.showNotification(
          "warning",
          Message.Require_Row_Selection
        );
        return;
      }
      setBuild(3);
      sethocVienId(getRowId());
      setDialogVisible(true);
    },
    onClickCreate: () => {
      setBuild(4);
      setDialogVisible(true);
    },
  };

  const Actived = async () => {
    let data = state.DataItems.find((val: any) => {
      return val.Id == getRowId();
    });
    if (data) {
      if (data.IsActive == true) {
        let res = await Actions.UnActive(getRowId(), dispatch);
        await Actions.GetItems(dispatch);
        if (res && res.success) {
          refNotification.current.showNotification(
            "success",
            "Cập nhật thành công"
          );
        }
      } else {
        let res = await Actions.Active(getRowId(), dispatch);
        await Actions.GetItems(dispatch);
        if (res && res.success) {
          refNotification.current.showNotification(
            "success",
            "Cập nhật thành công"
          );
        }
      }
    }
  };

  const hideDialog = () => {
    setDialogVisible(false);
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
        actionDefs={HocVienListView.DataGrid.ActionDefs}
        actions={ActionEvents}
      />
    );
  };
  const DialogMemo = useMemo(() => {
    return (
      <>
        {dialogVisible == true ? (
          <CDialog
            style={{
              width: `${
                build == 3 || build == 1 || build == 4 ? "40%" : "30%"
              }`,
            }}
            title={
              build == 1
                ? "Xem học viên"
                : build == 2
                ? "Kích hoạt học viên"
                : build == 3
                ? "Sửa thông tin học viên"
                : "Thêm học viên"
            }
            dialogVisible={dialogVisible}
            onCancel={() => setDialogVisible(false)}
          >
            <HocVienForm
              Id={hocVienId}
              build={build}
              ReloadTableItems={ReloadTableItems}
              hideDialog={hideDialog}
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
        ref={refConfirm}
        Title="Thao tác này sẽ cập nhật tình trạng học viên này"
        Ok={async () => {
          await Actived();
        }}
        Canel={() => {}}
      />
      <CNotification ref={refNotification} />
      {DialogMemo}
      <ACard
        title={HocVienListView.DataGrid.Title}
        buttonGroups={ButtonGroupsRender()}
      >
        <CDynamicTable
          ref={refDynamicTable}
          id={HocVienListView.DataGrid.Key}
          key={HocVienListView.DataGrid.Key}
          columnDefs={HocVienListView.DataGrid.ColumnDefs}
          dataItems={state.DataItems}
        />
      </ACard>
    </>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(HocVienList);
