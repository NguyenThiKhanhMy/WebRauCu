import React, { useEffect, useReducer, useRef, useState } from "react";
import { connect } from "react-redux";
import bg37 from "assets/img/bg37.png";
import bg38 from "assets/img/bg38.png";
import bg7 from "assets/img/bg7.png";
import { useHistory } from "react-router-dom";
import Comment from "../../Comment/HocThuComment/comment";
import { InitState } from "./InitState";
import { Actions } from "./Action";
import { Actions as GlobalActions } from "store/Global/Action";
import { Reducer } from "./Reducer";
import { useLocation } from "react-router-dom";
import { String } from "common/String";
import { IResponseMessage } from "common/Models";
import { LabelPortal, Message } from "common/Enums";
import CNotification from "components/CNotification";
const HtmlToReactParser = require("html-to-react").Parser;
const { v4: uuidv4 } = require("uuid");

const htmlToReactParser = new HtmlToReactParser();
interface Props {
  AddToCard: any;
}

const ChiTiet = (props: Props) => {
  const history = useHistory();
  const [change, setChange] = useState(1);
  const [state, dispatch] = useReducer(Reducer, InitState);
  const location = useLocation();
  const refNotification = useRef<any>();

  useEffect(() => {
    Actions.GetDetailKhoaHoc(location.state.id, dispatch);
    Actions.GetKhoaHocLienQuan(location.state.id, dispatch);
  }, []);

  const goToDangKyNgay = () => {
    var cartInfo = sessionStorage.getItem("cart-info");
    var cartExist = false;
    var arrCartInfo: any = [];
    if (cartInfo) {
      arrCartInfo = cartInfo.split(",");
      for (let i = 0; i < arrCartInfo.length; i++) {
        if (arrCartInfo[i] == state.DataDetail.Id) {
          cartExist = true;
        }
      }
    }
    if (!cartExist) {
      arrCartInfo.push(state.DataDetail.Id);
    }

    sessionStorage.setItem("cart-info", arrCartInfo.join(","));
    props.AddToCard(arrCartInfo.length);
    history.push("gio-hang");
  };

  const changeContent = (content: number) => {
    setChange(content);
  };

  const addToCard = async () => {
    var cartInfo = sessionStorage.getItem("cart-info");
    var cartExist = false;
    var arrCartInfo: any = [];
    if (cartInfo) {
      arrCartInfo = cartInfo.split(",");
      for (let i = 0; i < arrCartInfo.length; i++) {
        if (arrCartInfo[i] == state.DataDetail.Id) {
          cartExist = true;
        }
      }
    }
    if (!cartExist) {
      arrCartInfo.push(state.DataDetail.Id);
    }

    sessionStorage.setItem("cart-info", arrCartInfo.join(","));
    props.AddToCard(arrCartInfo.length);
    refNotification.current.showNotification("success", Message.Add_To_Cart);
  };

  const contentTab = () => {
    if (change == 1) {
      return (
        <div className="editor-content">
          {htmlToReactParser.parse(state.DataDetail.GioiThieu)}
        </div>
      );
    } else if (change == 2) {
      return (
        <div className="editor-content">
          {htmlToReactParser.parse(state.DataDetail.NoiDung)}
        </div>
      );
    }
  };
  const colorStar = (danhgia: number) => {
    return (
      <span>
        {[...Array(danhgia)].map(() => (
          <span key={uuidv4()}>
            <i className="bi bi-star-fill co-or" aria-hidden="true"></i>
            &nbsp;
          </span>
        ))}
      </span>
    );
  };

  const noColorStar = (danhgia: number) => {
    return (
      <span>
        {[...Array(5 - danhgia)].map(() => (
          <span key={uuidv4()}>
            <i className="bi bi-star co-or" aria-hidden="true"></i>
            &nbsp;
          </span>
        ))}
      </span>
    );
  };
  const goToThanhToan = () => {
    window.scrollTo(0, 0);
    history.push("/thanh-toan");
  };

  const goToHocPage = () => {
    window.scrollTo(0, 0);
    history.push({
      pathname: "/khoa-hoc-thu",
      state: { id: location.state.id },
      search: `/${location.state.id}`,
    });
  };

  const khoaHoc = state.DataItemsKhoaHoc && (
    <div className="row row-cols-1 row-cols-md-4 g-3 kt-round-dudat">
      {state.DataItemsKhoaHoc.map((item: any) => (
        <div
          key={uuidv4()}
          title={`${item.TieuDe}`}
          className="col-sm-4 change-tt-aba"
        >
          <div className="card card_main_container wrapper_c">
            <div className="wrapper_card">
              <img
                src={String.fileUrl(item.URL_AnhDaiDien)}
                className="card-img-top"
                alt="..."
              />
            </div>

            <div className="card-body card-bodys start-aib-aba">
              <p className="card-title  underline-head-tt">{item.TieuDe}</p>
              <p className=" card-text">
                {LabelPortal.ThoiHan} <b>{item.ThoiHan}</b> tháng
              </p>
              {item.ThoiHanTruyCapMienPhi &&
              item.ThoiHanTruyCapMienPhi !== 0 ? (
                <p className=" card-text">
                  {LabelPortal.MienPhiTruyCap}{" "}
                  <b>{item.ThoiHanTruyCapMienPhi}</b> tháng
                </p>
              ) : (
                <></>
              )}
              <p className="mb-1 mt-1">
                <span className="star-rate">
                  {colorStar(item.TyLeDanhGia)}
                  {noColorStar(item.TyLeDanhGia)}
                </span>
              </p>
              <p className=" card-text text-fanms">
                <span className="ractboi">
                  {item.HocPhiGoc != 0 ? (
                    <span>
                      {item.HocPhiGoc > item.HocPhiGiamGia ? (
                        <span>{String.num(item.HocPhiGiamGia)}</span>
                      ) : (
                        <span>{String.num(item.HocPhiGoc)}</span>
                      )}
                    </span>
                  ) : (
                    <span className={`decrease`}>Miễn phí</span>
                  )}
                </span>
                {item.HocPhiGiamGia <= item.HocPhiGoc &&
                  item.HocPhiGoc != 0 && <span className="ractboi">₫</span>}
                {item.HocPhiGiamGia < item.HocPhiGoc &&
                  item.HocPhiGoc != 0 &&
                  item.HocPhiGiamGia != 0 && (
                    <span className="duboi-aiau-stop">
                      {String.num(item.HocPhiGoc)}₫
                    </span>
                  )}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <CNotification ref={refNotification} />
      <img src={bg37} width="100%" height="auto" />
      <div className="main_course_detail">
        <div
          id="main_course_detail_before"
          className="container-xl justify-content-between"
        >
          <div className="row">
            <div className="col-sm-8 mb-3">
              <div className="card-chi-tiet-khoa-hoc">
                <h4 className="text-danger tieu-de">
                  {state.DataDetail.TieuDe}
                </h4>
                <img
                  className="mb-2 aspect-dudide"
                  width="100%"
                  src={String.fileUrl(state.DataDetail.URL_AnhChiTiet)}
                />
                <div className="d-flex gap-4">
                  <p
                    onClick={() => changeContent(1)}
                    className={`${change == 1 ? "doContent" : "unDoContent"}`}
                  >
                    GIỚI THIỆU
                  </p>
                  <p
                    onClick={() => changeContent(2)}
                    className={`${change == 2 ? "doContent" : "unDoContent"}`}
                  >
                    NỘI DUNG KHÓA HỌC
                  </p>
                </div>

                {contentTab()}
              </div>
            </div>

            <div className="col-sm-4">
              <div className="card-gio-hang mb-3">
                <h4 className="tieu-de tieu-de-card text-center">
                  Thông tin khóa học
                </h4>
                <div className="thon-tin-mua-hang">
                  <p className="mb-1">
                    <i className="bi bi-clock" />
                    &ensp; {LabelPortal.ThoiHan}{" "}
                    <b>{state.DataDetail.ThoiHan}</b> tháng
                  </p>
                  <p className="mb-1">
                    <i className="text-danger bi bi-fire" />
                    &ensp; {LabelPortal.MienPhiTruyCap}{" "}
                    <b>{state.DataDetail.ThoiHanTruyCapMienPhi}</b> tháng
                  </p>
                  <p className="mb-1">
                    <i className="bi bi-box2-heart" />
                    &ensp; {state.DataDetail.TrangThai ? "Đang mở" : "Đã đóng"}
                  </p>
                  <p className="mb-1">
                    <i className="bi bi-telephone-fill text-success" />
                    &ensp; Liên hệ: 091 658 2783
                  </p>
                  <p className="mb-2">
                    <i className="bi bi-cash"></i>&ensp;{" "}
                    {state.DataDetail.HocPhiGoc <=
                    state.DataDetail.HocPhiGiamGia ? (
                      <span className="text-danger text-didboi">
                        {String.num(state.DataDetail.HocPhiGoc)}đ
                      </span>
                    ) : (
                      <span className="text-danger text-didboi">
                        {String.num(state.DataDetail.HocPhiGiamGia)}đ
                      </span>
                    )}{" "}
                    {state.DataDetail.HocPhiGoc >
                      state.DataDetail.HocPhiGiamGia && (
                      <span className="losn-th">
                        {String.num(state.DataDetail.HocPhiGoc)}đ
                      </span>
                    )}
                  </p>
                  <div className="d-flex justify-content-center align-items-center flex-column">
                    <div className="d-flex mb-2">
                      <button
                        onClick={() => {
                          goToDangKyNgay();
                        }}
                        className="btn btn-danger header_btn"
                      >
                        Mua ngay
                      </button>
                      &ensp;
                      <button
                        onClick={() => {
                          addToCard();
                        }}
                        className="btn btn-outline-danger header_btn_outline"
                      >
                        Thêm vào giỏ hàng
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        goToHocPage();
                      }}
                      className="btn btn-link text-danger"
                    >
                      Học thử
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {state.DataItemsKhoaHoc.length > 0 && (
        <div className="container-xl">
          <div className="mb-3 card-chi-tiet-khoa-hoc">
            <h5 className="mb-2 text-uppercase do-bop-ava">
              KHÓA HỌC LIÊN QUAN
            </h5>
            {khoaHoc}
          </div>
        </div>
      )}
    </div>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {
  AddToCard: GlobalActions.AddToCard,
};

export default connect(mapState, mapDispatchToProps)(ChiTiet);
