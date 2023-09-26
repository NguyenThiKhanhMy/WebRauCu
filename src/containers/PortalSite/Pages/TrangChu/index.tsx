import React, { Suspense } from "react";
import { connect } from "react-redux";
import CLoading from "components/Loading"

import BannerTop from "./BannerTop/index";
import BannerBottom from "./BannerBottom/index";
import GioiThieu from "./GioiThieu/index";
import GiaoAn from "./GiaoAn/index";
import KhoaHoc from "./KhoaHoc/index";
import SuKien from "./SuKien/index";
import ThanhTich from "./ThanhTich/index";
import Blog from "./Blog/index";
import TuVan from "./TuVan/index";
import { Helmet } from 'react-helmet';

interface Props {}

const TrangChu = (props: Props) => {
  const splitComponent = <div className="style17 container-xl"></div>;

  return (
    <main>
      <Helmet>
        <meta property="og:title" content="Trung tâm huấn luyện chạy bộ chuyên nghiệp hocchaybo.com" />
        <meta property="og:image" content="https://hocchaybo.vn/Media/Images/Site/hocchaybo.vn-logo.png" />
        <meta property="og:url" content="https://hocchaybo.com" />
      </Helmet>  
      <BannerTop />
      <GioiThieu />
      <GiaoAn />
      {splitComponent}
      <KhoaHoc />
      {splitComponent}
      <SuKien />
      <BannerBottom />
      <ThanhTich />
      <TuVan />
    </main>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(TrangChu);
