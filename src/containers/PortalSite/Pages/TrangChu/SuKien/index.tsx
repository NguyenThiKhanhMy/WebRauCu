import React, { useEffect, useReducer } from "react";
const { v4: uuidv4 } = require("uuid");
import { useHistory } from "react-router-dom";
import { InitState } from "./InitState";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import { connect } from "react-redux";
import loading from "assets/img/trang-chu.gif";
import { String } from "common/String";

interface Props {}

const SuKien = (props: Props) => {
  const history = useHistory();
  const [state, dispatch] = useReducer(Reducer, InitState);

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

  useEffect(() => {
    Actions.GetSuKien(dispatch);
  }, []);

  const suKien = state.DataItemsSuKien &&
    state.DataItemsSuKien.DanhSachSuKien.length > 0 && (
      <div className="main_sub_detal rout-zxa mb-2">
        <div className="container-xl d-flex flex-column">
          <h4 className="text-danger tieu-de">Sự kiện mới nhất</h4>
          <div className="container mt-3">
            <div className="row">
              {state.DataItemsSuKien.DanhSachSuKien.map((child: any) => (
                <div key={uuidv4()} className="col-sm-6">
                  <div className="card mb-2">
                    <div className="row">
                      <div className="col-md-6">
                        <img
                          loading="lazy"
                          src={String.fileUrl(child.URL_AnhDaiDien as string)}
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
                                  child.Id as string,
                                  child.Ten as string,
                                  "sukien"
                                )
                              }
                              style={{
                                textAlign: "start",
                              }}
                            >
                              {child.Ten}
                            </p>
                          </div>
                          <p
                            className="card-text mt-3"
                            style={{
                              fontSize: "0.9rem",
                              textAlign: "start",
                            }}
                          >
                            <i className="bi bi-geo-alt-fill" /> {child.DiaChi}
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
                              {String.day(child.ThoiGian)}
                            </span>
                            &emsp;
                            <span className="card-text">
                              <i className="bi bi-clock-fill" />{" "}
                              {String.time(child.ThoiGian)}
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
                            <b>
                              {child.GiaTien && child.GiaTien > 0
                                ? String.num(child.GiaTien) + " ₫"
                                : "miễn phí"}
                            </b>
                          </p>

                          {child.TrangThai == 0 ? (
                            <p className="text-danger cursor-pointer">
                              <i className="bi bi-hand-index-fill"></i>{" "}
                              <span style={{ fontWeight: "bold" }}>
                                Đăng ký
                              </span>
                            </p>
                          ) : child.TrangThai == 1 ? (
                            <p>
                              <span>
                                <img
                                  loading="lazy"
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
                                  loading="lazy"
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
              ))}
            </div>
          </div>
        </div>
      </div>
    );

  return <>{suKien}</>;
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(SuKien);
