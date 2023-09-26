import React, { useEffect, useReducer, useRef, useState } from 'react'
import { connect } from "react-redux";
import { InitState } from './InitState';
import { Actions } from './Action';
import { Reducer } from './Reducer';
import ChiTietGioHangListViewJson from './ListView.json';
import CDynamicTable from 'components/CDynamicTable';
import ACard from 'components/ACard';
import CButton from 'components/CButton';
import CInput from 'components/CInput';
import CNotification from 'components/CNotification';
import { Guid, Message } from 'common/Enums';
import { IResponseMessage } from 'common/Models';
interface Props {
  Id: string;
  ReloadTableItems: any
}

const ChiTietGioHangForm = (props: Props) => {  
  const [state, dispatch] = useReducer(Reducer, InitState);
  const chiTietGioHangListView:any = ChiTietGioHangListViewJson;  
  const refDynamicTable = useRef<any>();
  const refNotification = useRef<any>();
  const [khoaHoc, setKhoaHoc] = useState({ Id: Guid.Empty, TieuDeKhoaHoc: "", ThoiHanTruyCapMienPhi: 0 });
  useEffect(() => {
    Actions.GetItems(props.Id, dispatch); 
  }, [])
  const onClickRowTable = (id:any) => {
    for(let i = 0;i < state.DataItems.length;i++)
    {
      if(state.DataItems[i].Id == id)
      {
        setKhoaHoc({
          Id: state.DataItems[i].Id,
          TieuDeKhoaHoc: state.DataItems[i].TieuDeKhoaHoc,
          ThoiHanTruyCapMienPhi: state.DataItems[i].ThoiHanTruyCapMienPhi
        })
      }
    }
  }
  return(
    <>
        <CNotification ref={refNotification} /> 
        <ACard title={ChiTietGioHangListViewJson.DataGrid.Title} buttonGroups={() => {}}>
          <div className="mb-2">
            <div className="row">
              <div className="col-sm-12">
                <b>{khoaHoc.TieuDeKhoaHoc}</b>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <CInput type="text" placeholder="Thời hạn truy cập miễn phí" 
                        onChange={(e:any) => { setKhoaHoc({...khoaHoc, ThoiHanTruyCapMienPhi: e}) }} 
                        value={khoaHoc.ThoiHanTruyCapMienPhi} 
                        />
              </div>
              <div className="col-sm-4">
                <CButton onClick={async () => {
                  if(khoaHoc.Id == Guid.Empty)
                  {
                    refNotification.current.showNotification("warning", Message.Require_Row_Selection);  
                    return;
                  }
                  if(isNaN(khoaHoc.ThoiHanTruyCapMienPhi))
                  {
                    refNotification.current.showNotification("warning", "Vui lòng nhập giá trị là số");  
                    return;
                  }
                  var res: IResponseMessage = await Actions.ChangeThoiHanTruyCap(khoaHoc);
                  if(res.Success)
                  {
                    refNotification.current.showNotification("success", Message.Response_Success);  
                    Actions.GetItems(props.Id, dispatch); 
                  }
                }} title="Thay đổi thời hạn truy cập" />
              </div>
            </div>
          </div>
          <CDynamicTable 
                onRowClick={(id:any) => { onClickRowTable(id); }} 
                ref={refDynamicTable}
                id={chiTietGioHangListView.DataGrid.Key} 
                key={chiTietGioHangListView.DataGrid.Key} 
                columnDefs={chiTietGioHangListView.DataGrid.ColumnDefs} 
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

export default connect(mapState, mapDispatchToProps)(ChiTietGioHangForm);