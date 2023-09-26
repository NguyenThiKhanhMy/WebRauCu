import { CConfirm, CDialog, CDynamicForm, CNotification } from "components";
import ACard from "components/ACard";
import CButton from "components/CButton";
import CDynamicButton from "components/CDynamicButton";
import CDynamicTable from "components/CDynamicTable";
import CTree from "components/CTree";
import { IResponseMessage } from "common/Models";
import { AppName, Guid, Message } from "common/Enums";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { connect } from "react-redux";
import { Actions } from "./Action";
import { InitState } from "./InitState";
import MonHocListViewJson from "./ListView.json";
import FormInputChangeParentJson from "./FormInputChangeParent.json";
import { Reducer } from "./Reducer";
import MonHocForm from "./Form";
import { Tree } from "common/Tree";
interface Props {}

const QuanLyMonHoc = (props: Props) => {
  let formInputChangeParent: any = FormInputChangeParentJson;
  const [state, dispatch] = useReducer(Reducer, InitState);
  const MonHocId_Tree = useRef(Guid.Empty);
  const [MonHocId_List, setTreeMonHocId_List] = useState("");
  const MonHocListView: any = MonHocListViewJson;
  const refNotification = useRef<any>();
  const refConfirm_DeleteItem = useRef<any>();
  const refDynamicTable = useRef<any>();
  const refDynamicForm_ChangeParent = useRef<any>();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogVisible_ChangeParent, setDialogVisible_ChangeParent] = useState(false);
  useEffect(() => {
    Actions.GetTree(dispatch);
    Actions.GetItems(MonHocId_Tree.current, dispatch);
    AddHightlightToRootElement();
  }, []);
  const AddHightlightToRootElement = () => {
    let nodes: any = document.getElementsByClassName("el-tree-node__content");
    for (let i = 0; i < nodes.length; i++) {
      var element = nodes[i];
      element.classList.add("highlight-current");
    }
  };
  const RemoveHightlightToRootElement = () => {
    let nodes: any = document.getElementsByClassName("el-tree-node__content");
    for (let i = 0; i < nodes.length; i++) {
      var element = nodes[i];
      element.classList.remove("highlight-current");
    }
  };
  const ActionEvents = {
    onClickAccept: async () => {
      let isValid = refDynamicForm_ChangeParent.current.onValidation();
      if (isValid) {
        let stateValues = {...refDynamicForm_ChangeParent.current.getStateValues()};
        stateValues.ParentId = stateValues.ParentId[stateValues.ParentId.length - 1];
        var res:IResponseMessage = await Actions.ChangeParent(stateValues.Id, stateValues.ParentId, dispatch)
        if(res.Data && res.Success)
        {
          ReloadTableItems();
          refNotification.current.showNotification(
            "success",
            Message.Response_Success
          );
        }
      }
    },
    onChangeParent: () => {
      if (!getRowId()) {
        refNotification.current.showNotification(
          "warning",
          Message.Require_Row_Selection
        );
        return;
      }
      setDialogVisible_ChangeParent(true);
    },
    onClickCreate: () => {
      setTreeMonHocId_List("");
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
      setTreeMonHocId_List(getRowId());
      setDialogVisible(true);
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
    Actions.GetItems(MonHocId_Tree.current, dispatch);
  };
  const getRowId = () => {
    return refDynamicTable.current.getRowId();
  };
  const ButtonGroupsRender = () => {
    return (
      <CDynamicButton
        actionDefs={MonHocListView.DataGrid.ActionDefs}
        actions={ActionEvents}
      />
    );
  };
  const RefeshTree = () => {
    Actions.GetTree(dispatch);
  };
  const ButtonGroupsRender_TreeMonHoc = () => {
    return (
      <CButton
        title="Làm mới"
        onClick={() => {
          RefeshTree();
        }}
      />
    );
  };
  const onNodeClicked = (data: any, node: any) => {
    RemoveHightlightToRootElement();
    MonHocId_Tree.current = data.Id;
    Actions.GetItems(data.Id, dispatch);
  };
  const DialogMemo = useMemo(() => {
    return (
      <>
        {dialogVisible == true ? (
          <CDialog
            style={{ width: "65%" }}
            title={MonHocId_List ? "Sửa môn học" : "Tạo mới môn học"}
            dialogVisible={dialogVisible}
            onCancel={() => setDialogVisible(false)}
          >
            <MonHocForm
              Id={MonHocId_List}
              TreeId={MonHocId_Tree.current}
              TreeData={state.DataTree}
              ReloadTableItems={ReloadTableItems}
            />
          </CDialog>
        ) : (
          <div></div>
        )}
      </>
    );
  }, [dialogVisible]);
  const DialogMemo_ChangeParent = useMemo(() => {
    Tree.traverseClear(state.DataTree[0]);
    let options:any = [{ Key: "ParentId", Options: state.DataTree[0].Children }];
    return (
      <>
        {dialogVisible_ChangeParent == true ? (
          <CDialog
            style={{ width: "40%" }}
            title={"Thay đổi vị trí"}
            dialogVisible={dialogVisible_ChangeParent}
            onCancel={() => setDialogVisible_ChangeParent(false)}
          >
            <CDynamicForm
              ref={refDynamicForm_ChangeParent}
              initValues={{ Id: getRowId(), ParentId: [] }}
              options={options}
              formDefs={formInputChangeParent}
              actionEvents={ActionEvents}
            />
          </CDialog>
        ) : (
          <div></div>
        )}
      </>
    );
  }, [dialogVisible_ChangeParent, state.DataTree]);
  return (
    <>
      <div className="row">
        <div className="col-sm-4">
          <ACard
            title={"Cây môn học"}
            buttonGroups={ButtonGroupsRender_TreeMonHoc()}
          >
            <CTree
              onNodeClicked={onNodeClicked}
              options={{ children: "Children", label: "Name" }}
              data={state.DataTree}
              nodeKey={"Id"}
              defaultExpandedKeys={[Guid.Empty]}
            />
          </ACard>
        </div>
        <div className="col-sm-8">
          <CConfirm
            ref={refConfirm_DeleteItem}
            Title="Thao tác này sẽ xóa môn học này"
            Ok={async () => {
              await DeleteById();
            }}
            Canel={() => {}}
          />
          <CNotification ref={refNotification} />
          {DialogMemo}
          {DialogMemo_ChangeParent}
          <ACard
            title={MonHocListView.DataGrid.Title}
            buttonGroups={ButtonGroupsRender()}
          >
            <CDynamicTable
              ref={refDynamicTable}
              id={MonHocListView.DataGrid.Key}
              key={MonHocListView.DataGrid.Key}
              columnDefs={MonHocListView.DataGrid.ColumnDefs}
              dataItems={state.DataItems}
            />
          </ACard>
        </div>
      </div>
    </>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(QuanLyMonHoc);
