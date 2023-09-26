import { Guid, Message } from "common/Enums";
import ACard from "components/ACard";
import CButton from "components/CButton";
import CDynamicButton from "components/CDynamicButton";
import CDynamicForm from "components/CDynamicForm";
import CTree from "components/CTree";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { connect } from "react-redux";
import FormGiaoAnLyThuyetJson from "./FormInput.json";
import FormImport from "./FormImport.json";
import ListViewVideoJson from "./ListViewVideo.json";
import { InitState } from "./InitState";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import { IResponseMessage } from "common/Models";
import CNotification from "components/CNotification";
import CConfirm from "components/CConfirm";
import CSelect from "components/CSelect";
import CDynamicTable from "components/CDynamicTable";
import ListViewAnhJson from "./ListViewAnh.json";

interface Props {
  khoaHocId: any;
}

const FormGiaoAnLyThuyet = (props: Props) => {
  const [state, dispatch] = useReducer(Reducer, InitState);
  const MenuId_Tree = useRef(Guid.Empty);
  const refDynamicForm = useRef<any>();
  const refNotification = useRef<any>();
  const refConfirm_DeleteItem = useRef<any>();
  const refDynamicFormChuyen = useRef<any>();
  const reff = useRef<any>();
  const refConfirm_DeleteItems = useRef<any>();
  const [Loai, setLoai] = useState(100);
  let FormGiaoAnLyThuyet: any = FormGiaoAnLyThuyetJson;
  let ListViewVideo: any = ListViewVideoJson;
  const [showSearchVideo, setShowSearchVideo] = useState(false);
  const [dsNhomVideo, setDsNhomVideo] = useState([]);
  const [nhomVideo, setNhomVideo] = useState(null);
  const [popup, setPopup] = useState(false);
  const refDynamicTableVideo = useRef<any>();
  const refDynamicTableVideo2 = useRef<any>();
  const [expand, setExpand] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [nhomAnh, setNhomAnh] = useState(null);
  const [dsNhomAnh, setDsNhomAnh] = useState([]);

  // const [expand, setExpand] = useState(false);
  const [arr, setArr] = useState([]);
  useEffect(() => {
    if (props.khoaHocId && props.khoaHocId != Guid.Empty) {
      Actions.GetTree(props.khoaHocId, dispatch);
    }
    var getNhomVideo = async () => {
      var DsNhomVideo = await Actions.GetDsNhomVideo(dispatch);
      setDsNhomVideo(DsNhomVideo);
    };
    getNhomVideo();
  }, []);

  useEffect(() => {
    if (showSearch) {
      Actions.GetTreeList(dispatch);
    }
  }, [showSearch]);

  const RemoveHightlightToRootElement = () => {
    let nodes: any = document.getElementsByClassName("el-tree-node__content");
    for (let i = 0; i < nodes.length; i++) {
      var element = nodes[i];
      element.classList.remove("highlight-current");
    }
  };
  const onNodeClicked = (data: any, node: any) => {
    MenuId_Tree.current = data.Id;
    if (data.Loai >= 0) {
      if (data.Id != Guid.Empty) {
        RemoveHightlightToRootElement();
        setLoai(data.Loai);

        Actions.GetItem(data.Id, dispatch);
      } else {
        refDynamicForm.current.setFirstSubmit(false);
        Actions.RefeshItem(dispatch);
      }
    } else {
      setLoai(100);
    }
  };
  const RefeshTree = () => {
    if (props.khoaHocId && props.khoaHocId != Guid.Empty) {
      Actions.GetTree(props.khoaHocId, dispatch);
      // setExpand(true)
    }
  };

  const DeleteAll = async () => {
    if (MenuId_Tree.current == Guid.Empty) {
      refNotification.current.showNotification(
        "warning",
        "Vui lòng chọn trước !"
      );
      return;
    } else {
      if (props.khoaHocId && props.khoaHocId != Guid.Empty) {
        let id = MenuId_Tree.current;
        let res = await Actions.DeleteTree(id, dispatch);
        if (res && res.Success) {
          Actions.GetTree(props.khoaHocId, dispatch);
        }
      }
    }
  };
  const ActionEvents = {
    onClickSaveImport: async () => {
      let isValid = refDynamicFormChuyen.current.onValidation();
      if (
        isValid &&
        MenuId_Tree.current != Guid.Empty &&
        Loai == 0 &&
        state.ItemChuyen.Id
      ) {
        let stateValues = refDynamicFormChuyen.current.getStateValues();
        let res: IResponseMessage = null;
        res = await Actions.GetImportFile(
          state.ItemChuyen.Id,
          props.khoaHocId,
          MenuId_Tree.current
        );

        if (res.Success) {
          refNotification.current.showNotification("success", res.Message);
          setPopup(false);
          await Actions.GetTree(props.khoaHocId, dispatch);
        }
      }
      if (MenuId_Tree.current == Guid.Empty) {
        refNotification.current.showNotification(
          "warning",
          "Chưa chọn giáo án"
        );
      }
      if (Loai != 0) {
        refNotification.current.showNotification(
          "warning",
          "Chỉ chuyển được loại giáo án "
        );
      }
      if (!state.ItemChuyen.Id) {
        refNotification.current.showNotification(
          "warning",
          "Không tìm thấy khóa học"
        );
      }
    },
    onClickImport: async () => {
      setPopup(true);
    },
    onClickCopy: async () => {
      var res: IResponseMessage = await Actions.CopyItem(
        props.khoaHocId,
        MenuId_Tree.current,
        dispatch
      );
      if (res.Success) {
        refNotification.current.showNotification("success", res.Message);
        RefeshTree();
      }
    },
    onClickRefesh: () => {
      refDynamicForm.current.setFirstSubmit(false);
      Actions.RefeshItem(dispatch);
    },
    onClickUpdate: async () => {
      if (!props.khoaHocId) {
        refNotification.current.showNotification(
          "warning",
          "Vui lòng tạo mới khóa học trước !"
        );
        return;
      }
      let isValid = refDynamicForm.current.onValidation();
      if (isValid) {
        let stateValues = refDynamicForm.current.getStateValues();
        let res: IResponseMessage = await Actions.UpdateItem(
          stateValues,
          dispatch
        );
        if (res.Success) {
          RefeshTree();
          refNotification.current.showNotification("success", res.Message);
        }
      }
    },
    onClickAppend: async () => {
      if (!props.khoaHocId) {
        refNotification.current.showNotification(
          "warning",
          "Vui lòng tạo mới khóa học trước !"
        );
        return;
      }
      let isValid = refDynamicForm.current.onValidation();
      if (isValid) {
        let stateValues = refDynamicForm.current.getStateValues();
        stateValues.Id = Guid.Empty;
        stateValues.IdGiaoAnLyThuyet = MenuId_Tree.current;
        let res: IResponseMessage = await Actions.CreateItemWithKhoaHoc(
          stateValues,
          props.khoaHocId,
          dispatch
        );
        if (res.Success) {
          refNotification.current.showNotification("success", res.Message);
          RefeshTree();
        }
      }
    },
    onClickRemove: () => {
      if (!MenuId_Tree.current) {
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
    let res: IResponseMessage = await Actions.DeleteById(
      MenuId_Tree.current,
      dispatch
    );
    if (res.Success) {
      refNotification.current.showNotification("success", res.Message);
      RefeshTree();
    }
  };
  // const ButtonGroupsRender = () => {
  //   return <CDynamicButton actionDefs={FormGiaoAnLyThuyet.ActionDefs} actions={ActionEvents} />;
  // }
  const ButtonGroupsRender_TreeMenu = () => {
    return (
      <>
        <CButton
          title="Làm mới"
          onClick={() => {
            RefeshTree();
          }}
        />
        {props.khoaHocId && (
          <CButton
            title="Xóa"
            onClick={() => {
              refConfirm_DeleteItems.current.showConfirm();
            }}
          />
        )}
      </>
    );
  };
  const ButtonGroupsRender_Video = () => {
    return (
      <>
        <CButton
          icon={"check"}
          title="Chọn Video"
          onClick={() => {
            if (!refDynamicTableVideo.current.getRowId()) {
              refNotification.current.showNotification(
                "warning",
                Message.Require_Row_Selection
              );
              return;
            }
            var item = refDynamicTableVideo.current.getRowSelected();
            Actions.setURL_VideoGiaoAnLyThuyet(item["0"][3], dispatch);
            setShowSearchVideo(false);
          }}
        />
        <CButton
          icon={"d-arrow-left"}
          title="Quay lại"
          onClick={() => {
            setShowSearchVideo(false);
            Actions.GetDsVideoByIdNhomVideo(null, dispatch);
          }}
        />
      </>
    );
  };

  const ButtonGroupsRender_Import = () => {
    return (
      <>
        <CButton
          icon={"d-arrow-left"}
          title="Quay lại"
          onClick={() => {
            setPopup(false);
          }}
        />
      </>
    );
  };
  const onClickDynamicForm = (key: any) => {
    if (key == "URL_Video") {
      let stateValues = refDynamicForm.current.getStateValues();
      Actions.SaveState(stateValues, dispatch);
      setShowSearchVideo(true);
    }
  };
  const OnChangeNhomVideo = (e: any) => {
    Actions.GetDsVideoByIdNhomVideo(e, dispatch);
  };
  const ButtonGroupsRender = () => {
    return (
      <>
        <CButton
          icon={"check"}
          title={"Chọn khóa học"}
          onClick={() => {
            if (!refDynamicTableVideo2.current.getRowId()) {
              refNotification.current.showNotification(
                "warning",
                Message.Require_Row_Selection
              );
              return;
            }
            var item = refDynamicTableVideo2.current.getRowSelected();
            Actions.setURL_Anh({ id: item["0"][1], ten: item["0"][0] }, dispatch);
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

  const onClickDynamicFormat = (key: any) => {
    if (key == "IdKhoaHocDes") {
      let stateValues = refDynamicFormChuyen.current.getStateValues();
      Actions.SaveState(stateValues, dispatch);
      setShowSearch(true);
    }
  };
  return (
    <>
      <CConfirm
        ref={refConfirm_DeleteItems}
        Title="Thao tác này sẽ xóa giáo án này"
        Ok={async () => {
          await DeleteAll();
        }}
        Canel={() => { }}
      />
      <CConfirm
        ref={refConfirm_DeleteItem}
        Title="Thao tác này sẽ xóa giáo án"
        Ok={async () => {
          await DeleteById();
        }}
        Canel={() => { }}
      />
      <CNotification ref={refNotification} />
      <div className="row">
        <div className="col-sm-5">
          <ACard
            title={"Danh sách giáo án lý thuyết"}
            buttonGroups={ButtonGroupsRender_TreeMenu()}
          >
            <CTree
              ref={reff}
              onNodeClicked={onNodeClicked}
              options={{ children: "Children", label: "Name" }}
              data={state.Tree}
              nodeKey={"Id"}
              defaultExpandedKeys={[Guid.Empty]}
              defaultExpandAll={true}
            />
          </ACard>
        </div>
        <div className="col-sm-7">
          {showSearchVideo ? (
            <ACard
              title={"Tìm kiếm Video"}
              buttonGroups={ButtonGroupsRender_Video()}
            >
              <div className="row">
                <div className="col-sm-12">
                  <CSelect
                    key={"dsnhomvideo"}
                    value={nhomVideo}
                    placeholder="Danh sách nhóm video"
                    filterable={true}
                    multiple={false}
                    options={dsNhomVideo}
                    keyOptions={{ label: "Ten", value: "Id" }}
                    onChange={(e: any) => {
                      OnChangeNhomVideo(e);
                    }}
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-sm-12">
                  <CDynamicTable
                    ref={refDynamicTableVideo}
                    id={ListViewVideo.DataGrid.Key}
                    key={ListViewVideo.DataGrid.Key}
                    columnDefs={ListViewVideo.DataGrid.ColumnDefs}
                    dataItems={state.ItemVideos}
                  />
                </div>
              </div>
            </ACard>
          ) : popup && props.khoaHocId ? (
            <ACard
              title={!showSearch ? "Chuyển giáo án" : "Tìm khóa học"}
              buttonGroups={
                !showSearch ? ButtonGroupsRender_Import() : ButtonGroupsRender()
              }
            >
              {showSearch && (
                <>
                  <div className="row">
                    <div className="col-sm-12">
                      <CDynamicTable
                        ref={refDynamicTableVideo2}
                        id={ListViewAnhJson.DataGrid.Key}
                        key={ListViewAnhJson.DataGrid.Key}
                        columnDefs={ListViewAnhJson.DataGrid.ColumnDefs}
                        dataItems={state.ItemAnhs}
                      />
                    </div>
                  </div>
                </>
              )}
              {!showSearch && (
                <CDynamicForm
                  ref={refDynamicFormChuyen}
                  initValues={state.ItemChuyen}
                  formDefs={FormImport}
                  actionEvents={ActionEvents}
                  onclick={onClickDynamicFormat}
                // options={state.Options}
                />
              )}
            </ACard>
          ) : (
            <ACard title={"Nhập thông tin giáo án lý thuyết"}>
              <CDynamicForm
                ref={refDynamicForm}
                options={[]}
                initValues={state.Item}
                formDefs={FormGiaoAnLyThuyet}
                actionEvents={ActionEvents}
                onclick={onClickDynamicForm}
              />
            </ACard>
          )}
        </div>
      </div>
    </>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(FormGiaoAnLyThuyet);
