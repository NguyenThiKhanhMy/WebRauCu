import React, { useEffect, useReducer, useRef, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import { InitState } from "./InitState";
import { String } from "common/String";
import CNotification from "components/CNotification";
import { Message } from "common/Enums";
import { IUserInfo } from "common/Models";
import { Cookie } from "common/Cookie";
const { v4: uuidv4 } = require("uuid");
import { Storage } from "common/Storage";

interface Props { }
const GioHang = (props: Props) => {
  const history = useHistory();
  const [state, dispatch] = useReducer(Reducer, InitState);
  const [arr, setArr] = useState([]);
  const refNotification = useRef<any>();
  let userInfo: IUserInfo = JSON.parse(Storage.getSession("UserInfo"));
  const [Input, setInput] = useState({
    FullName: "",
    Email: "",
    Phone: "",
  });

  const onChangeCap = (e: any, name: any) => {
    setInput({
      ...Input,
      [name]: e.target.value
    })
  }
  const gotoThanhToan = () => {
    if (state.Totalpre > 0) {
      if (!userInfo) {
        if (Input.Email && Input.FullName && Input.Phone) {
          history.push({
            pathname: "/thanh-toan",
            state: { arr: arr, info: { fullname: Input.FullName, email: Input.Email, phone: Input.Phone } },
            search: uuidv4(),
          });
        }
        else {
          refNotification.current.showNotification(
            "warning",
            "Hãy điền đủ thông tin"
          );
        }
      }
      else {
        history.push({
          pathname: "/thanh-toan",
          state: { arr: arr },
          search: uuidv4(),
        });
      }


    } else {
      refNotification.current.showNotification(
        "warning",
        Message.XAC_NHAN_THANH_THOAN_THAT_BAI
      );
    }
  };

  const goToOtherPage = () => {
    history.push("dang-nhap");
  }

  useEffect(() => {
    var cartInfo = sessionStorage.getItem("cart-info");
    if (cartInfo) {
      const output = cartInfo.split(",").map((id) => ({ id }));
      Actions.GetGioHang(output, dispatch);
    }
  }, []);

  const deleteProduct = (id: String, ie: any) => {
    var cartInfo = sessionStorage.getItem("cart-info");
    if (cartInfo) {
      const output = cartInfo.split(",");
      let index = output.findIndex((val: any) => val == id);
      if (output.length > 1) {
        output[index] = output[0];
        output.shift();

        if (output.length === 1) {
          sessionStorage.setItem("cart-info", output[0].toString());
        } else {
          sessionStorage.setItem("cart-info", output.join(","));
        }
      } else {
        output.shift();
        sessionStorage.setItem("cart-info", "");
      }
      Actions.restore(ie, dispatch);
    }
  };

  const deleteAll = () => {
    sessionStorage.setItem("cart-info", "");
    Actions.GetGioHangs([], dispatch);
  };

  const onCheck = (
    e: any,
    ie: any,
    HocPhiGiamGia: any,
    HocPhiGoc: any,
    Id: any
  ) => {
    if (e.target.checked) {
      let check = arr.find((element) => element == Id);
      if (!check) {
        setArr([...arr, Id]);
      }
    } else {
      let index = arr.indexOf(Id);
      let data = arr;
      let temp = data[index];
      data[index] = data[0];
      data[0] = temp;
      data.shift();
      setArr(data);
    }
    Actions.ChangeData(
      e.target.checked,
      ie,
      HocPhiGiamGia,
      HocPhiGoc,
      dispatch
    );
  };

  const changeAll = (e: any) => {
    if (e.target.checked) {
      var cartInfo = sessionStorage.getItem("cart-info");
      if (cartInfo) {
        const output = cartInfo.split(",");
        setArr(output);
      }
    } else {
      setArr([]);
    }
    Actions.ChangeAll(e.target.checked, dispatch);
  };

  const GoToDetailPage = (
    page: string,
    id: string,
    search: string,
    type: string
  ) => {
    history.push({
      pathname: page,
      state: { id: id, type: type },
      search: `/${search}`,
    });
    window.scrollTo(0, 0);
  };

  return (
    <div className="mt-4">
      <CNotification ref={refNotification} />
      <h4 className="text-danger text-center tieu-de mb-3">{"Giỏ hàng"}</h4>

      <div className="container-xl mb-3">
        <div className="row">
          <div className="col-sm-8">
            <div className="row mb-2">
              <div className="card mb-2">
                <div
                  className="card-body"
                  style={{ paddingTop: 10, paddingBottom: 10 }}
                >
                  <div className="row">
                    <div className="col-sm-1">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckChecked"
                        onChange={(e) => changeAll(e)}
                        style={{ marginTop: 0 }}
                      />
                    </div>
                    <div className="col-sm-8 pl-0">
                      <p className="underline-head-tt">
                        Tất cả (<b>{state.Count}</b> sản phẩm)
                      </p>
                    </div>
                    <div className="col-sm-2 text-center">
                      <p className="text-danger">
                        <b>Giá tiền</b>
                      </p>
                    </div>
                    <div className="col-sm-1">
                      <div
                        className="text-muted remove cursor-pointer text-center"
                        onClick={() => {
                          deleteAll();
                        }}
                      >
                        <i className="bi bi-trash3"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  {state.DataItem &&
                    state.DataItem.map((data: any, ie: any) => {
                      return (
                        <div key={uuidv4()} className="row mb-3">
                          <div className="col-sm-1">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`${data.Id}`}
                              onChange={(e) => {
                                onCheck(
                                  e,
                                  ie,
                                  data.HocPhiGiamGia,
                                  data.HocPhiGoc,
                                  data.Id
                                );
                              }}
                              checked={data.Check}
                            />
                          </div>
                          <div className="col-sm-3 pl-0">
                            <img
                              src={String.fileUrl(data.URL_AnhDaiDien)}
                              className="img_card_tc"
                            />
                          </div>
                          <div className="col-sm-5 pr-0">
                            <p className="gio-hang-mg-top underline-head-tt" onClick={() =>
                              GoToDetailPage(
                                "/khoa-hoc-chi-tiet",
                                data.Id as string,
                                data.TieuDe as string,
                                "khoahoc"
                              )
                            }>
                              {data.TieuDe}
                            </p>
                          </div>
                          <div className="col-sm-2 text-center">
                            <p className="card-text gia-tien-kh-l marginBottom-5 gio-hang-mg-top">
                              <span>
                                <span>{String.num(data.HocPhiGiamGia)}₫</span>
                              </span>
                            </p>
                            <span className="gia-tien-giam-gias">
                              {String.num(data.HocPhiGoc)}₫
                            </span>
                          </div>
                          <div className="col-sm-1">
                            <div
                              className="text-muted remove gio-hang-mg-top cursor-pointer text-center"
                              onClick={() => {
                                deleteProduct(data.Id, ie);
                              }}
                            >
                              <i className="bi bi-trash3"></i>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="row">
              {!userInfo && (
                <div className="card">
                  <div
                    className="card-body"
                    style={{ paddingTop: 10, paddingBottom: 10 }}
                  >
                    <h4 className="text-center">Thông tin đăng ký</h4>
                    <div className="row">
                      <div className="input-group mb-2 dda-lb">
                        <label className="lb-fr lb-ada">
                          Họ và tên <span className="text-danger">(*)</span>
                          <input
                            type="text"
                            className="form-control lb-fr"
                            placeholder="Họ và tên"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={(e) => { onChangeCap(e, "FullName") }}
                          />
                        </label>
                      </div>
                      <div className="input-group mb-2 dda-lb">
                        <label className="lb-fr lb-ada ">
                          Email <span className="text-danger">(*)</span>
                          <input
                            type="text"
                            className="form-control lb-fr"
                            placeholder="Email"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={(e) => { onChangeCap(e, "Email") }}
                          />
                        </label>
                      </div>
                      <div className="input-group mb-3 dda-lb">
                        <label className="lb-fr lb-ada">
                          Điện thoại <span className="text-danger">(*)</span>
                          <input
                            type="text"
                            className="form-control lb-fr"
                            placeholder="Điện thoại"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={(e) => { onChangeCap(e, "Phone") }}
                          />
                        </label>
                      </div>
                      {/* <button className="lb-btna mb-2">Tiếp theo</button> */}
                      <h6 className="dda-lb text-end dda-text-lb"
                      >
                        Bạn đã có tài khoản? Hãy <a className="dda-a-text-lb" onClick={() => { goToOtherPage() }}>đăng nhập</a> để
                        nhận nhiều ưu đãi hơn.
                      </h6>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-sm-4">
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-12">
                        <p>
                          Tổng tiền: {"  "}
                          <span
                            className="gia-tien-kh-l"
                            style={{ fontSize: 26 }}
                          >
                            {String.num(state.Totalpre)}đ
                          </span>
                          {"  "}
                          {state.Totalpre != state.Totalnext && (
                            <span
                              className="gia-tien-giam-gias"
                              style={{ fontSize: 16 }}
                            >
                              {String.num(state.Totalnext)}₫
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="col-sm-12">
                        <button
                          style={{ width: "100%" }}
                          onClick={() => {
                            gotoThanhToan();
                          }}
                          className="header_btn bg-danger text-light mt-3"
                        >
                          THANH TOÁN
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(GioHang);
