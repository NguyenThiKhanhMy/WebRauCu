import {
  CConfirm,
  CDialog,
  CNotification,
  CDynamicTable,
  CDynamicButton,
  CButton,
} from "components";
import ACard from "components/ACard";
import { Message } from "common/Enums";
import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { connect } from "react-redux";
import { InitState } from "./InitState";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import LopHocListViewJson from "./ListView.json";
import { IResponseMessage } from "common/Models";
import FormDsHocVien from "./FormDsHocVien"
import FormDsGiangVien from "./FormDsGiangVien";
import FormChangeGiangVien from "./FormChangeGiangVien";
import FormBinhLuan from "./FormBinhLuan";

interface Props {}

const LopHocList = (props: Props) => {
  const [state, dispatch] = useReducer(Reducer, InitState);
  const [LopHocId, setLopHocId] = useState("");
  const LopHocListView: any = LopHocListViewJson;
  const refNotification = useRef<any>();
  const refDynamicTable = useRef<any>();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogVisible_GV, setDialogVisible_GV] = useState(false);
  const [dialogVisible_ChangeGV, setDialogVisible_ChangeGV] = useState(false);
  const [build, setBuild] = useState(1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    Actions.GetItems(dispatch);
  }, []);
  const ActionEvents = {
    onClickDisplayDsHocVien: () => {
      if(!getRowId()) { refNotification.current.showNotification("warning", Message.Require_Row_Selection); return; }    
      setLopHocId(getRowId());
      setDialogVisible(true);
    },
    onClickDisplayDsGiangVien: () => {
      if(!getRowId()) { refNotification.current.showNotification("warning", Message.Require_Row_Selection); return; }    
      setLopHocId(getRowId());
      setDialogVisible_GV(true);
    },
    onChangeGiangVien: () => {
      if(!getRowId()) { refNotification.current.showNotification("warning", Message.Require_Row_Selection); return; }   
      setLopHocId(getRowId());
      setDialogVisible_ChangeGV(true);
    },
    onClickBL: () => {
      if (!getRowId()) {
        refNotification.current.showNotification(
          "warning",
          Message.Require_Row_Selection
        );
        return;
      }
      setLopHocId(getRowId());
      setVisible(true);
    },
  };
  const DialogMemo_ChangeGV = useMemo(() => {
    return (
      <>
        {dialogVisible_ChangeGV == true ? (
          <CDialog
            style={{ width: "50%", top: "5%", minWidth: "300px" }}
            title={"Thay đổi giảng viên"}
            dialogVisible={dialogVisible_ChangeGV}
            onCancel={() => setDialogVisible_ChangeGV(false)}
          >
            <FormChangeGiangVien
              Id={LopHocId}
              ReloadTableItems={() =>{ Actions.GetItems(dispatch) }}
            />
          </CDialog>
        ) : (
          <div></div>
        )}
      </>
    );
  }, [dialogVisible_ChangeGV]); 
  const DialogMemo_GV = useMemo(() => {
    return (
      <>
        {dialogVisible_GV == true ? (
          <CDialog
            style={{ width: "50%", top: "5%", minWidth: "300px" }}
            title={"Danh sách giảng viên"}
            dialogVisible={dialogVisible_GV}
            onCancel={() => setDialogVisible_GV(false)}
          >
            <FormDsGiangVien
              Id={LopHocId}
            />
          </CDialog>
        ) : (
          <div></div>
        )}
      </>
    );
  }, [dialogVisible_GV]); 
  const DialogMemo = useMemo(() => {
    var tenKhoaHoc = "";
    if(refDynamicTable.current)
    {
      var item = refDynamicTable.current.getRowSelected();
      if(item)
      {
        tenKhoaHoc = item["0"][2];
      }
    }
    return (
      <>
        {dialogVisible == true ? (
          <CDialog
            style={{ width: "95%", top: "5%", minWidth: "300px" }}
            title={"Danh sách học viên"}
            dialogVisible={dialogVisible}
            onCancel={() => setDialogVisible(false)}
          >
            <FormDsHocVien
              Id={LopHocId}
              TenKhoaHoc={tenKhoaHoc}
            />
          </CDialog>
        ) : (
          <div></div>
        )}
      </>
    );
  }, [dialogVisible]);

  const getRowId = () => {
    return refDynamicTable.current.getRowId();
  };
  let ButtonGroupsRender = () => {
    return (
      <CDynamicButton
        actionDefs={LopHocListView.DataGrid.ActionDefs}
        actions={ActionEvents}
      />
    );
  };
  const DialogBLMemo = useMemo(() => {
    return (
      <>
        {visible == true ? (
          <CDialog
            style={{ width: "95%", top: "5%" }}
            title={"Danh sách bình luận lớp học"}
            dialogVisible={visible}
            onCancel={() => setVisible(false)}
          >
            <FormBinhLuan Id={LopHocId} ReloadTableItems={() => {}}/>
          </CDialog>
        ) : (
          <div></div>
        )}
      </>
    );
  }, [visible]);

  return (
    <>
      <CNotification ref={refNotification} />
      {DialogMemo}
      {DialogMemo_GV}
      {DialogMemo_ChangeGV}
      {DialogBLMemo}
      <ACard
        title={LopHocListView.DataGrid.Title}
        buttonGroups={ButtonGroupsRender()}
      >
        <CDynamicTable
          ref={refDynamicTable}
          id={LopHocListView.DataGrid.Key}
          key={LopHocListView.DataGrid.Key}
          columnDefs={LopHocListView.DataGrid.ColumnDefs}
          dataItems={state.DataItems}
        />
      </ACard>
    </>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(LopHocList);
