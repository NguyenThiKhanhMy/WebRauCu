import CDynamicForm from "components/CDynamicForm";
import CNotification from "components/CNotification";
import { IResponseMessage } from "common/Models";
import { Message } from "common/Enums";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { connect } from "react-redux";
import { InitState } from "./InitState";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import ThanhToanFormInputJson from "./FormInput.json";
import ACard from "components/ACard";
import CDynamicTable from "components/CDynamicTable";
import CSelect from "components/CSelect";
import ListViewAnhJson from "./ListViewAnh.json";
import CButton from "components/CButton";

interface Props {
  Id: string;
  ReloadTableItems: any;
}

const ThanhToanForm = (props: Props) => {
  const [state, dispatch] = useReducer(Reducer, InitState);
  const [showSearch, setShowSearch] = useState(false);
  const [nhomAnh, setNhomAnh] = useState(null);
  const [dsNhomAnh, setDsNhomAnh] = useState([]);
  const refDynamicTableVideo = useRef<any>();


  useEffect(() => {
    Actions.GetItem(props.Id, dispatch);
  }, [props.Id]);
  useEffect(() => {
    var getNhomAnh = async () => {
      var DsNhomAnh = await Actions.GetDsNhomAnh(dispatch);
      setDsNhomAnh(DsNhomAnh);
    };
    getNhomAnh();
  }, []);
  let ThanhToanFormInput: any = ThanhToanFormInputJson;
  const refNotification = useRef<any>();
  const refDynamicForm = useRef<any>();
  const ActionEvents = {
    onClickSave: async () => {
      let isValid = refDynamicForm.current.onValidation();
      if (isValid) {
        let stateValues = refDynamicForm.current.getStateValues();
        let res: IResponseMessage = null;

        if (props.Id) {
          res = await Actions.UpdateItem(stateValues);
        } else {
          res = await Actions.CreateItem(stateValues);
        }
        if (res.Success) {
          refNotification.current.showNotification("success", res.Message);
          props.ReloadTableItems();
        }
      }
    },
  };

  const onClickDynamicForm = (key: any) => {
    if (key == "URL_AnhQRCode") {
      let stateValues = refDynamicForm.current.getStateValues();
      Actions.SaveState(stateValues, dispatch);
      setShowSearch(true);
    }
  };

  const ButtonGroupsRender = () => {
    return (
      <>
        <CButton
          icon={"check"}
          title={"Chọn Ảnh"}
          onClick={() => {
            if (!refDynamicTableVideo.current.getRowId()) {
              refNotification.current.showNotification(
                "warning",
                Message.Require_Row_Selection
              );
              return;
            }
            var item = refDynamicTableVideo.current.getRowSelected();
            Actions.setURL_Anh(item["0"][2], dispatch);
            setShowSearch(false);
          }}
        />
        <CButton
          icon={"d-arrow-left"}
          title="Quay lại"
          onClick={() => {
            setShowSearch(false);
            Actions.GetDsVideoByIdNhomAnh(null, dispatch);
          }}
        />
      </>
    );
  };
  const OnChangeNhomAnh = (e: any) => {
    Actions.GetDsVideoByIdNhomAnh(e, dispatch);
  };
  return (
    <>
      <CNotification ref={refNotification} />
      {showSearch && (
        <ACard title={"Tìm kiếm Ảnh"} buttonGroups={ButtonGroupsRender()}>
          <div className="row">
            <div className="col-sm-12">
              <CSelect
                key={"dsnhomanh"}
                value={nhomAnh}
                placeholder={`Danh sách nhóm ảnh`}
                filterable={true}
                multiple={false}
                options={dsNhomAnh}
                keyOptions={{ label: "Ten", value: "Id" }}
                onChange={(e: any) => {
                  OnChangeNhomAnh(e);
                }}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-12">
              <CDynamicTable
                ref={refDynamicTableVideo}
                id={ListViewAnhJson.DataGrid.Key}
                key={ListViewAnhJson.DataGrid.Key}
                columnDefs={ListViewAnhJson.DataGrid.ColumnDefs}
                dataItems={state.ItemAnhs}
              />
            </div>
          </div>
        </ACard>
      )}
      {!showSearch && (
        <CDynamicForm
          ref={refDynamicForm}
          onclick={onClickDynamicForm}
          initValues={state.DataItem}
          formDefs={ThanhToanFormInput}
          actionEvents={ActionEvents}
        />
      )}
    </>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(ThanhToanForm);
