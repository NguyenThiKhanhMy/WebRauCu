import { CConfirm, CDialog, CNotification, CDynamicTable, CDynamicButton } from 'components';
import ACard from 'components/ACard';
import { Message } from 'common/Enums';
import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { connect } from "react-redux";
import { InitState } from './InitState';
import { Actions } from './Action';
import { Reducer } from './Reducer';
import congTacVienListViewJson from './ListView.json';
import CongTacVienForm from './Form'
import { IResponseMessage } from 'common/Models';
import FormCTVKhoaHoc from './FormCTVKhoaHoc';
import FormCTVKhoaHocInput from './FormCTVKhoaHocInput';

interface Props {

}

const QuanLyCongTacVien = (props: Props) => {  
    const [state, dispatch] = useReducer(Reducer, InitState)
    const [congTacVienId, setcongTacVienId] = useState('');
    const CongTacVienListView:any = congTacVienListViewJson;    
    const refNotification = useRef<any>();
    const refConfirm_DeleteItem = useRef<any>();
    const refDynamicTable = useRef<any>();
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogVisibleKhoaHoc, setDialogVisibleKhoaHoc] = useState(false)
    const [dialogVisibleKhoaHocBan, setDialogVisibleKhoaHocBan] = useState(false)

    useEffect(() => {        
        Actions.GetItems(dispatch);     
    }, [])
    const ActionEvents = {
        onClickOpen: () => {
            if(!getRowId()) { refNotification.current.showNotification("warning", Message.Require_Row_Selection); return; }
            setcongTacVienId(getRowId());
            setDialogVisibleKhoaHoc(true);    
        },
        onClickOpenCreate: () => {
            if(!getRowId()) { refNotification.current.showNotification("warning", Message.Require_Row_Selection); return; }
            setcongTacVienId(getRowId());
            setDialogVisibleKhoaHocBan(true);    
        },
        onClickCreate: () => {
            setcongTacVienId('');
            setDialogVisible(true);    
        },
        onClickUpdate: () => {
            if(!getRowId()) { refNotification.current.showNotification("warning", Message.Require_Row_Selection); return; }            
            setcongTacVienId(getRowId());
            setDialogVisible(true);            
        },
        onClickDelete: async () => {
            if(!getRowId()) { refNotification.current.showNotification("warning", Message.Require_Row_Selection); return; }
            refConfirm_DeleteItem.current.showConfirm();            
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
        return <CDynamicButton actionDefs={CongTacVienListView.DataGrid.ActionDefs} actions={ActionEvents} />;
    }    
    const DialogMemo = useMemo(() => {
        return <>
        {dialogVisible == true ?
            <CDialog style={{width: "50%"}} title={congTacVienId ? "Sửa cộng tác viên": "Tạo mới cộng tác viên"} dialogVisible={dialogVisible} onCancel={() => setDialogVisible(false)}>
                <CongTacVienForm Id={congTacVienId} ReloadTableItems = {ReloadTableItems} />
            </CDialog>
            :<div></div>
        }
        </>
    }, [dialogVisible])

    const DialogMemoKhoaHoc = useMemo(() => {
        return <>
        {dialogVisibleKhoaHoc == true ?
            <CDialog style={{width: "90%", top: "1%"}} title={"Danh sách khóa học đã bán"} dialogVisible={dialogVisibleKhoaHoc} onCancel={() => setDialogVisibleKhoaHoc(false)}>
                <FormCTVKhoaHoc Id={congTacVienId} ReloadTableItems = {ReloadTableItems} />
            </CDialog>
            :<div></div>
        }
        </>
    }, [dialogVisibleKhoaHoc])

    const DialogMemoKhoaHocBan = useMemo(() => {
        return <>
        {dialogVisibleKhoaHocBan == true ?
            <CDialog style={{width: "80%", top: "1%"}} title={"Bán khóa học"} dialogVisible={dialogVisibleKhoaHocBan} onCancel={() => setDialogVisibleKhoaHocBan(false)}>
                <FormCTVKhoaHocInput Id={congTacVienId} ReloadTableItems = {ReloadTableItems} />
            </CDialog>
            :<div></div>
        }
        </>
    }, [dialogVisibleKhoaHocBan])

    return(
        <>
            <CConfirm ref={refConfirm_DeleteItem} Title="Thao tác này sẽ xóa cộng tác viên này" Ok={async () => {await DeleteById()}} Canel={()=>{}} />
            <CNotification ref={refNotification} />   
            {DialogMemo}
            {DialogMemoKhoaHoc}
            {DialogMemoKhoaHocBan}
            <ACard title={CongTacVienListView.DataGrid.Title} buttonGroups={ButtonGroupsRender()}>
                <CDynamicTable 
                    ref={refDynamicTable}
                    id={CongTacVienListView.DataGrid.Key} 
                    key={CongTacVienListView.DataGrid.Key} 
                    columnDefs={CongTacVienListView.DataGrid.ColumnDefs} 
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

export default connect(mapState, mapDispatchToProps)(QuanLyCongTacVien);