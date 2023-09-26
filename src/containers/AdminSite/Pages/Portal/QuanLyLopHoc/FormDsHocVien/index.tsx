import {
  CConfirm,
  CDialog,
  CNotification,
  CDynamicTable,
  CDynamicButton,
  CButton,
  CDynamicForm,
  CCheckbox,
} from "components";
import ACard from "components/ACard";
import { Message } from "common/Enums";
import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { connect } from "react-redux";
import { InitState } from "./InitState";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import HocVienListViewJson from "./ListView.json";
import LichSuHocVienJson from "./ListViewLichSu.json";
import FormInput from "./FormInput.json";
import { IResponseMessage, IUserInfo } from "common/Models";
import { Storage } from "common/Storage";

interface Props {
  Id: any;
  TenKhoaHoc: any;
}

const HocVienList = (props: Props) => {
  const [state, dispatch] = useReducer(Reducer, InitState);
  const [show, setShow] = useState(0);
  const HocVienListView: any = HocVienListViewJson;
  const refNotification = useRef<any>();
  const refDynamicaTable = useRef<any>();
  const refDynamicaTableLichSu = useRef<any>();
  const refDynamicForm = useRef<any>();
  const refConfirm_DeleteItem = useRef<any>();
  const [initNhanXet, setInitNhanXet] = useState({
    noiDungNhanXet: "",
    chamDiem: 0,
  });
  const [search, setSearch] = useState({
    KiemTra: false,
    QuanTrong: false,
  });
  const [id, setId] = useState("");
  const [idNhanXet, setIdNhanXet] = useState("");
  let userInfo: IUserInfo = JSON.parse(Storage.getSession("UserInfo"));

  const HocVien_ButtonGroupsRender = () => {
    if (show == 0) {
      let buttons = [];
      buttons.push(
        <CButton
          key={"LichSuHoc"}
          title="Lịch sử học"
          onClick={() => {
            XemLichSuHoc();
          }}
        ></CButton>
      );
      buttons.push(
        <CButton
          key={"XoaHocVien"}
          title="Xóa học viên"
          onClick={() => {
            refConfirm_DeleteItem.current.showConfirm();
          }}
        ></CButton>
      );

      return buttons;
    }
    if (show == 1) {
      let buttons = [];
      buttons.push(
        <CButton
          key={"QuayLai"}
          title="Quay lại"
          onClick={() => {
            setShow(0);
          }}
        ></CButton>
      );
      buttons.push(
        <CButton
          key={"NhanXet"}
          title="Nhận xét"
          onClick={() => {
            XemNhanXet();
            setIdNhanXet(getRowIdLichSu());
          }}
        ></CButton>
      );
      return buttons;
    }
  };
  const XoaHocVien = async () => {
    if (!getRowId()) {
      refNotification.current.showNotification(
        "warning",
        Message.Require_Row_Selection
      );
      return;
    }
    let res: IResponseMessage = await Actions.XoaHocVien(props.Id, getRowId(), dispatch)
    if (res && res.Success) {
      Actions.GetItem(props.Id, dispatch);
      refNotification.current.showNotification("success", res.Message);
    }
  };
  const XemLichSuHoc = () => {
    if (!getRowId()) {
      refNotification.current.showNotification(
        "warning",
        Message.Require_Row_Selection
      );
      return;
    }
    setShow(1);
    setId(getRowId());
  };
  const XemNhanXet = () => {
    if (!getRowIdLichSu()) {
      refNotification.current.showNotification(
        "warning",
        Message.Require_Row_Selection
      );
      return;
    }
    let data: any = state.DataItemLichSu.find(
      (value: any) => value.Id == getRowIdLichSu()
    );
    setInitNhanXet({
      noiDungNhanXet: data.NoiDungNhanXet,
      chamDiem: data.Diem,
    });
    setShow(2);
  };
  const getRowId = () => {
    return refDynamicaTable.current.getRowId();
  };
  const getRowIdLichSu = () => {
    return refDynamicaTableLichSu.current.getRowId();
  };

  useEffect(() => {
    if (search.KiemTra && search.QuanTrong) {
      Actions.Search("all", dispatch)
    }
    if (search.KiemTra && !search.QuanTrong) {
      Actions.Search("kiemtra", dispatch)
    }
    if (!search.KiemTra && search.QuanTrong) {
      Actions.Search("quantrong", dispatch)
    }
    if (show == 1 && !search.KiemTra && !search.QuanTrong) {
      let data = state.DataItemHocVien.find((value: any) => value.Id == id);
      Actions.GetItemLichSu(data.UserName, dispatch);
    }
    if (!show) {
      Actions.GetItem(props.Id, dispatch);
    }
  }, [search, props.Id, show])

  const ActionEvents = {
    onClickSave: async () => {
      let isValid = refDynamicForm.current.onValidation();
      if (isValid) {
        let stateValues = refDynamicForm.current.getStateValues();
        let res: IResponseMessage = null;

        if (props.Id) {
          res = await Actions.CreateItem(
            stateValues,
            idNhanXet,
            userInfo.UserName
          );
        }

        if (true) {
          refNotification.current.showNotification("success", res.Message);
        }
      }
    },
    onClickBack: async () => {
      setShow(1);
    },
  };

  const setQuanTrong = (e: any) => {
    setSearch({
      ...search,
      ["QuanTrong"]: !search.QuanTrong,
    });
  };

  const setKiemTra = (e: any) => {
    setSearch({
      ...search,
      ["KiemTra"]: !search.KiemTra,
    });
  };

  return (
    <>
      <CConfirm ref={refConfirm_DeleteItem} Title="Thao tác này sẽ xóa học viên này" Ok={async () => { await XoaHocVien(); }} Canel={() => { }} />
      <CNotification ref={refNotification} />
      {show == 0 ? (
        <div>
          <div className="row">
            <div className="col-sm-6 text-left">
              <b>{props.TenKhoaHoc}</b>
            </div>
            <div className="col-sm-6 text-right">
              {HocVien_ButtonGroupsRender()}
              <hr />
            </div>
          </div>
          <CDynamicTable
            ref={refDynamicaTable}
            id={HocVienListView.DataGrid.Key}
            key={HocVienListView.DataGrid.Key}
            columnDefs={HocVienListView.DataGrid.ColumnDefs}
            dataItems={state.DataItemHocVien}
          />
        </div>
      ) : (
        <></>
      )}
      {show == 1 ? (
        <div>
          <div className="row">
            <div className="col-sm-6 text-left">
              <b>{props.TenKhoaHoc}</b>
            </div>
            <div className="col-sm-6 text-right">
              {HocVien_ButtonGroupsRender()}
              <hr />
            </div>
          </div>
          <ACard title={"Bộ lọc"}>
            <div className="row">
              <div className="col-6">
                <CCheckbox
                  label={"Quan trọng"}
                  value={search.QuanTrong}
                  onChange={(e: any) => {
                    setQuanTrong(e);
                  }}
                />
              </div>
              {/* <div className="col-6">
                <CCheckbox
                  label={"Kiểm tra"}
                  value={search.KiemTra}
                  onChange={(e: any) => {
                    setKiemTra(e);
                  }}
                />
              </div> */}
            </div>
          </ACard>
          <CDynamicTable
            ref={refDynamicaTableLichSu}
            id={LichSuHocVienJson.DataGrid.Key}
            key={LichSuHocVienJson.DataGrid.Key}
            columnDefs={LichSuHocVienJson.DataGrid.ColumnDefs}
            dataItems={state.DataItemLichSu}
          />
        </div>
      ) : (
        <></>
      )}
      {show == 2 ? (
        <div>
          <CDynamicForm
            ref={refDynamicForm}
            initValues={initNhanXet}
            formDefs={FormInput}
            actionEvents={ActionEvents}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(HocVienList);
