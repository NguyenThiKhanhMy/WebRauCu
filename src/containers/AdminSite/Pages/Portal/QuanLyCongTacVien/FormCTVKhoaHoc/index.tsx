import CDynamicForm from "components/CDynamicForm";
import CNotification from "components/CNotification";
import { IResponseMessage } from "common/Models";
import { Message } from "common/Enums";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { connect } from "react-redux";
import { InitState } from "./InitState";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import CongTacFormInputJson from "./FormInput.json";
import ACard from "components/ACard";
import CDynamicTable from "components/CDynamicTable";
import CongTacVienForm from "./ListView.json";
import CDynamicButton from "components/CDynamicButton";
import CConfirm from "components/CConfirm";
import FormInputChietKhau from "./FormInputChietKhau.json";
import { String } from "common/String";
import CButton from "components/CButton";
interface Props {
  Id: string;
  ReloadTableItems: any;
}

const CongTacForm = (props: Props) => {
  const [state, dispatch] = useReducer(Reducer, InitState);

  useEffect(() => {
    Actions.GetItem(props.Id, dispatch);
  }, [props.Id]);

  let CongTacFormInput: any = CongTacFormInputJson;
  const refNotification = useRef<any>();
  const refDynamicTable = useRef<any>();
  const refConfirm_DeleteItem = useRef<any>();
  const refDynamicForm = useRef<any>();

  const ActionEvents = {
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
  const ActionEventsTimKiem = {
    onClickSave: async () => {
      if (!props.Id) {
        refNotification.current.showNotification(
          "warning",
          Message.Require_Row_Selection
        );
        return;
      }

      let isValid = refDynamicForm.current.onValidation();
      if (isValid) {
        let stateValue = refDynamicForm.current.getStateValues();
        let res = await Actions.GetTimKiem(stateValue, props.Id, dispatch);
        if (res && res.Success) {
          refNotification.current.showNotification("success", res.Message);
          props.ReloadTableItems();
        }
      }
    },
    onClickReload: async () => {
      Actions.GetReload(dispatch);
    },
  };
  let ButtonGroupsRender = () => {
    return (
      <CDynamicButton
        actionDefs={CongTacVienForm.DataGrid.ActionDefs}
        actions={ActionEvents}
      />
    );
  };

  const ButtonGroupsRendersReturn = () => {
    return (
      <>
        <CButton
          title="Tính tiền hoa hồng"
          onClick={() => {
            ActionEventsTimKiem.onClickSave();
          }}
        />
        <CButton
          title="Làm mới"
          onClick={() => {
            ActionEventsTimKiem.onClickReload();
          }}
        />
      </>
    );
  };
  const ReloadTableItems = () => {
    Actions.GetItem(props.Id, dispatch);
  };
  const DeleteById = async () => {
    let res: IResponseMessage = await Actions.DeleteById(getRowId(), dispatch);
    if (res.Success) {
      refNotification.current.showNotification("success", res.Message);
      ReloadTableItems();
    }
  };
  const getRowId = () => {
    return refDynamicTable.current.getRowId();
  };
  return (
    <>
      <CConfirm
        ref={refConfirm_DeleteItem}
        Title="Thao tác này sẽ xóa giao dịch này"
        Ok={async () => {
          await DeleteById();
        }}
        Canel={() => {}}
      />
      <CNotification ref={refNotification} />
      <ACard
        title={"Thời gian bán khóa học"}
        buttonGroups={ButtonGroupsRendersReturn()}
      >
        <CDynamicForm
          ref={refDynamicForm}
          initValues={state.ItemTongChietKhau}
          formDefs={FormInputChietKhau}
          actionEvents={ActionEventsTimKiem}
        />
        {state.TienHoaHong && (
          <h5 className="text-right">Tiền hoa hồng: <b>{String.num(state.TienHoaHong)}₫</b></h5>
        )}
      </ACard>

      <ACard title={"Danh sách khóa học"} buttonGroups={ButtonGroupsRender()}>
        <CDynamicTable
          ref={refDynamicTable}
          id={CongTacVienForm.DataGrid.Key}
          key={CongTacVienForm.DataGrid.Key}
          columnDefs={CongTacVienForm.DataGrid.ColumnDefs}
          dataItems={state.DataItem}
        />
      </ACard>
    </>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(CongTacForm);
