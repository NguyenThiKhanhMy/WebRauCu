import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { connect } from "react-redux";
import { InitState } from './InitState';
import { Actions } from './Action';
import { Reducer } from './Reducer';
import ACard from 'components/ACard';
import gioHangListViewJson from './ListView.json';
import CDynamicButton from 'components/CDynamicButton';
import CDynamicTable from 'components/CDynamicTable';
import CDialog from 'components/CDialog';
import FormGioHang from './FormGioHang';
import FormChiTietGioHang from './FormChiTietGioHang';
import ATab from 'components/ATab';
import FormKichHoat from './FormKichHoat';
import { Message } from 'common/Enums';
import CNotification from 'components/CNotification';
interface Props {

}

const GioHangList = (props: Props) => {  
    const [state, dispatch] = useReducer(Reducer, InitState);
    const [gioHangId, setGioHangId] = useState('');
    const gioHangListView:any = gioHangListViewJson;    
    const refDynamicTable = useRef<any>();
    const refNotification = useRef<any>();
    const [dialogVisible, setDialogVisible] = useState(false);
    const [change, setChagne] = useState(0);
    useEffect(() => {        
        Actions.GetItems(dispatch); 
    }, [])
    const ActionEvents = {
        onClickShow: () => {
            if (!getRowId()) {
                refNotification.current.showNotification(
                  "warning",
                  Message.Require_Row_Selection
                );
                return;
              }
            setGioHangId(getRowId());
            setDialogVisible(true)
            setChagne(1)
        },
        onClickActive: () => {
            if (!getRowId()) {
                refNotification.current.showNotification(
                  "warning",
                  Message.Require_Row_Selection
                );
                return;
              }
            setGioHangId(getRowId());
            setDialogVisible(true)
            setChagne(2)
        }
    }
    const getRowId = () => {        
        return refDynamicTable.current.getRowId();
    }
    let ButtonGroupsRender = () => {
        return <CDynamicButton actionDefs={gioHangListView.DataGrid.ActionDefs} actions={ActionEvents} />;
    }  
    const TabThongTinGioHangRender = () => {
        return <ATab key="KhoaHoc" activeName="ThongTinCoBan" onTabClick={() => {}}
        tabsPanel={[
            {label:"Thông tin cơ bản", name: "ThongTinCoBan", panel:<FormGioHang Id={gioHangId} ReloadTableItems={() => { Actions.GetItems(dispatch)}} />},
            {label:"Thông tin chi tiết", name: "ThongTinChiTiet", panel: <FormChiTietGioHang Id={gioHangId} ReloadTableItems={() => {}} />}
        ]} ></ATab>
    }
    const DialogMemo = useMemo(() => {
        return <>
        {dialogVisible == true ?
            <CDialog style={{width: "70%", top: "1%"}} title={"Xem giỏ hàng"} dialogVisible={dialogVisible} onCancel={() => {setDialogVisible(false); setChagne(0)}}>
                {TabThongTinGioHangRender()}
            </CDialog>
            :<div></div>
        }
        </>
    }, [dialogVisible])  

    const DialogMemos = useMemo(() => {
        return (
          <>
            {dialogVisible == true ? (
              <CDialog
                style={{ width: "35%", minWidth: "300px" }}
                title={"Kích hoạt khóa học"}
                dialogVisible={dialogVisible}
                onCancel={() =>  {setDialogVisible(false); setChagne(0)}}
              >
                <FormKichHoat ReloadTableItems={() => { Actions.GetItems(dispatch)}} Id={gioHangId} />
              </CDialog>
            ) : (
              <div></div>
            )}
          </>
        );
      }, [dialogVisible]);
    return(
        <>
            <CNotification ref={refNotification} />
            {change === 1 ? DialogMemo : change == 2 && DialogMemos}
            <ACard title={gioHangListView.DataGrid.Title} buttonGroups={ButtonGroupsRender()}>
                <CDynamicTable 
                    ref={refDynamicTable}
                    id={gioHangListView.DataGrid.Key} 
                    key={gioHangListView.DataGrid.Key} 
                    columnDefs={gioHangListView.DataGrid.ColumnDefs} 
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

export default connect(mapState, mapDispatchToProps)(GioHangList);