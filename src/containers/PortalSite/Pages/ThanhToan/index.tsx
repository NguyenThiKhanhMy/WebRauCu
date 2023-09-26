import React, { useEffect, useReducer, useRef, useState } from "react";
import { connect } from "react-redux";
import qr from "assets/img/QR.png";
import { useHistory, useLocation } from "react-router-dom";
import banner from "assets/img/banner.jpg";
import { Storage } from "common/Storage";
import { Actions as GlobalActions } from "store/Global/Action";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import { InitState } from "./InitState";
import { String } from "common/String";
import { IUserInfo } from "common/Models";
import CNotification from "components/CNotification";
import { Message } from "common/Enums";
const { v4: uuidv4 } = require("uuid");


interface Props {
  AddToCard: any;
}

const ThanhToan = (props: Props) => {
  let userInfo: IUserInfo = JSON.parse(Storage.getSession("UserInfo"));
  const refNotification = useRef<any>();
  const history = useHistory();
  const location = useLocation();
  const [xacNhanThanhCong, setXacNhanThanhCong] = useState(false);
  const [state, dispatch] = useReducer(Reducer, InitState);
  const XacNhan = async () => {
    let chiTietThanhToans = state.DataItem.map((child:any) => {
      return {
        idKhoaHoc: child.Id,
        hocPhiGoc: child.HocPhiGoc,
        hocPhiGiamGia: child.hocPhiGiamGia,
        thoiHan: 0,
        thoiHanTruyCapMienPhi: 0
      }
    })
    if(userInfo){
      let info = await Actions.GetInfor()
      let datas:any = {
        taiKhoan: info.Data.UserName,
        hoVaTenNguoiMua: info.Data.FullName,
        sdt: info.Data.Phone,
        email: info.Data.Email,
        soLuongKhoaHoc: state.Count,
        tongThanhToan: state.Total,
        chiTietThanhToans: chiTietThanhToans
      }
      let res = await Actions.GetXacNhanThanhToan(datas, dispatch)
      if(res.Data){
        Storage.removeSession("cart-info");
        props.AddToCard(0);
        setXacNhanThanhCong(true);
        refNotification.current.showNotification(
          "success",
          Message.XAC_NHAN_THANH_THOAN_THAT_BAI_B
        );
      }
      else{
        refNotification.current.showNotification(
          "warning",
          Message.XAC_NHAN_THANH_THOAN_THAT_BAI_A
        );
      }
    }
    else{
      let datas:any = {
        taiKhoan: "",
        hoVaTenNguoiMua: location.state.info.fullname,
        sdt: location.state.info.phone,
        email: location.state.info.email,
        soLuongKhoaHoc: state.Count,
        tongThanhToan: state.Total,
        chiTietThanhToans: chiTietThanhToans
      }
      let res = await Actions.GetXacNhanThanhToan(datas, dispatch)
      if(res.Data){
        Storage.removeSession("cart-info");
        props.AddToCard(0);
        setXacNhanThanhCong(true);
        refNotification.current.showNotification(
          "success",
          Message.XAC_NHAN_THANH_THOAN_THAT_BAI_B
        );        
      }
      else{
        refNotification.current.showNotification(
          "warning",
          Message.XAC_NHAN_THANH_THOAN_THAT_BAI_A
        );
      }
    }
  };

  const goToTrangChu = () => {
    history.push("/trang-chu");
    window.scrollTo(0, 0);
  };

  const goToGioHang = () => {
    history.push("/gio-hang");
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const output = location.state.arr.map((id: any) => ({ id }));
    Actions.GetGioHang(output, dispatch);
    Actions.GetThanhToan(dispatch)
  }, []);

  return (
    <div>
      <CNotification ref={refNotification} />
      {xacNhanThanhCong == false ? (
        <div
          style={{
            backgroundColor: "#eeeeee",
            padding: "30px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h4 className="text-danger text-center tieu-de mb-3">
            {"Thanh toán"}
          </h4>
          <div>
            <div style={{ borderRadius: "5px 5px", backgroundColor: "white" }}>
              <div className="p-4 pb-2">
                <div>
                  <span className="bold">Chi tiết đơn hàng:</span>{" "}
                  <span>{state.Count} sản phẩm</span>
                </div>
                {state.DataItem &&
                  state.DataItem.map((e: any, ie: any) => {
                    return (
                      <div key={uuidv4()} className="ItemListstyles">
                        <div className="list-container">
                          <div className="styles__FlexRow">
                            <div className="item-info">
                              <div className="item-info__qty p-1 px-2">{ie + 1}</div>
                              <div className="item-info__name p-1 px-2">
                                {e.TieuDe}
                              </div>
                            </div>
                            <div className="item-price p-1 px-2">{String.num(e.HocPhiGiamGia)} ₫</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                <div className="ItemListstyles">
                  <div className="item-info__qty p-1 px-2 text-end bold">
                    Tổng tiền{" "}
                    <span
                      className="text-danger bold"
                      style={{ fontSize: 23, marginLeft: 10 }}
                    >
                      {String.num(state.Total)} ₫
                    </span>
                  </div>
                </div>
                <h5 className="bold">Phương thức thanh toán</h5>
              </div>
              <div className="d-flex justify-content-center align-items-center p-4">
                <div
                  className="row p-4 pt-1 justify-content-center"
                  style={{
                    border: "1px solid rgb(238, 238, 238)",
                    borderRadius: "5px 5px",
                    maxWidth: "720px",
                  }}
                >
                  <div className="col-sm-4 text-muted p-2">Ngân hàng:</div>
                  <div className="col-sm-8 bold p-2">
                    {state.DataThanhToan && state.DataThanhToan.TenNganhang}
                  </div>
                  <div className="col-sm-4 text-muted p-2">Chủ thẻ:</div>
                  <div className="col-sm-8 bold p-2">{state.DataThanhToan && state.DataThanhToan.ChuThe}</div>
                  <div className="col-sm-4 text-muted p-2">
                    Nội dung chuyển khoản:
                  </div>
                  <div className="col-sm-8 bold p-2">
                  {state.DataThanhToan && state.DataThanhToan.NoiDungChuyenKhoan}
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h4 className=" text-center mb-3">Quét mã QR</h4>
                <img width="150" height="150" className="mb-5" src={state.DataThanhToan && state.DataThanhToan.URL_AnhQRCode} />
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center gap-3">
              <button
                onClick={() => {
                  goToGioHang();
                }}
                className=" bg-light text-danger mt-3"
                style={{
                  width: "120px",
                  border: "1px solid pink",
                  borderRadius: "5px 5px",
                  padding: "5px 0",
                }}
              >
                Quay lại
              </button>
              <button
                onClick={() => {
                  XacNhan();
                }}
                className=" bg-danger text-light mt-3"
                style={{
                  width: "120px",
                  border: "none",
                  borderRadius: "5px 5px",
                  padding: "5px 0",
                }}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-3 mb-5 text-center">
          <img src={banner} width="500" />
          <h4 className="text-danger mt-2 text-center tieu-de">
            {"Xác nhận thanh toán thành công !"}
          </h4>
          <p className="text-center">
            {"Đơn hàng của khách sẽ được chúng tôi xử lý"}
          </p>
          <p className="text-center">
            {"Những thắc mắc vui lòng liên hệ qua điện thoại"}
          </p>
          <button
            onClick={() => {
              goToTrangChu();
            }}
            className="text-center bg-light text-danger mt-2"
            style={{
              width: "120px",
              border: "1px solid pink",
              borderRadius: "5px 5px",
              padding: "5px 0",
            }}
          >
            Quay lại
          </button>
        </div>
      )}
    </div>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {
  AddToCard: GlobalActions.AddToCard,
};

export default connect(mapState, mapDispatchToProps)(ThanhToan);
