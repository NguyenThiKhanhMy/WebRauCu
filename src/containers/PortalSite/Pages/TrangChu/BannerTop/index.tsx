import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import trangchumid from "assets/img/banner-index.jpg";
import { IUserInfo } from "common/Models";
import { Storage } from "common/Storage";
import sub_banner_left from "assets/img/ban1.jpg";
import sub_banner_right from "assets/img/ban2.jpg";

interface Props { }

const BannerTop = (props: Props) => {
  const history = useHistory();
  let userInfo: IUserInfo = JSON.parse(Storage.getSession("UserInfo"));
  const GoToOtherPage = (page: string) => {
    history.push(page);
    window.scrollTo(0, 0);
  };
  return (
    <div className="jo">
      <section className="banner banner_btn_rout">
        <img loading="lazy" src={trangchumid} className="main_banner clear-banner" alt="..." />

        {!userInfo && (
          <button
            onClick={() => {
              GoToOtherPage("/dang-ky");
            }}
            className="button-49 banner_btn_ri"
            role="button"
          >
            <p>Mua ngay</p>
          </button>
        )}
      </section>
      {/* <section>
        <div className="row mr-0 ml-0">
          <div className="col-sm-6 pr-0 pl-0">
            <img loading="lazy" src={sub_banner_left} className="left-ban-left" alt="..." />
          </div>
          <div className="col-sm-6 pr-0 pl-0">
            <img loading="lazy" src={sub_banner_right} className="left-ban-left r01" alt="..." />
          </div>
        </div>
      </section> */}
    </div>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(BannerTop);
