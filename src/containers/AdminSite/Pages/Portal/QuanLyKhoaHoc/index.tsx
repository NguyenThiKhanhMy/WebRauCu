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
import khoaHocListViewJson from "./ListView.json";
import FormKhoaHoc from "./Form";
import FormGiaoAnLyThuyet from "./FormGiaoAnLyThuyet";
import FormGiaoAnThucHanh from "./FormGiaoAnThucHanh";
import { IResponseMessage } from "common/Models";
import ATab from "components/ATab";
import FormBinhLuan from "./FormBinhLuan";

interface Props {}

const KhoaHocList = (props: Props) => {
  const [state, dispatch] = useReducer(Reducer, InitState);
  const [khoaHocId, setkhoaHocId] = useState("");
  const KhoaHocListView: any = khoaHocListViewJson;
  const refNotification = useRef<any>();
  const refConfirm_DeleteItem = useRef<any>();
  const refDynamicTable = useRef<any>();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    Actions.GetItems(dispatch);
  }, []);
  const ActionEvents = {
    onClickCreate: () => {
      setkhoaHocId("");
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
      setkhoaHocId(getRowId());
      setDialogVisible(true);
    },
    onClickBL: () => {
      if (!getRowId()) {
        refNotification.current.showNotification(
          "warning",
          Message.Require_Row_Selection
        );
        return;
      }
      setkhoaHocId(getRowId());
      setVisible(true);
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
        actionDefs={KhoaHocListView.DataGrid.ActionDefs}
        actions={ActionEvents}
      />
    );
  };
  const TabKhoaHocRender = () => {
    return (
      <ATab
        key="KhoaHoc"
        activeName="ThongTinKhoaHoc"
        onTabClick={() => {}}
        tabsPanel={[
          {
            label: "Thông tin",
            name: "ThongTinKhoaHoc",
            panel: (
              <FormKhoaHoc Id={khoaHocId} ReloadTableItems={ReloadTableItems} />
            ),
          },
          {
            label: "Giáo án lý thuyết",
            name: "GiaoAnLyThuyet",
            panel: <FormGiaoAnLyThuyet khoaHocId={khoaHocId} />,
          },
          {
            label: "Giáo án thực hành",
            name: "GiaoAnThucHanh",
            panel: <FormGiaoAnThucHanh khoaHocId={khoaHocId} />,
          },
        ]}
      ></ATab>
    );
  };
  const DialogMemo = useMemo(() => {
    return (
      <>
        {dialogVisible == true ? (
          <CDialog
            style={{ width: "95%", top: "1%" }}
            title={khoaHocId ? "Sửa khóa học" : "Tạo mới khóa học"}
            dialogVisible={dialogVisible}
            onCancel={() => setDialogVisible(false)}
          >
            {TabKhoaHocRender()}
          </CDialog>
        ) : (
          <div></div>
        )}
      </>
    );
  }, [dialogVisible]);
  const DialogBLMemo = useMemo(() => {
    return (
      <>
        {visible == true ? (
          <CDialog
            style={{ width: "95%", top: "5%" }}
            title={"Danh sách bình luận khóa học"}
            dialogVisible={visible}
            onCancel={() => setVisible(false)}
          >
            <FormBinhLuan Id={khoaHocId} ReloadTableItems={ReloadTableItems}/>
          </CDialog>
        ) : (
          <div></div>
        )}
      </>
    );
  }, [visible]);
  return (
    <>
      <CConfirm
        ref={refConfirm_DeleteItem}
        Title="Thao tác này sẽ xóa khóa học này"
        Ok={async () => {
          await DeleteById();
        }}
        Canel={() => {}}
      />
      <CNotification ref={refNotification} />
      {DialogMemo}
      {DialogBLMemo}
      <ACard
        title={KhoaHocListView.DataGrid.Title}
        buttonGroups={ButtonGroupsRender()}
      >
        <CDynamicTable
          ref={refDynamicTable}
          id={KhoaHocListView.DataGrid.Key}
          key={KhoaHocListView.DataGrid.Key}
          columnDefs={KhoaHocListView.DataGrid.ColumnDefs}
          dataItems={state.DataItems}
        />
      </ACard>
    </>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(KhoaHocList);
