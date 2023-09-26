import React, { Suspense } from "react";
import { connect } from "react-redux";
import CLoading from "components/Loading"

const BannerTop = React.lazy(() => import("./BannerTop/index"));
const GioiThieu = React.lazy(() => import("./GioiThieu/index"));
const KhoaHoc = React.lazy(() => import("./KhoaHoc/index"));

interface Props {}

const TrangChu = (props: Props) => {
  const splitComponent = <div className="style17 container-xl"></div>;

  return (
    <main>
      <Suspense fallback={<CLoading/>}>
        <BannerTop />
      </Suspense>

      <Suspense
        fallback={<CLoading/>}
      >
        <GioiThieu />
      </Suspense>

      {splitComponent}

      <Suspense
        fallback={<CLoading/>}
      >
        <KhoaHoc />
      </Suspense>
    </main>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(TrangChu);
