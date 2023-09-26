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
import FormInputCTV from "./FormInput.json";

interface Props {
  Id: string;
  ReloadTableItems: any;
}

const CongTacForm = (props: Props) => {
  const [state, dispatch] = useReducer(Reducer, InitState);
  useEffect(() => {
    Actions.GetItem(dispatch);
  }, []);

  const refNotification = useRef<any>();
  const refDynamicTable = useRef<any>();
  const refDynamicForm = useRef<any>();

  const ActionEvents = {
    onClickSave: async () => {
      let isValid = refDynamicForm.current.onValidation();
      if (isValid) {
        let stateValues = refDynamicForm.current.getStateValues();
        if (getRowId()) {
          let data = state.DataItem.find(
            (value: any) => value.Id == getRowId()
          );
          let res: IResponseMessage = null;
          res = await Actions.CreateItem(
            props.Id,
            getRowId(),
            stateValues.SoLuong,
            data.HocPhiGoc,
            data.HocPhiGiamGia,
            stateValues.ChietKhau,
            stateValues.NgayBan
          );

          if (res.Success) {
            refNotification.current.showNotification("success", res.Message);
          }
        } else {
          refNotification.current.showNotification(
            "warning",
            "Chọn khóa học trước khi lưu"
          );
        }
      }
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

  const getRowId = () => {
    return refDynamicTable.current.getRowId();
  };
  return (
    <>
      <CNotification ref={refNotification} />
      <div className="row">
        <div className="col-sm-7">
          <ACard
            title={CongTacVienForm.DataGrid.Title}
            buttonGroups={ButtonGroupsRender()}
          >
            <CDynamicTable
              ref={refDynamicTable}
              id={CongTacVienForm.DataGrid.Key}
              key={CongTacVienForm.DataGrid.Key}
              columnDefs={CongTacVienForm.DataGrid.ColumnDefs}
              dataItems={state.DataItem}
            />
          </ACard>
        </div>
        <div className="col-sm-5">
          <ACard title={""} buttonGroups={() => {}}>
            <CDynamicForm
              ref={refDynamicForm}
              // options={}
              initValues={state.ItemKhoaHoc}
              formDefs={FormInputCTV}
              actionEvents={ActionEvents}
            />
          </ACard>
        </div>
      </div>
    </>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(CongTacForm);
