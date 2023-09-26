import React, {
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { connect } from "react-redux";
import { InitState } from "./InitState";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import GioHangFormInputJson from "./FormInput.json";
import CNotification from "components/CNotification";
import CButton from "components/CButton";
import CSelect from "components/CSelect";

interface Props {
  Id: string;
  ReloadTableItems: any
}

const GioHangForm = (props: Props) => {
  const [state, dispatch] = useReducer(Reducer, InitState); 
  const refNotification = useRef<any>();

  useEffect(() => {
    var GetItems = async () => {
      await Actions.GetItems(props.Id, dispatch);
    } 
    GetItems();
  }, []);

  const click = async () => {
    var itemSave:any = { idGioHang: props.Id, khoaHocs: [] };
    for(let i = 0;i < state.DataItem.length;i++)
    {
      itemSave.khoaHocs.push(          {
        idKhoaHoc: state.DataItem[i].IdKhoaHoc,
        caNhan: state.DataItem[i].caNhan
      })
    }
    let res = await Actions.SaveItem(itemSave);
    if(res && res.Success){
      refNotification.current.showNotification(
        "success",
        "kích hoạt thành công"
      );
      props.ReloadTableItems()
    }
  };
  const changeBox = (e:any, IdKhoaHoc:any) => {
    Actions.ChangeBox(e, IdKhoaHoc, dispatch)
  }
  const kichhoat =
    state.DataItem.length > 0 ? (
      state.DataItem.map((child: any, index: number) => {
        return (
          <div className="mb-3">
            <h6>
              {index + 1}. {child.TieuDeKhoaHoc}
            </h6>
            <CSelect
              // key={child.Id}
              options={[{value: true, label: "Cá nhân"}, {value: false, label: "Tập thể"}]}
              value={child.caNhan}
              filterable={false}
              clearable={false}
              onChange={(e: any) => {
                changeBox(e, child.IdKhoaHoc);
              }}
              multiple={false}
            />
          </div>
        );
      })
    ) : (
      <>Không có khóa học</>
    );

  return (
    <>
      <CNotification ref={refNotification} />
      {kichhoat}
      <div className="split-admin-site mb-3 mt-3"></div>
      <div className="modal-footer mb-1">
        <CButton
          title="Xác nhận"
          onClick={() => {
            click();
          }}
        />
      </div>
    </>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(GioHangForm);
