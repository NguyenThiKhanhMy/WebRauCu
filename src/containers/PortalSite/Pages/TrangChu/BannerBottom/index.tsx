import React from "react";
import { connect } from "react-redux";
import sub_banner_left from "assets/img/ban1.jpg";
import ban4 from "assets/img/ban7.jpg";
import ban5 from "assets/img/ban5.jpg";
import ban6 from "assets/img/ban6.jpg";
import bg12 from "assets/img/bg12.jpg";

interface Props {}

const BannerTop = (props: Props) => {
  return (
    <>
      {/* <section className="banner_2nd mt-2 chaner-si">
        <img
          loading="lazy"
          src={ban4}
          className="main_banner cever"
          alt="..."
        />
      </section> */}
      {/* <section className="d-flex w-100 chaner-si">
        <img
          loading="lazy"
          src={sub_banner_left}
          className="cohepahen"
          alt="..."
        />
        <img loading="lazy" src={ban5} className="cohepahen" alt="..." />
        <img loading="lazy" src={ban6} className="cohepahen" alt="..." />
      </section> */}
      <section>
        <div className="row mr-0 ml-0">
          <div className="col-sm-4 pr-0 pl-0">
            <img
              loading="lazy"
              src={sub_banner_left}
              className="cohepahen"
              alt="..."
            />
          </div>
          <div className="col-sm-4 pr-0 pl-0">
            <img loading="lazy" src={ban5} className="cohepahen" alt="..." />
          </div>
          <div className="col-sm-4 pr-0 pl-0">
            <img loading="lazy" src={ban6} className="cohepahen" alt="..." />
          </div>
        </div>
      </section>
      <section className="banner_2nd d-flex justify-content-center align-items-center mt-5">
        <img
          loading="lazy"
          src={bg12}
          style={{ width: "70vw", height: "auto" }}
          alt="..."
        />
      </section>
    </>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(BannerTop);
