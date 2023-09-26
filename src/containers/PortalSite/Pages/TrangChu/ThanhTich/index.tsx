import React, { useEffect, useReducer, useState } from "react";
const { v4: uuidv4 } = require("uuid");
import { useHistory } from "react-router-dom";
import { InitState } from "./InitState";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import { connect } from "react-redux";
import { String } from "common/String";

interface Props {}

const ThanhTich = (props: Props) => {
  const history = useHistory();
  const [count, setCount] = useState("");
  const [state, dispatch] = useReducer(Reducer, InitState);

  const thanhTich =
    state.DataThanhTich &&
    state.DataThanhTich.map((item: any, index: any) => {
      return (
        <div key={uuidv4()} className="col-sm-4 mb-2">
          <div className={"d-flex personImg"}>
            <img
              loading="lazy"
              className="img-thanhtich"
              src={String.fileUrl(item.URL_AnhGioiThieu1 as string)}
              alt="..."
            />
            <div className="wrapper-thanhtich">
              <p
                className="text-uppercase tengiaychay-thanhtich cursor-pointer underline-head-tt"
                onClick={() => GoToOtherPage("/thanh-tich-hoc-vien")}
              >
                {item.TenGiaiChay}
              </p>
              <p
                className="text-uppercase tieude-thanhtich cursor-pointer underline-head-tt"
                onClick={() => GoToOtherPage("/thanh-tich-hoc-vien")}
              >
                {item.TieuDe}
              </p>
              <p className="noidung-thanhtich">{item.NoiDung}</p>
            </div>
          </div>
        </div>
      );
    });

  const GoToOtherPage = (page: string) => {
    history.push(page);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    fetchThanhTich();
  }, []);

  const fetchThanhTich = async () => {
    let res = await Actions.GetThanhTich(dispatch);
    // if (res.length > 0) {
    //   setCount(res[0].TaiKhoan);
    //   await Actions.GetThanhTichDetail(res[0].TaiKhoan, dispatch);
    // }
  };

  return (
    <>
      <section className="main_sub_detal mb-2">
        <section className="container-xl d-flex flex-column">
          <h4 className="text-danger tieu-de mb-3">Học viên tiêu biểu</h4>
          <section className="row">{thanhTich}</section>
        </section>
      </section>
    </>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(ThanhTich);
