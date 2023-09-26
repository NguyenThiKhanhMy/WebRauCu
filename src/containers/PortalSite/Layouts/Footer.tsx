import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import logo from "../../../assets/img/logoRun.png";
import { Actions } from "store/Global/Action";
import data from "assets/json/Footer_config.json";
import { useHistory } from "react-router-dom";
const { v4: uuidv4 } = require("uuid");


interface Props {
  global: any;
  GetLoai: any;
  GetFooter: any;
  GetToInfoShop: any;
  GetToSocialMedia: any;
}

const Footer = (props: Props) => {

  const [footer1, setFooter1] = useState([]);
  const [footer2, setFooter2] = useState([]);
  const history = useHistory();

  const fetchFooter = async () => {
    let foot1 = await props.GetFooter(
      data.Menu[0].MaNhomTinTuc,
      data.Menu[0].SoLuong
    );
    let foot2 = await props.GetFooter(
      data.Menu[1].MaNhomTinTuc,
      data.Menu[1].SoLuong
    );
    setFooter1(foot1.Data);
    setFooter2(foot2.Data);
  };

  useEffect(() => {
    fetchFooter();
  }, []);

  const lienHe =
  props.global.InfoShop &&
  props.global.InfoShop.map((value: any) => {
      return (
        <p key={uuidv4()} className="footer_text text_g">
          <i className={`${value.Code}`}></i> <span className="dohsy">{value.Value}</span>
        </p>
      );
    });
  const mangXaHoi =
  props.global.SocialMedia &&
  props.global.SocialMedia.map((value: any) => {
      return (
        <a key={uuidv4()} className="header_link" href={value.Value} target="_blank">
          <i className={`${value.Code}`}></i>
        </a>
      );
    });

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

  const footerMain1 =
    footer1 &&
    footer1.map((value: any) => {
      return (
        <span
        key={uuidv4()}
          onClick={() =>
            GoToDetailPage(
              "/chi-tiet-tin-tuc",
              value.Id as string,
              value.TieuDe as string,
              "tintuc"
            )
          }
          className="footer_text text_f"
        >
          {value.TieuDe}
        </span>
      );
    });
  const footerMain2 =
    footer2 &&
    footer2.map((value: any) => {
      return (
        <span
        key={uuidv4()}
          onClick={() =>
            GoToDetailPage(
              "/chi-tiet-tin-tuc",
              value.Id as string,
              value.TieuDe as string,
              "tintuc"
            )
          }
          className="footer_text text_f"
        >
          {value.TieuDe}
        </span>
      );
    });

  return (
    <div className="footer bg-danger text-light ">
      <div className="container-xl d-flex flex-column justify-content-center h-100 gap-2">
        <div className="d-flex justify-content-evenly footer_container">
          <div className="a">
            <img src={logo} className="footer_img" alt="..."/>
          </div>

          <div className="d-flex flex-column b">
            <p className="footer_text_head e op">{data.Menu[0].TieuDe}</p>
            {footerMain1}
          </div>
          <div className="d-flex flex-column delay c">
            <p className="footer_text_head e op">{data.Menu[1].TieuDe}</p>
            {footerMain2}
          </div>
          <div className="d-flex flex-column delay">
            <p className="footer_text_head e op">Thông tin liên hệ</p>
            {lienHe}
            <div className="f d-flex gap-2 icon_f">{mangXaHoi}</div>
          </div>
        </div>
        <div className="text-center">
          <p className="footer_text_head">{data.Footer.TieuDe}</p>
          <p className="footer_text">{data.Footer.Mota}</p>
          <p className="footer_text">{data.Footer.Mota1}</p>
        </div>
      </div>
    </div>
  );
};
const mapState = ({ ...state }) => ({
  global: state.global,
});
const mapDispatchToProps = {
  GetLoai: Actions.GetLoai,
  GetFooter: Actions.GetFooter,
  GetToInfoShop: Actions.GetToInfoShop,
  GetToSocialMedia: Actions.GetToSocialMedia,
};

export default connect(mapState, mapDispatchToProps)(Footer);
