import React, { useEffect, useReducer } from "react";
const { v4: uuidv4 } = require("uuid");
import { useHistory } from "react-router-dom";
import { danhSachTintuc } from "./InitState";
import { InitState } from "./InitState";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import { connect } from "react-redux";
import img1 from "assets/img/img1.jpg";
import img2 from "assets/img/img2.jpg";
import img3 from "assets/img/img3.jpg";
import { String } from "common/String";

interface Props {}

const GioiThieu = (props: Props) => {
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
    Actions.GetItemGioiThieu([img1, img2, img3], dispatch);
  }, []);

  const gioiThieu = state.DataItemsGioiThieu && (
    <div key={uuidv4()} className="main_sub_detal rout-zx mt-2">
      <div className="container-xl d-flex flex-column">
        <h4 className="text-danger tieu-de text-uppercase">
          {state.DataItemsGioiThieu.TenNhomGioiThieu}
        </h4>
        <div className=" mt-3">
          <div className="row gap-3 justify-content-center align-items-center">
            {state.DataItemsGioiThieu.DanhSachGioiThieu.map(
              (child: danhSachTintuc) => (
                <div
                  key={uuidv4()}
                  className="card p-0 card_main_container wrapper_d"
                  style={{
                    maxWidth: "350px",
                  }}
                >
                  <div className="wrapper_discard">
                    <img
                      loading="lazy"
                      src={String.fileUrl(child.URL_AnhDaiDien as string)}
                      className="card-img-top imov"
                      alt="..."
                    />
                  </div>

                  <img
                    loading="lazy"
                    src={child.Img as string}
                    className="card_logo"
                    alt="..."
                  />
                  <div className="card-body main_sub_bd d-flex flex-column">
                    <h6
                      className="card-title mt-4 mb-2 underline-head-tt"
                      style={{ fontStyle: "italic" }}
                      onClick={() =>
                        GoToDetailPage(
                          "/chi-tiet-tin-tuc",
                          child.Id as string,
                          child.TieuDe as string,
                          "tintuc"
                        )
                      }
                    >
                      {child.TieuDe}
                    </h6>
                    <p
                      className="card-text gioiThieuPortal"
                      style={{ textAlign: "justify" }}
                    >
                      {child.MoTa.substring(0, 173)} &nbsp;...
                    </p>
                    <div style={{ flexGrow: 1, position: "relative" }}>
                      <button
                        className="header_btn bg-danger text-light"
                        onClick={() =>
                          GoToDetailPage(
                            "/chi-tiet-tin-tuc",
                            child.Id as string,
                            child.TieuDe as string,
                            "tintuc"
                          )
                        }
                      >
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return <>{gioiThieu}</>;
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(GioiThieu);
