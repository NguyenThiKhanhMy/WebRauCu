import CDynamicForm from 'components/CDynamicForm';
import CNotification from 'components/CNotification';
import { IResponseMessage } from 'common/Models';
import { Message } from 'common/Enums';
import React, { useEffect, useReducer, useRef, useState } from 'react'
import { connect } from "react-redux";
import { InitState } from './InitState';
import { Actions } from './Action';
import { Reducer } from './Reducer';
import NhomAnhFormInputJson from './FormInput.json';
import ACard from 'components/ACard';
import CDynamicTable from 'components/CDynamicTable';
import ListViewAnhJson from "./ListViewAnh.json";
import CSelect from 'components/CSelect';
import CButton from 'components/CButton';
interface Props {
  Id: string,
  ReloadTableItems: any,
}

const NhomAnhForm = (props: Props) => {
  const [state, dispatch] = useReducer(Reducer, InitState);
  const [showSearch, setShowSearch] = useState(false);
  const refDynamicTableAnh = useRef<any>();
  const [nhomAnh, setNhomAnh] = useState(null);
  const [dsNhomAnh, setDsNhomAnh] = useState([]);
  const URL_AnhGioiThieu_Ref = useRef<any>()
  useEffect(() => {
    Actions.GetItem(props.Id, dispatch);
  }, [props.Id])
  useEffect(() => {
    var getNhomAnh = async () => {
      var DsNhomAnh = await Actions.GetDsNhomAnh(dispatch);
      setDsNhomAnh(DsNhomAnh);
    };
    getNhomAnh();
  }, []);
  let NhomAnhFormInput: any = NhomAnhFormInputJson;
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
        }
        else {
          res = await Actions.CreateItem(stateValues);
        }
        if (res.Success) {
          refNotification.current.showNotification("success", res.Message);
          props.ReloadTableItems();
        }
      }
    },
  }
  const onClickDynamicForm = (key: any) => {
    URL_AnhGioiThieu_Ref.current = key;
    if (key == "URL_AnhGioiThieu1") {
      let stateValues = refDynamicForm.current.getStateValues();
      Actions.SaveState(stateValues, dispatch);
      setShowSearch(true);
    }
    if (key == "URL_AnhGioiThieu2") {
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
            if (!refDynamicTableAnh.current.getRowId()) {
              refNotification.current.showNotification(
                "warning",
                Message.Require_Row_Selection
              );
              return;
            }
            var item = refDynamicTableAnh.current.getRowSelected();
            if(URL_AnhGioiThieu_Ref.current == "URL_AnhGioiThieu1")
            {
              Actions.SetURL_AnhGioiThieu1(item["0"][2], dispatch);
            }
            if(URL_AnhGioiThieu_Ref.current == "URL_AnhGioiThieu2")
            {
              Actions.SetURL_AnhGioiThieu2(item["0"][2], dispatch);
            }
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
                ref={refDynamicTableAnh}
                id={ListViewAnhJson.DataGrid.Key}
                key={ListViewAnhJson.DataGrid.Key}
                columnDefs={ListViewAnhJson.DataGrid.ColumnDefs}
                dataItems={state.ItemAnhs}
              />
            </div>
          </div>
        </ACard>
      )}
      {!showSearch &&
        <CDynamicForm
          onclick={onClickDynamicForm}
          ref={refDynamicForm}
          options={state.Options}
          initValues={state.DataItem} 
          formDefs={NhomAnhFormInput} 
          actionEvents={ActionEvents} />
      }
    </>
  )
}
const mapState = ({ ...state }) => ({

});
const mapDispatchToProps = {

};

export default connect(mapState, mapDispatchToProps)(NhomAnhForm);