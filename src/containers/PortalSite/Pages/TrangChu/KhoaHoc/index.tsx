import React, { useEffect, useReducer, useRef } from "react";
const { v4: uuidv4 } = require("uuid");
import { useHistory } from "react-router-dom";
import { IModelGen } from "./InitState";
import { InitState } from "./InitState";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import { connect } from "react-redux";
import { LabelPortal, Message } from "common/Enums";
import { String } from "common/String";
import { Actions as GlobalActions } from "store/Global/Action";
import CNotification from "components/CNotification";

interface Props {
  AddToCard: any;
}

const KhoaHoc = (props: Props) => {
  const history = useHistory();
  const [state, dispatch] = useReducer(Reducer, InitState);
  const refNotification = useRef<any>();

  const GoToDetailPage = (page: string, id: string, search: string) => {
    history.push({
      pathname: page,
      state: { id: id },
      search: `/${search}`,
    });
    window.scrollTo(0, 0);
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

  useEffect(() => {
    Actions.GetItemKhoaHoc(dispatch);
  }, []);

  const addToCard = async (Id: any) => {
    var cartInfo = sessionStorage.getItem("cart-info");
    var cartExist = false;
    var arrCartInfo: any = [];
    if (cartInfo) {
      arrCartInfo = cartInfo.split(",");
      for (let i = 0; i < arrCartInfo.length; i++) {
        if (arrCartInfo[i] == Id) {
          cartExist = true;
        }
      }
    }
    if (!cartExist) {
      arrCartInfo.push(Id);
    }

    sessionStorage.setItem("cart-info", arrCartInfo.join(","));
    props.AddToCard(arrCartInfo.length);
    refNotification.current.showNotification("success", Message.Add_To_Cart);
  };

  const khoaHoc =
    state.DataItemsKhoaHoc &&
    state.DataItemsKhoaHoc.map((tree: IModelGen) => (
      <div key={uuidv4()} className="khoi-khoahoc">
        {tree.DanhSachKhoaHoc.length > 0 && (
          <>
            <div className="main_sub_detal tieu-de-ava pt-0 mb-1">
              <div className="container d-flex flex-column">
                <h4 className="text-danger tieu-de tieude-avb ">
                  {tree.TenMonHoc}
                </h4>
                <div className="container uoy-tt mt-1">
                  <div className="row row-cols-1 row-cols-md-4 g-3 kt-round-dudat">
                    {tree.DanhSachKhoaHoc.map((item: any) => (
                      <div
                        key={uuidv4()}
                        title={`${item.TieuDe}`}
                        className="col-sm-4 change-tt-aba"
                      >
                        <div className="card card_main_container wrapper_c">
                          <div className="wrapper_card">
                            <img
                              loading="lazy"
                              src={String.fileUrl(item.URL_AnhDaiDien)}
                              className="card-img-top"
                              alt="..."
                            />
                            <button
                              onClick={() => {
                                addToCard(item.Id);
                              }}
                              className="button-5"
                            >
                              Thêm vào giỏ hàng
                            </button>
                          </div>

                          <div
                            className="card-body card-bodys"
                            style={{
                              textAlign: "start",
                            }}
                          >
                            <p
                              className="card-title  underline-head-tt"
                              onClick={() =>
                                GoToDetailPage(
                                  "/khoa-hoc-chi-tiet",
                                  item.Ma as string,
                                  item.Ma as string
                                )
                              }
                            >
                              {item.TieuDe}
                            </p>
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
                            <p
                              className=" card-text"
                              style={{
                                fontSize: "calc(1rem*.9)",
                                color: "grey",
                                fontWeight: "bold",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "calc(1rem * 1.1)",
                                  color: "rgba(255, 0, 0, 0.807)",
                                }}
                              >
                                {item.HocPhiGoc != 0 ? (
                                  <span>
                                    {item.HocPhiGoc > item.HocPhiGiamGia ? (
                                      <span>
                                        {String.num(item.HocPhiGiamGia)}
                                      </span>
                                    ) : (
                                      <span>{String.num(item.HocPhiGoc)}</span>
                                    )}
                                  </span>
                                ) : (
                                  <span className={`decrease`}>Miễn phí</span>
                                )}
                              </span>
                              {item.HocPhiGiamGia <= item.HocPhiGoc &&
                                item.HocPhiGoc != 0 && (
                                  <span
                                    style={{
                                      fontSize: "calc(1rem * 1.1)",
                                      color: "rgba(255, 0, 0, 0.807)",
                                    }}
                                  >
                                    ₫
                                  </span>
                                )}
                              {item.HocPhiGiamGia < item.HocPhiGoc &&
                                item.HocPhiGoc != 0 &&
                                item.HocPhiGiamGia != 0 && (
                                  <span
                                    style={{
                                      marginLeft: "8px",
                                      color: "gray",
                                      fontWeight: "300",
                                      textDecoration: "line-through",
                                    }}
                                  >
                                    {String.num(item.HocPhiGoc)}₫
                                  </span>
                                )}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    ));

  return (
    <>
      <CNotification ref={refNotification} />
      {khoaHoc}
    </>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {
  AddToCard: GlobalActions.AddToCard,
};

export default connect(mapState, mapDispatchToProps)(KhoaHoc);
