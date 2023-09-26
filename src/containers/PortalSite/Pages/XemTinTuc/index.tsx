import React, { useEffect, useReducer, useState } from "react";
import { connect } from "react-redux";
import Comment from "../Comment/TinTucComment/comment";
import { useLocation } from "react-router-dom";
import { InitState } from "./InitState";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import { String } from "common/String";
import { IUserInfo } from "common/Models";
const { v4: uuidv4 } = require("uuid");
const HtmlToReactParser = require("html-to-react").Parser;
const htmlToReactParser = new HtmlToReactParser();
import { Storage } from "common/Storage";

interface Props { }

const ChiTiet = (props: Props) => {
  const [state, dispatch] = useReducer(Reducer, InitState);
  let userInfo: IUserInfo = JSON.parse(Storage.getSession("UserInfo"));

  const location = useLocation();

  useEffect(() => {
    if (location.search.includes("?=")) {
      let param = location.search.split("?=");
      Actions.GetDetailTinTuc(param[1], dispatch);
    }
  }, [location.search]);

  const tintuc = state.DataDetailTinTucLienQuan && (
    <div className="container mt-3 mb-2">
      <div className="row row-cols-1 row-cols-md-4 g-3 kt-round-dudat d-flex justify-content-center">
        {state.DataDetailTinTucLienQuan.map((tree: any) => (
          <div
            key={uuidv4()}
            title={`${tree.TieuDe}`}
            className="col change-tt-aba"
          >
            <div className="card card_main_container  wrapper_c relative-duboi">
              <div className="wrapper_card">
                <img
                  src={String.fileUrl(tree.URL_AnhDaiDien as string)}
                  className="card-img-top"
                  alt="..."
                />
              </div>

              <div className="card-body card_body_override card-bodys start-aib-aba">
                <p
                  className="card-title underline-head-tt text-uppercase"
                // onClick={() => GoToOtherPage("/khoa-hoc")}
                >
                  {tree.TieuDe}
                </p>
                <p className=" card-text text-dark mo-ta mb-1">{tree.MoTa}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mt-3 mb-3">
      {(
        <div id="main_newss_fat">
          <div className="container main_newss d-dex-f mt-3">
            <div className="neil-ch">
              <h4 className="text-center text-danger">
                {"Kiến thức"}
              </h4>
            </div>
            <p className="mb-2 texxt-er">
              {String.date(state.DataDetail.NgayXuatBan)} |{" "}
              {state.DataDetail.LuotXem} Lượt xem
            </p>
            <h3 className="text-uppercase bold-asu-aa">
              {state.DataDetail.TieuDe}
            </h3>
            <p className="mb-3">
              Tác giả: <span>{state.DataDetail.TacGia}</span>
            </p>

            <div className="change0s">
              {htmlToReactParser.parse(state.DataDetail.NoiDung)}
            </div>
          </div>
          <div className="container-xl"></div>
        </div>
      )}
    </div>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(ChiTiet);
