import { CConfirm, CDialog, CNotification, CDynamicTable, CDynamicButton } from 'components';
import ACard from 'components/ACard';
import { Message } from 'common/Enums';
import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { connect } from "react-redux";
import { InitState } from './InitState';
import { Actions } from './Action';
import { Reducer } from './Reducer';
import tinTucListViewJson from './ListView.json';
import TinTucForm from './Form'
import { IResponseMessage } from 'common/Models';
import FormBinhLuan from './FormBinhLuan';

interface Props {

}

const TinTucList = (props: Props) => {  
    const [state, dispatch] = useReducer(Reducer, InitState)
    const [tinTucId, settinTucId] = useState('');
    const TinTucListView:any = tinTucListViewJson;    
    const refNotification = useRef<any>();
    const refConfirm_DeleteItem = useRef<any>();
    const refDynamicTable = useRef<any>();
    const [dialogVisible, setDialogVisible] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {        
        Actions.GetItems(dispatch);     
    }, [])
    const ActionEvents = {
        onClickCreate: () => {
            settinTucId('');
            setDialogVisible(true);    
        },
        onClickUpdate: () => {
            if(!getRowId()) { refNotification.current.showNotification("warning", Message.Require_Row_Selection); return; }            
            settinTucId(getRowId());
            setDialogVisible(true);            
        },
        onClickDelete: async () => {
            if(!getRowId()) { refNotification.current.showNotification("warning", Message.Require_Row_Selection); return; }
            refConfirm_DeleteItem.current.showConfirm();            
        },
        onClickBL: () => {
            if (!getRowId()) {
              refNotification.current.showNotification(
                "warning",
                Message.Require_Row_Selection
              );
              return;
            }
            settinTucId(getRowId());
            setVisible(true);
          },
    }
    const DeleteById = async () => {
        let res:IResponseMessage = await Actions.DeleteById(getRowId(),dispatch);             
        if(res.Success) {            
            refNotification.current.showNotification("success", res.Message);          
            ReloadTableItems();
        }  
    }
    const ReloadTableItems = () => {
        Actions.GetItems(dispatch);  
    }
    const getRowId = () => {        
        return refDynamicTable.current.getRowId();
    }
    let ButtonGroupsRender = () => {
        return <CDynamicButton actionDefs={TinTucListView.DataGrid.ActionDefs} actions={ActionEvents} />;
    }    
    const DialogMemo = useMemo(() => {
        return <>
        {dialogVisible == true ?
            <CDialog style={{width: "80%", top: "5%"}} title={tinTucId ? "Sửa tin tức": "Tạo mới tin tức"} dialogVisible={dialogVisible} onCancel={() => setDialogVisible(false)}>
                <TinTucForm Id={tinTucId} ReloadTableItems = {ReloadTableItems} />
            </CDialog>
            :<div></div>
        }
        </>
    }, [dialogVisible])
    const DialogBLMemo = useMemo(() => {
        return (
          <>
            {visible == true ? (
              <CDialog
                style={{ width: "95%", top: "5%" }}
                title={"Danh sách bình luận tin tức"}
                dialogVisible={visible}
                onCancel={() => setVisible(false)}
              >
                <FormBinhLuan Id={tinTucId} ReloadTableItems={ReloadTableItems}/>
              </CDialog>
            ) : (
              <div></div>
            )}
          </>
        );
      }, [visible]);
    return(
        <>
            <CConfirm ref={refConfirm_DeleteItem} Title="Thao tác này sẽ xóa tin tức này" Ok={async () => {await DeleteById()}} Canel={()=>{}} />
            <CNotification ref={refNotification} />   
            {DialogMemo}
            {DialogBLMemo}
            <ACard title={TinTucListView.DataGrid.Title} buttonGroups={ButtonGroupsRender()}>
                <CDynamicTable 
                    ref={refDynamicTable}
                    id={TinTucListView.DataGrid.Key} 
                    key={TinTucListView.DataGrid.Key} 
                    columnDefs={TinTucListView.DataGrid.ColumnDefs} 
                    dataItems={state.DataItems}            
                />
            </ACard>
        </>
    )
}
const mapState = ({ ...state }) => ({

});
const mapDispatchToProps = {
  
};

export default connect(mapState, mapDispatchToProps)(TinTucList);