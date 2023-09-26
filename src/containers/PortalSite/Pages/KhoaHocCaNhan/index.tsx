import React, { useEffect, useReducer, useRef, useState } from "react";
import { connect } from "react-redux";
import { InitState } from "./InitState";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import CNotification from "components/CNotification";
import { String } from "common/String";
import { useHistory } from "react-router-dom";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface Props {}

const CaNhan = (props: Props) => {
  const [state, dispatch] = useReducer(Reducer, InitState);
  const history = useHistory();
  const refNotification = useRef<any>();
  const percentage = 66;

  const GoToOtherPage = (
    page: string,
    id: string,
    search: string,
    IdLopHoc: any,
    IdMonHoc: any
  ) => {
    history.push({
      pathname: page,
      state: { id: id, IdLopHoc: IdLopHoc, IdMonHoc: IdMonHoc },
      search: `/${search}`,
    });
    window.scrollTo(0, 0);
  };

  const GoToChungChiPage = (Id:any, TieuDe: any) => {
    history.push({
      pathname: "/chung-chi",
      state: { id: Id, tieuDe: TieuDe},
      search: `/${Id}`,
    });
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    Actions.GetDachSachKhoaHoc(dispatch);
  }, []);


  return (
    <div>
      <CNotification ref={refNotification} />
      <div className="container-sm container-canhan">
        <div className="change4 mb-3">
          <h3>Khóa học cá nhân</h3>
          <p>Các khóa học bạn đã đăng ký sẽ được hiển thị ở phần này</p>
        </div>
        <div className="row row-cols-1 row-cols-md-4 g-3 kt-round-dudat d-flex justify-content-center">
          {state.DataDanhSach.map((tree: any) => (
            <div
              // key={uuidv4()}
              title={`${tree.TieuDe}`}
              className="col change-tt-aba"
            >
              <div
                className="card card_main_container  wrapper_c"
                style={{
                  position: "relative",
                }}
              >
                <div className="didu-zx-a">
                  <img
                    src={String.fileUrl(tree.URL_AnhDaiDien as string)}
                    className="card-img-top"
                    alt="..."
                  />
                  {/* {tree.PhanTramHoanThanh == 100 && <i onClick={() => {GoToChungChiPage(tree.Id, tree.TieuDe)}} className="bi bi-bookmark-star-fill icon-khoa-hoc-cua-toi"></i>} */}
                  <i onClick={() => {GoToChungChiPage(tree.Id, tree.TieuDe)}} className="bi bi-bookmark-star-fill icon-khoa-hoc-cua-toi"></i>
                </div>

                <div
                  className="card-body card_body_override card-bodys"
                  style={{ textAlign: "start" }}
                >
                  <p
                    className="card-title underline-head-tt text-uppercase"
                    onClick={() =>
                      GoToOtherPage(
                        "/hoc-ngay",
                        tree.Id as string,
                        tree.TieuDe as string,
                        tree.IdLopHoc as string,
                        tree.IdMonHoc as string
                      )
                    }
                  >
                    {tree.TieuDe}
                  </p>
                  <span className="ngay-kich-hoat">
                    Ngày kích hoạt: {tree.NgayKichHoatKhoaHoc}
                  </span>
                </div>

                <div className="row mb-2">
                  <div className="col-6 d-flex align-items-center justify-content-center">
                    {tree.HetHan == false ? (
                      <button
                        className="header_btn bg-danger text-light"
                        onClick={() =>
                          GoToOtherPage(
                            "/hoc-ngay",
                            tree.Id as string,
                            tree.TieuDe as string,
                            tree.IdLopHoc as string,
                            tree.IdMonHoc as string
                          )
                        }
                      >
                        <i className="bi bi-play-circle"></i> Học ngay
                      </button>
                    ) : (
                      <button
                        className="header_btn bg-secondary text-light"
                        onClick={() => {}}
                      >
                        <i className="bi bi-calendar2-x"></i> Đã hết hạn
                      </button>
                    )}
                  </div>
                  <div className="col-6 d-flex align-items-center justify-content-center">
                    <div className="progress-bar-tt">
                      <CircularProgressbarWithChildren value={tree.PhanTramHoanThanh}>
                        <div className="text-danger d-flex justify-content-center align-items-center">
                          {tree.PhanTramHoanThanh}%
                        </div>
                      </CircularProgressbarWithChildren>
                      ;
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(CaNhan);
