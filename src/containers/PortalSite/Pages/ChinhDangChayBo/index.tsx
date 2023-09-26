import React, { useEffect, useReducer, useRef, useState } from "react";
import { connect } from "react-redux";
import loading from "assets/img/trang-chu.gif";
import { useHistory } from "react-router-dom";
import bg40 from "assets/img/Gioi-thieu.png";
import { InitState } from "./InitState";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import { Guid, Message } from "common/Enums";
import { String } from "common/String";
const { v4: uuidv4 } = require("uuid");
import ReactPaginate from "react-paginate";
import { IResponseMessage } from "common/Models";
import TuVanService from "services/TuVanService";
import CNotification from "components/CNotification";

interface Props {}

const ChinhDangChayBo = (props: Props) => {
  const [state, dispatch] = useReducer(Reducer, InitState);
  const history = useHistory();
  const [activeTab, setActiveTab] = useState("TatCa");
  const [show, setShow] = useState(false);
  const pa = useRef(null);
  const refNotification = useRef<any>();

  const [tuVan, setTuVan] = useState({
    Ten: "",
    GioiTinh: "0",
    Sdt: "",
    Email: "",
    NoiDung: "",
  });
  const ValidateFormTuVan = () => {
    if (!tuVan.Email) {
      refNotification.current.showNotification("warning", Message.TuVan_Wrong);
      return false;
    }
    if (!tuVan.GioiTinh) {
      refNotification.current.showNotification("warning", Message.TuVan_Wrong);
      return false;
    }
    if (!tuVan.NoiDung) {
      refNotification.current.showNotification("warning", Message.TuVan_Wrong);

      return false;
    }
    if (!tuVan.Sdt) {
      refNotification.current.showNotification("warning", Message.TuVan_Wrong);
      return false;
    }
    if (!tuVan.Ten) {
      refNotification.current.showNotification("warning", Message.TuVan_Wrong);
      return false;
    }
    return true;
  };
  useEffect(() => {
    Actions.GetLoaiKhoaHocHoatDongPortal(dispatch);
    Actions.getSuKienPortal(Guid.Empty, dispatch);
    Actions.getSapDienRa(dispatch);
  }, []);
  const sendTuVan = async () => {
    if (ValidateFormTuVan()) {
      let res: IResponseMessage = await TuVanService.CreateItem(tuVan);
      if (res && res.Success) {
        refNotification.current.showNotification("success", res.Message);
        setTuVan({ Email: "", GioiTinh: "0", NoiDung: "", Sdt: "", Ten: "" });
        document.querySelectorAll("input").forEach((item: any) => {
          item.value = "";
        });
        document.querySelector("textarea").value = "";
      }
    }
  };

  const popup = () => {
    setShow(!show);
  };

  const onChangeTab = (e: any, ie: any) => {
    Actions.getSuKienPortal(e.Id, dispatch);
    setActiveTab(e.Ma);
    state.Count > 0 && (pa.current.state.selected = 0);
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
      search: `/${type}`,
    });
    window.scrollTo(0, 0);
  };

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * 10) % state.Count;
    Actions.GetSuKienChangePortal(newOffset, newOffset + 10, dispatch);
  };

  const onChangeFormTuVan = (key: string, e: any) => {
    setTuVan({
      ...tuVan,
      [key]: e,
    });
  };

  return (
    <div>
      <CNotification ref={refNotification} />

      <div className="wrapper_img">
        <img className="" src={bg40} width="100%" height="auto" alt="..."/>
        <h1
          className="reszex"
          style={{ whiteSpace: "nowrap", fontSize: "4.6rem" }}
        >
          CHỈNH DÁNG CHẠY BỘ
        </h1>
      </div>
      {show && (
        <div className="show_su_kien_dien_ra">
          <div
            onClick={() => {
              popup();
            }}
            className="hide_su_kien"
          ></div>
          <div className="main_show_su_kien">
            <div className="d-flex justify-content-between">
              <h4
                className="text-danger tieu-de"
                style={{ wordWrap: "break-word" }}
              >
                ĐĂNG KÍ TƯ VẤN MIỄN PHÍ
              </h4>
              <i
                className="bi bi-x-lg text-danger cursor-pointer"
                onClick={() => {
                  popup();
                }}
              ></i>
            </div>

            <div className="input-group flex-nowrap mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Họ và Tên(*)"
                aria-label="Username"
                aria-describedby="addon-wrapping"
                onChange={(e: any) => {
                  onChangeFormTuVan("Ten", e.target.value);
                }}
              />
            </div>
            <p className="mt-3" style={{ fontWeight: "bold" }}>
              Giới tính
            </p>
            <div className="form-check form-check-inline dd-aa-aba">
              <input
                className="tt-ds-asa-ava"
                type="radio"
                name="inlineRadioOptions"
                id="gender1"
                checked={tuVan.GioiTinh == "0" ? true : false}
                defaultValue="option1"
                onChange={(e: any) => {
                  onChangeFormTuVan("GioiTinh", "0");
                }}
              />
              <label className="form-check-label da-sac-scd" htmlFor="gender1">
                Nam
              </label>
            </div>
            <div className="form-check form-check-inline dd-aa-aba">
              <input
                className="tt-ds-asa-ava"
                type="radio"
                name="inlineRadioOptions"
                id="gender2"
                defaultValue="option2"
                onChange={(e: any) => {
                  onChangeFormTuVan("GioiTinh", "1");
                }}
              />
              <label className="form-check-label" htmlFor="gender2">
                Nữ
              </label>
            </div>
            <div className="form-check form-check-inline dd-aa-aba">
              <input
                className="tt-ds-asa-ava"
                type="radio"
                name="inlineRadioOptions"
                id="gender3"
                defaultValue="option2"
                onChange={(e: any) => {
                  onChangeFormTuVan("GioiTinh", "2");
                }}
              />
              <label className="form-check-label" htmlFor="gender3">
                Khác
              </label>
            </div>
            <div className="input-group flex-nowrap mt-2">
              <input
                type="text"
                className="form-control"
                placeholder="Số điện thoại(*)"
                aria-label="PhoneNumber"
                aria-describedby="addon-wrapping"
                onChange={(e: any) => {
                  onChangeFormTuVan("Sdt", e.target.value);
                }}
              />
            </div>
            <div className="input-group flex-nowrap mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Email(*)"
                aria-label="Email"
                aria-describedby="addon-wrapping"
                onChange={(e: any) => {
                  onChangeFormTuVan("Email", e.target.value);
                }}
              />
            </div>
            <div className="mt-3">
              <textarea
                className="form-control"
                rows={3}
                placeholder="Đặt câu hỏi của bạn tại đây ....(*)"
                defaultValue={""}
                onChange={(e: any) => {
                  onChangeFormTuVan("NoiDung", e.target.value);
                }}
              />
            </div>
            <p
              className="mt-3 text-danger"
              style={{
                fontSize: "calc(1rem * 0.8)",
                textAlign: "justify",
                fontStyle: "italic",
                fontWeight: "bold",
              }}
            >
              (*): Thông tin bắt buộc
            </p>
            <div className="d-flex justify-content-center align-items-center">
              <button
                onClick={() => {
                  sendTuVan();
                }}
                className="header_btn bg-danger text-light mt-3"
                style={{ width: "120px" }}
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container-xl d-flex justify-content-between sk-head mb-3 sk-lom">
        <div className="d-flex sukiee-monl">
          <div className="hex4">
            <i className="bi bi-calendar4-week"></i>
          </div>
          <div className="sk-head-middle">
            <h5 className="text-sk-heade-fa text-danger">
              Sự kiện sắp diễn ra
            </h5>
            <h5 className="text-sk-heade-fa">
              {state.ItemsDienRa && state.ItemsDienRa.Ten}
            </h5>
          </div>
          <div className="sk-head-middle text-overrid-head sk-lampart">
            <h5 className="text-sk-heade-fa amc text-danger">Diễn ra vào :</h5>
            <h5
              className="text-sk-heade-fa amc kamc"
              style={{ marginLeft: "8px" }}
            >
              Ngày
              <span className="change-head-sk-text">
                {String.DateTime(state.ItemsDienRa.ThoiGian, "day")}
              </span>{" "}
              Tháng{" "}
              <span className="change-head-sk-text">
                {String.DateTime(state.ItemsDienRa.ThoiGian, "month")}
              </span>{" "}
              Năm{" "}
              <span className="change-head-sk-text">
                {String.DateTime(state.ItemsDienRa.ThoiGian, "year")}
              </span>{" "}
              {/* Giờ{" "} */}
              {/* <span className="change-head-sk-text">{String.DateTime(state.ItemsDienRa.ThoiGian, "minute")}</span> Phút */}
            </h5>
          </div>
        </div>
        <div className="sk-right-heade">
          <button
            onClick={() => {
              popup();
            }}
            className="sk-btn-head"
          >
            Đăng ký ngay
          </button>
        </div>
      </div>

      {/* <div className="container-xl">
        <div className="container-khoa-hoc khoa-hoc-header justify-content-between">
          <div className={`kh-search-bar`}>
            <span>
              <i className={`bi bi-search`}></i>
            </span>

            <input placeholder="Tìm kiếm" className="kh-input" />
          </div>
          <div className="kh-contain-result">
            Tìm thấy <span className="kh-result">10</span> kết quả
          </div>
        </div>
      </div>

      <div className="sk-menu-bar">
        <div className="container-xl d-flex gap-3">
          <div className="hex3">
            <i className="bi bi-heart-fill"></i>
          </div>
          <div className="d-flex align-items-center">
            <h5 className="sk-active-ab">Kỹ Thuật</h5>
          </div>
          <div className="d-flex align-items-center">
            <h5 className="sk-unactive-ab">Rèn luyện</h5>
          </div>
          <div className="d-flex align-items-center">
            <h5 className="sk-unactive-ab">Chia sẻ</h5>
          </div>
        </div>
      </div> */}
      <div className="main_sub_detal" style={{ padding: 0 }}>
        <div className="container-xl">
          <div className="row nhom-su-kien mt-3 mb-3">
            <div className="col-sm-12">
              <ul className="nav nav-tabs">
                {state.ItemsNhomSuKien.map((e: any, ie: any) => {
                  return (
                    <li
                      key={uuidv4()}
                      className="nav-item"
                      onClick={() => {
                        onChangeTab(e, ie);
                      }}
                    >
                      <span
                        className={
                          "nav-link " + (e.Ma == activeTab ? "active" : "")
                        }
                      >
                        {e.Ten}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="row">
            {state.ItemsSuKien.map((e: any, ie: any) => {
              return (
                <div key={uuidv4()} className="col-sm-6">
                  <div className="card mb-3 p-0">
                    <div className="row g-0">
                      <div className="col-md-6">
                        <img
                          src={String.fileUrl(e.URL_AnhDaiDien as string)}
                          style={{
                            width: "100%",
                            height: "191px",
                            borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5,
                          }}
                          alt="..."
                        />
                      </div>
                      <div className="col-md-6">
                        <div className="card-body p-2">
                          <div className="d-flex">
                            <p
                              className="card-title titleXl head_z underline-head-tt text-uppercase"
                              onClick={() =>
                                GoToDetailPage(
                                  "/chi-tiet-tin-tuc",
                                  e.Id as string,
                                  e.Ten as string,
                                  "sukien"
                                )
                              }
                              style={{
                                textAlign: "start"
                              }}
                            >
                              {e.Ten}
                            </p>
                          </div>
                          <p
                            className="card-text mt-3"
                            style={{
                              fontSize: "0.9rem",
                              textAlign: "start",
                            }}
                          >
                            <i className="bi bi-geo-alt-fill" /> {e.DiaChi}
                          </p>
                          <div
                            className="mt-2"
                            style={{
                              fontSize: "0.9rem",
                              textAlign: "start",
                            }}
                          >
                            <span className="card-text">
                              <i className="bi bi-calendar-range-fill" />{" "}
                              {String.day(e.ThoiGian)}
                            </span>
                            &emsp;
                            <span className="card-text">
                              <i className="bi bi-clock-fill" />{" "}
                              {String.time(e.ThoiGian)}
                            </span>
                          </div>
                          <p
                            className="card-text mt-2 mb-2"
                            style={{
                              fontSize: "0.9rem",
                              textAlign: "start",
                            }}
                          >
                            <i className="bi bi-cash-stack" />{" "}
                            <b>{e.GiaTien && e.GiaTien > 0  ? String.num(e.GiaTien) + " ₫" : "miễn phí"}</b>
                          </p>

                          {e.TrangThai == 0 ? (
                            <p className="text-danger cursor-pointer">
                              <i className="bi bi-hand-index-fill"></i>{" "}
                              <span style={{ fontWeight: "bold" }}>
                                Đăng ký
                              </span>
                            </p>
                          ) : e.TrangThai == 1 ? (
                            <p>
                              <span>
                                <img
                                  style={{ width: "30px", height: "30px" }}
                                  src={loading}
                                  alt="..."
                                />
                              </span>
                              <span
                                className="text-danger"
                                style={{ fontWeight: "bold" }}
                              >
                                Đang diễn ra
                              </span>

                              <span>
                                <img
                                  style={{ width: "30px", height: "30px" }}
                                  src={loading}
                                  alt="..."
                                />
                              </span>
                            </p>
                          ) : (
                            <p>
                              <i className="bi bi-x-circle-fill"></i>{" "}
                              <span
                                className="text-dark"
                                style={{ fontWeight: "bold" }}
                              >
                                Đã diễn ra
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="d-flex justify-content-center pagi-kh-os align-items-center mt-3">
              {state.Count && Math.ceil(state.Count / 10) > 0 ? (
                <ReactPaginate
                  ref={pa}
                  breakLabel="..."
                  nextLabel="Sau"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  pageCount={state.Count && Math.ceil(state.Count / 10)}
                  previousLabel="Trước"
                  className="pagination"
                  initialPage={0}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(ChinhDangChayBo);
