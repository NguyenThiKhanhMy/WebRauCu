import React, { useEffect, useReducer } from "react";
import { connect } from "react-redux";
import img_header from "assets/img/bg30.png";
import data from "assets/json/GioiThieu_config.json";
import { InitState } from "./InitState";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import { String } from "common/String";
const HtmlToReactParser = require("html-to-react").Parser;
const htmlToReactParser = new HtmlToReactParser();
const { v4: uuidv4 } = require("uuid");

interface Props { }

const GioiThieu = (props: Props) => {
  const [state, dispatch] = useReducer(Reducer, InitState);

  useEffect(() => {
    Actions.GetCauHinhBlog(dispatch);
    document.title = "Giới thiệu";
  }, []);

  const binh_luan_trai =
    state.DataThanhTichLeft &&
    state.DataThanhTichLeft.map((value: any) => {
      return (
        <section key={uuidv4()} className="gioi_thieu_container_binh_luan_card">
          <section>
            <img src={value.Avatar} alt="loading" />
            <section>
              <p>{value.Ten}</p>
              <p className="text-danger">{value.MoTa}</p>
            </section>
          </section>
          <p>{value.NoiDung}</p>
        </section>
      );
    });

  const binh_luan_phai =
    state.DataThanhTichRight &&
    state.DataThanhTichRight.map((value: any) => {
      return (
        <section key={uuidv4()} className="gioi_thieu_container_binh_luan_card">
          <section>
            <img src={value.Avatar} alt="loading" />
            <section>
              <p>{value.Ten}</p>
              <p className="text-danger">{value.MoTa}</p>
            </section>
          </section>
          <p>{value.NoiDung}</p>
        </section>
      );
    });
  return (
    <main>
      <img className="gioi_thieu_img_header" src={img_header} alt="loading" />

      <section className="gioi_thieu_container_video">
        <figure>
          <figcaption>
            <iframe
              loading="lazy"
              src={data.VideoGioiThieu.DuongDanVideo}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <h1>{data.MoTaGioiThieuHeader.TieuDe}</h1>
            <section>
              {htmlToReactParser.parse(data.MoTaGioiThieuHeader.MoTa)}
            </section>
          </figcaption>
        </figure>
      </section>

      {data.NoiDungGioiTHieu.map((value: any) => (
        <section key={uuidv4()} className="gioi_thieu_container_noi_dung">
          <section>
            <article>
              <h3>{value.TieuDe}</h3>
              <ul>
                {value.NoiDung.map((valueChild: string) => (
                  <li key={uuidv4()}>{valueChild}</li>
                ))}
              </ul>
            </article>
          </section>
          <figure>
            <figcaption>
              <img src={value.DuongDanAnh} alt="loading" />
            </figcaption>
          </figure>
        </section>
      ))}

      <section className="gioi_thieu_container_chu_thich">
        <article>
          <h3>{data.MoTaGioiThieuFooter.TieuDe}</h3>
          <section>
            {htmlToReactParser.parse(data.MoTaGioiThieuFooter.MoTa)}
          </section>
        </article>
      </section>

      <section className="gioi_thieu_chia_container container-xl"></section>

      <section className="gioi_thieu_container_tin_tuc">
        <article>
          <h3>{data.TinTuc.TieuDe}</h3>
          <section>{htmlToReactParser.parse(data.TinTuc.MoTa)}</section>
          {state.DataItem &&
            state.DataItem.map((value: any) => (
              <section
                key={uuidv4()}
                className="card gioi_thieu_container_tin_tuc_card"
              >
                <section className="row">
                  <section className="col-md-4">
                    <img
                      src={value.URL_AnhDaiDien}
                      className="img-fluid rounded-start"
                      alt="..."
                      width="100%"
                    />
                  </section>
                  <section className="col-md-8">
                    <article className="card-body">
                      <h5 className="card-title text-danger">{value.TieuDe}</h5>
                      <p className="text-muted gioi_thieu_container_tin_tuc_text-small">
                        {String.date(value.CreatedDateTime)}
                      </p>

                      <p className="card-text teat mt-2">
                        <small className="text-muted">{value.MoTa}</small>
                      </p>
                      <section className="gioi_thieu_container_tin_tuc_card_chia"></section>
                    </article>
                  </section>
                </section>
              </section>
            ))}
        </article>
      </section>
    </main>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(GioiThieu);
