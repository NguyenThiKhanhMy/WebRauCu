import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import trangchumid from "assets/img/Banner.png";
import { IUserInfo } from "common/Models";
import { Storage } from "common/Storage";
import sub_banner_left from "assets/img/ban1.jpg";
import sub_banner_right from "assets/img/ban2.jpg";

interface Props {}

const BannerTop = (props: Props) => {
  const history = useHistory();
  let userInfo: IUserInfo = JSON.parse(Storage.getSession("UserInfo"));
  const GoToOtherPage = (page: string) => {
    history.push(page);
    window.scrollTo(0, 0);
  };
  return (
    <>
      <section className="banner banner_btn_rout">
        <img loading="lazy" src={trangchumid} className="main_banner clear-banner" alt="..." />
      </section>
    </>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(BannerTop);
