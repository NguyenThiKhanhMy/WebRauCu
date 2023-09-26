import React, { useEffect, useReducer, useRef, useState } from "react";
import { connect } from "react-redux";
import { InitState } from "./InitState";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { String } from "common/String";
const { v4: uuidv4 } = require("uuid");

interface Props {}

const CaNhan = (props: Props) => {
  const location = useLocation();
  const [state, dispatch] = useReducer(Reducer, InitState);
  const history = useHistory();

  useEffect(() => {
    if (location && location.state && location.state.inputSearch) {
      Actions.GetItemTimKiem(location.state.inputSearch, 1000, dispatch);
    }
  }, []);

  console.log(state)
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
    <>
      <div className="container-xl mt-3 mb-3">
        <h5 className="tieu-de-tim-kiem mb-3">
          Bộ lọc tìm kiếm: {state.Count}. Kết quả{" "}
          <span>
            Từ khóa tìm kiếm:{" "}
            {location.state.inputSearch && location.state.inputSearch}
          </span>
        </h5>
        <div className="row row-cols-1 row-cols-md-4 g-3 kt-round-dudat">
          {state.DataItem &&
            state.DataItem.map((child: any) => {
              return (
                <div key={uuidv4()} className="col-sm-4 change-tt-aba">
                  <div className="card tim-kiem-abz">
                    <div className="main-tim-kiem">
                      <img
                        src={String.fileUrl(child.URL_AnhDaiDien)}
                        className="card-img-top tim-kiem-img-c"
                        alt="..."
                      />
                      <p className="main-tim-kiem-awa">{child.Loai}</p>
                    </div>

                    <div
                      className="card-body card-bodys"
                      style={{
                        textAlign: "start",
                      }}
                    >
                      <p
                        className="card-title  underline-head-tt"
                        onClick={() => {
                          child.Loai == "TinTuc"
                            ? GoToDetailPage(
                                "/chi-tiet-tin-tuc",
                                child.Id as string,
                                child.TieuDe as string,
                                "tintuc"
                              )
                            : GoToDetailPage(
                                "/khoa-hoc-chi-tiet",
                                child.Id as string,
                                child.TieuDe as string,
                                "khoahoc"
                              );
                        }}
                      >
                        {child.TieuDe}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(CaNhan);
