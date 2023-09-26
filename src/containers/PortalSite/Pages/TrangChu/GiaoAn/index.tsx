import React, { Fragment, useEffect, useReducer, useState } from "react";
const { v4: uuidv4 } = require("uuid");
import { useHistory } from "react-router-dom";
import { IModelMonHocCon } from "./InitState";
import { InitState } from "./InitState";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import { connect } from "react-redux";
import { String } from "common/String";

interface Props { }

const GiaoAn = (props: Props) => {
  const history = useHistory();
  const [state, dispatch] = useReducer(Reducer, InitState);
  const [activeTab, setActiveTab] = useState(0);

  const GoToOtherPage = (page: string, search: any) => {
    history.push({pathname: page, search: search});
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    Actions.GetItemGiaoan(dispatch);
  }, []);

  const onChangeTab = (e: any, ie: any) => {
    setActiveTab(ie);
  };

  const giaoan = state.DataItemsGiaoAn && (
    <section className="main_sub_detal rout-zxz mt-2 mb-2 ">
      <article className="container-xl d-flex flex-column">
        <h4 className="text-danger tieu-de">
          {state.DataItemsGiaoAn.TenTieuDe}
        </h4>
        <section className=" mt-3">
          <section className="row row-cols-1 row-cols-md-4 g-3 kt-round-dudat d-flex justify-content-center">
            {state.DataItemsGiaoAn.DanhSachMonHocCon.map(
              (tree: IModelMonHocCon) => (
                <section
                  key={uuidv4()}
                  title={`${tree.TieuDe}`}
                  className="col change-tt-aba"
                >
                  <section
                    className="card card_main_container  wrapper_c"
                    style={{
                      position: "relative",
                    }}
                  >
                    <section className="wrapper_card">
                      <img
                        loading="lazy"
                        src={String.fileUrl(tree.URL_AnhDaiDien as string)}
                        className="card-img-top ful-ga-ai"
                        alt="..."
                      />
                    </section>

                    <section
                      className="card-body card_body_override card-bodys"
                      style={{ textAlign: "start" }}
                    >
                      <p
                        className="card-title underline-head-tt text-uppercase"
                        onClick={() => GoToOtherPage("/khoa-hoc", tree.MaURL)}
                      >
                        {tree.TieuDe}
                      </p>
                      <p className=" card-text text-dark mo-ta mb-1">
                        {tree.MoTa}
                      </p>
                    </section>
                  </section>
                </section>
              )
            )}
          </section>
        </section>

        {/* {state.DataItemsGiaoAn.DanhSachMonHocCon.map(
          (tree: IModelMonHocCon) => {
            return (
              <div key={uuidv4()}>
                {tree.DSKhoiMonHoc ? (
                  <h4 className="text-danger tieu-de-monhoc">{tree.TieuDe}</h4>
                ) : (
                  <></>
                )}
                <section className="row row-cols-1 row-cols-md-4 g-3 kt-round-dudat d-flex justify-content-center">
                  {tree.DSKhoiMonHoc &&
                    tree.DSKhoiMonHoc.map((treeGiaoAn: IModelMonHocCon) => (
                      <section
                        key={uuidv4()}
                        title={`${treeGiaoAn.TieuDe}`}
                        className="col change-tt-aba"
                      >
                        <section
                          className="card card_main_container  wrapper_c"
                          style={{
                            position: "relative",
                          }}
                        >
                          <section className="wrapper_card">
                            <img
                              loading="lazy"
                              src={String.fileUrl(
                                treeGiaoAn.URL_AnhDaiDien as string
                              )}
                              className="card-img-top ful-ga-ai"
                              alt="..."
                            />
                          </section>

                          <section
                            className="card-body card_body_override card-bodys"
                            style={{ textAlign: "start" }}
                          >
                            <p
                              className="card-title underline-head-tt text-uppercase"
                              onClick={() => GoToOtherPage("/khoa-hoc")}
                            >
                              {treeGiaoAn.TieuDe}
                            </p>
                            <p className=" card-text text-dark mo-ta mb-1">
                              {treeGiaoAn.MoTa}
                            </p>
                          </section>
                        </section>
                      </section>
                    ))}
                </section>
              </div>
            );
          }
        )} */}

        <section className=" mt-4">
          <div className="row nhom-su-kien mt-3">
            <div className="col-sm-12">
              <ul className="nav nav-tabs">
                {state.DataItemsGiaoAn.DanhSachMonHocCon.map(
                  (e: any, ie: any) => {
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
                            "nav-link " + (ie == activeTab ? "active" : "")
                          }
                        >
                          {e.TieuDe}
                        </span>
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          </div>
          <div className="row">
            {state.DataItemsGiaoAn.DanhSachMonHocCon.map((e: any, ie: any) => {
              return (
                <Fragment key={uuidv4()}>
                  {ie == activeTab && (
                    <section className="row row-cols-1 row-cols-md-4 g-3 kt-round-dudat d-flex justify-content-center">
                      {e.DSKhoiMonHoc &&
                        e.DSKhoiMonHoc.map((treeGiaoAn: IModelMonHocCon) => (
                          <section
                            key={uuidv4()}
                            title={`${treeGiaoAn.TieuDe}`}
                            className="col change-tt-aba"
                          >
                            <section
                              className="card card_main_container  wrapper_c"
                              style={{
                                position: "relative",
                              }}
                            >
                              <section className="wrapper_card">
                                <img
                                  loading="lazy"
                                  src={String.fileUrl(
                                    treeGiaoAn.URL_AnhDaiDien as string
                                  )}
                                  className="card-img-top ful-ga-ai"
                                  alt="..."
                                />
                              </section>

                              <section
                                className="card-body card_body_override card-bodys"
                                style={{ textAlign: "start" }}
                              >
                                <p
                                  className="card-title underline-head-tt text-uppercase"
                                  onClick={() => GoToOtherPage("/khoa-hoc", treeGiaoAn.MaURL)}
                                >
                                  {treeGiaoAn.TieuDe}
                                </p>
                                <p className=" card-text text-dark mo-ta mb-1">
                                  {treeGiaoAn.MoTa}
                                </p>
                              </section>
                            </section>
                          </section>
                        ))}
                    </section>
                  )}
                </Fragment>
              );
            })}
          </div>
        </section>
      </article>
    </section>
  );

  return <>{giaoan}</>;
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(GiaoAn);
