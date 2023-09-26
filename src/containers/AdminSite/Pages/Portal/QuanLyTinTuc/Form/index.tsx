import CDynamicForm from "components/CDynamicForm";
import CNotification from "components/CNotification";
import { IResponseMessage, IUserInfo } from "common/Models";
import { Message } from "common/Enums";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { connect } from "react-redux";
import { InitState } from "./InitState";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import TinTucFormInputJson from "./FormInput.json";
import { Cookie } from "common/Cookie";
import ACard from "components/ACard";
import CDynamicTable from "components/CDynamicTable";
import CSelect from "components/CSelect";
import CButton from "components/CButton";
import ListViewAnhJson from "./ListViewAnh.json";
import { Storage } from "common/Storage";

interface Props {
  Id: string;
  ReloadTableItems: any;
}

const TinTucForm = (props: Props) => {
  const [state, dispatch] = useReducer(Reducer, InitState);
  const [showSearch, setShowSearch] = useState(false);
  const refDynamicTableVideo = useRef<any>();
  const [dsNhomAnh, setDsNhomAnh] = useState([]);
  const [change, setChange] = useState(true);

  let userInfo: IUserInfo = JSON.parse(Storage.getSession("UserInfo"));

  useEffect(() => {
    Actions.GetItem(props.Id, dispatch);
    Actions.GetTreeList("IdNhomTinTuc", dispatch);

    if (!props.Id) {
      Actions.SetTacGia(userInfo.UserName, dispatch);
    }
  }, [props.Id]);
  useEffect(() => {
    var getNhomAnh = async () => {
      var DsNhomAnh = await Actions.GetDsNhomAnh(dispatch);
      setDsNhomAnh(DsNhomAnh);
    };
    getNhomAnh();
  }, []);
  let tinTucFormInput: any = TinTucFormInputJson;
  const refNotification = useRef<any>();
  const refDynamicForm = useRef<any>();
  const [nhomAnh, setNhomAnh] = useState(null);
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
  const OnChangeNhomAnh = (e: any) => {
    Actions.GetDsVideoByIdNhomAnh(e, dispatch);
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
  const onClickDynamicForm = (key: any) => {
    if (key == "URL_AnhDaiDien") {
      let stateValues = refDynamicForm.current.getStateValues();
      Actions.SaveState(stateValues, dispatch);
      setShowSearch(true);
    }
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
                filterable={false}
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
      {!showSearch && change && (
        <ACard title={""}>
          <CDynamicForm
            ref={refDynamicForm}
            options={state.Options}
            initValues={state.DataItem}
            formDefs={tinTucFormInput}
            actionEvents={ActionEvents}
            onclick={onClickDynamicForm}
          />
        </ACard>
      )}
    </>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(TinTucForm);
