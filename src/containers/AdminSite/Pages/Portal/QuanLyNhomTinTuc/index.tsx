import { CConfirm, CDialog, CNotification } from "components";
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
import TinTucListViewJson from "./ListView.json";
import { Reducer } from "./Reducer";
import TinTucForm from "./Form";
interface Props {}

const QuanLyNhomTinTuc = (props: Props) => {
  const [state, dispatch] = useReducer(Reducer, InitState);
  const TinTucId_Tree = useRef(Guid.Empty);
  const [TinTucId_List, setTreeTinTucId_List] = useState("");
  const TinTucListView: any = TinTucListViewJson;
  const refNotification = useRef<any>();
  const refConfirm_DeleteItem = useRef<any>();
  const refDynamicTable = useRef<any>();
  const [dialogVisible, setDialogVisible] = useState(false);
  useEffect(() => {
    Actions.GetTree(dispatch);
    Actions.GetItems(TinTucId_Tree.current, dispatch);
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
    onClickCreate: () => {
      setTreeTinTucId_List("");
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
      setTreeTinTucId_List(getRowId());
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
    Actions.GetItems(TinTucId_Tree.current, dispatch);
  };
  const getRowId = () => {
    return refDynamicTable.current.getRowId();
  };
  const ButtonGroupsRender = () => {
    return (
      <CDynamicButton
        actionDefs={TinTucListView.DataGrid.ActionDefs}
        actions={ActionEvents}
      />
    );
  };
  const RefeshTree = () => {
    Actions.GetTree(dispatch);
  };
  const ButtonGroupsRender_TreeTinTuc = () => {
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
    TinTucId_Tree.current = data.Id;
    Actions.GetItems(data.Id, dispatch);
  };
  const DialogMemo = useMemo(() => {
    return (
      <>
        {dialogVisible == true ? (
          <CDialog
            title={TinTucId_List ? "Sửa nhóm tin tức" : "Tạo mới nhóm tin tức"}
            dialogVisible={dialogVisible}
            onCancel={() => setDialogVisible(false)}
          >
            <TinTucForm
              Id={TinTucId_List}
              TreeId={TinTucId_Tree.current}
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
  return (
    <>
      <div className="row">
        <div className="col-sm-4">
          <ACard
            title={"Cây nhóm tin tức"}
            buttonGroups={ButtonGroupsRender_TreeTinTuc()}
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
            Title="Thao tác này sẽ xóa tin tức này"
            Ok={async () => {
              await DeleteById();
            }}
            Canel={() => {}}
          />
          <CNotification ref={refNotification} />
          {DialogMemo}
          <ACard
            title={TinTucListView.DataGrid.Title}
            buttonGroups={ButtonGroupsRender()}
          >
            <CDynamicTable
              ref={refDynamicTable}
              id={TinTucListView.DataGrid.Key}
              key={TinTucListView.DataGrid.Key}
              columnDefs={TinTucListView.DataGrid.ColumnDefs}
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

export default connect(mapState, mapDispatchToProps)(QuanLyNhomTinTuc);
