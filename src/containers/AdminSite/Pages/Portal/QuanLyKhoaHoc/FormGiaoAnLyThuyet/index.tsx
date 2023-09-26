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
interface Props {
  khoaHocId: any;
}

const FormGiaoAnLyThuyet = (props: Props) => {
  const [state, dispatch] = useReducer(Reducer, InitState);
  const MenuId_Tree = useRef(Guid.Empty);
  const refDynamicForm = useRef<any>();
  const refNotification = useRef<any>();
  const refConfirm_DeleteItem = useRef<any>();
  const refConfirm_DeleteItems = useRef<any>();
  let FormGiaoAnLyThuyet: any = FormGiaoAnLyThuyetJson;
  let ListViewVideo: any = ListViewVideoJson;
  const [showSearchVideo, setShowSearchVideo] = useState(false);
  const [dsNhomVideo, setDsNhomVideo] = useState([]);
  const [nhomVideo, setNhomVideo] = useState(null);
  const [popup, setPopup] = useState(false);
  const refDynamicTableVideo = useRef<any>();
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
  const RemoveHightlightToRootElement = () => {
    let nodes: any = document.getElementsByClassName("el-tree-node__content");
    for (let i = 0; i < nodes.length; i++) {
      var element = nodes[i];
      element.classList.remove("highlight-current");
    }
  };
  const onNodeClicked = (data: any, node: any) => {
    if (data.Id != Guid.Empty) {
      RemoveHightlightToRootElement();
      MenuId_Tree.current = data.Id;
      Actions.GetItem(data.Id, dispatch);
    } else {
      refDynamicForm.current.setFirstSubmit(false);
      Actions.RefeshItem(dispatch);
    }
  };
  const RefeshTree = () => {
    if (props.khoaHocId && props.khoaHocId != Guid.Empty) {
      Actions.GetTree(props.khoaHocId, dispatch);
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
        if(res && res.Success){
          Actions.GetTree(props.khoaHocId, dispatch);
        }
      }
    }
  };
  const ActionEvents = {
    onClickSaveImport: async () => {
      let isValid = refDynamicForm.current.onValidation();
      if (isValid) {
        let stateValues = refDynamicForm.current.getStateValues();
        let res: IResponseMessage = null;
        res = await Actions.GetImportFile(stateValues, props.khoaHocId);

        if (res.Success) {
          refNotification.current.showNotification("success", res.Message);
        }
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
          refNotification.current.showNotification("success", res.Message);
          RefeshTree();
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
  return (
    <>
      <CConfirm ref={refConfirm_DeleteItems} Title="Thao tác này sẽ xóa giáo án này" Ok={async () => {await DeleteAll()}} Canel={()=>{}} />
      <CConfirm
        ref={refConfirm_DeleteItem}
        Title="Thao tác này sẽ xóa giáo án"
        Ok={async () => {
          await DeleteById();
        }}
        Canel={() => {}}
      />
      <CNotification ref={refNotification} />
      <div className="row">
        <div className="col-sm-5">
          <ACard
            title={"Danh sách giáo án lý thuyết"}
            buttonGroups={ButtonGroupsRender_TreeMenu()}
          >
            <CTree
              onNodeClicked={onNodeClicked}
              options={{ children: "Children", label: "Name" }}
              data={state.Tree}
              nodeKey={"Id"}
              defaultExpandedKeys={[Guid.Empty]}
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
                    filterable={false}
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
          ) : popup ? (
            <ACard
              title={"Gửi file"}
              buttonGroups={ButtonGroupsRender_Import()}
            >
              <CDynamicForm
                ref={refDynamicForm}
                options={[]}
                initValues={state.Item}
                formDefs={FormImport}
                actionEvents={ActionEvents}
                onclick={onClickDynamicForm}
              />
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
