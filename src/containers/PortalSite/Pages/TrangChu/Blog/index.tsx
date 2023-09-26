import React, { useEffect, useReducer } from "react";
const { v4: uuidv4 } = require("uuid");
import { useHistory } from "react-router-dom";
import { danhSachTintuc } from "./InitState";
import { InitState } from "./InitState";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import { connect } from "react-redux";
import OwlCarousel from "react-owl-carousel";
import { String } from "common/String";

interface Props {}

const Blog = (props: Props) => {
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
    Actions.GetItemBlog(dispatch);
  }, []);

  const responsive = {
    0: {
      items: 1,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 5,
    },
  };

  const blog = state.DataItemsBlog.DanhSachTinTuc.length > 0 && (
    <article className="container-xl">
      <h4 className="text-danger text-center tieu-de">
        {state.DataItemsBlog.TenNhomTinTuc}
      </h4>

      <OwlCarousel
        className="owl-theme mt-3"
        autoplay
        loop
        nav
        center
        items={
          state.DataItemsBlog.DanhSachTinTuc
            ? state.DataItemsBlog.DanhSachTinTuc.length
            : 4
        }
        responsive={responsive}
      >
        {state.DataItemsBlog.DanhSachTinTuc &&
          state.DataItemsBlog.DanhSachTinTuc.map((item: danhSachTintuc) => (
            <section key={uuidv4()} className="item card_carosel">
              <section>
                <img
                  loading="lazy"
                  src={String.fileUrl(item.URL_AnhDaiDien as string)}
                  height="153px"
                  style={{ borderRadius: 5 }}
                  alt="..."
                />
                <section>
                  <h6
                    className="mt-1 card-title cursor-pointer underline-head-tt"
                    onClick={() =>
                      GoToDetailPage(
                        "/chi-tiet-tin-tuc",
                        item.Id as string,
                        item.TieuDe as string,
                        "tintuc"
                      )
                    }
                  >
                    {item.TieuDe}
                  </h6>
                  <p className="owl_text" style={{ wordWrap: "break-word" }}>
                    {item.MoTa}
                  </p>
                </section>
              </section>
            </section>
          ))}
      </OwlCarousel>
    </article>
  );

  return <>{blog}</>;
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(Blog);
