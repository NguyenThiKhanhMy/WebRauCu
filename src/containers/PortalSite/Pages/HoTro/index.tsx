import React, { useEffect, useReducer, useState } from "react";
import { connect } from "react-redux";
import bg40 from "assets/img/bg40.png";
import email from "assets/img/email.png";
import call from "assets/img/Call center.png";
import { InitState } from "./InitState";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import ReactPaginate from "react-paginate";
import { Actions as GlobalAction } from "store/Global/Action";
const { v4: uuidv4 } = require("uuid");



interface Props {
  global: any;
  GetLoai: any;
}

const HoTro = (props: Props) => {
  const [state, dispatch] = useReducer(Reducer, InitState);
  const [mxh1, setMxh1] = useState("");
  const [mxh2, setMxh2] = useState("");

  const fetchMXH = async () => {
    let resMXH1 = await props.GetLoai(1);
    setMxh1(resMXH1.Data.Items[0].Value);
    setMxh2(resMXH1.Data.Items[1].Value);
    
  };

  useEffect(() => {
    Actions.GetItem(dispatch);
    //fetchMXH()
  }, []);


  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * 10) % state.Count;
    Actions.GetItemChange(newOffset, newOffset + 10, dispatch);
  };
  
  const hotro =
    state.DataItem && state.DataItem.length > 0 ? (
      state.DataItem.map((value: any) => {
        return (
          <div key={uuidv4()} className="accordion-item boru-ho-tro">
            <div className="accordion-header" id={`headingOne${value.Id}`}>
              <button
                className="accordion-button w-100 btn-accordion-ho-tro"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapseOne${value.Id}`}
                aria-expanded="true"
                aria-controls={`collapseOne${value.Id}`}
              >
                {value.TieuDe}
              </button>
            </div>
            <div
              id={`collapseOne${value.Id}`}
              className="accordion-collapse collapse"
              aria-labelledby={`headingOne${value.Id}`}
              data-bs-parent="#accordionExample"
            >
              <div className="body-ho-tro-text">{value.NoiDung}</div>
            </div>
          </div>
        );
      })
    ) : (
      <div>Không có dữ liệu</div>
    );
  const GetInfoShop = (type:any, InfoShop:any) => {
    if(InfoShop)
    {
      for(let i = 0;i < InfoShop.length;i++)
      {
        if(InfoShop[i].Code == "bi bi-envelope-at-fill" && type == "email")
        {
          return InfoShop[i].Value;
        }
        else if(InfoShop[i].Code == "bi bi-telephone-fill" && type == "phone")
        {
          return InfoShop[i].Value;
        }
      }
    }
    return "";
  }
  return (
    <div>
      <div className="container-xl container-header-ho-tro mb-5 mt-4">
        <h4 className="text-center mb-1 text-uppercase ho-tro-font">Câu hỏi phổ biến</h4>
        <div className="row">
          <div className="accordion" id="accordionExample">
            {hotro}
          </div>
        </div>
        <div className="d-flex justify-content-center pagi-kh-os align-items-center mt-3">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Sau"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={state.Count && Math.ceil(state.Count / 10)}
            previousLabel="Trước"
            className="pagination"
            initialPage={0}
          />
        </div>
      </div>

      <div className="style17 container-xl"></div>

      <div className="mt-5 mb-5 main_panel">
        <div className="left-panel">
          <div className="d-flex justify-content-center">
            <img src={email} className="mb-3" width="103px" height="103px" alt="..."/>
          </div>

          <p className="mb-3 text-center">Địa chỉ Email</p>
          <p className="text-center"><b>{GetInfoShop("email", props.global.InfoShop)}</b></p>
        </div>
        <div className="right-panel">
          <div className="d-flex justify-content-center">
            <img src={call} className="mb-3" width="103px" height="103px" alt="..."/>
          </div>

          <p className="mb-3 text-center">Số điện thoại</p>
          <p className="text-center"><b>{GetInfoShop("phone", props.global.InfoShop)}</b></p>
        </div>
      </div>

      {/* <div className="d-flex  justify-content-center align-items-center">
        <div
          className="mt-5 d-flex flex-column container-xl "
          style={{ padding: "0 0 30px 0", maxWidth: "500px" }}
        >
          <div className="text-center container-ho-tro-tin-nhan" style={{ padding: "20px 2rem" }}>
            <h3 className="mb-3 ho-tro-font">
              GỬI TIN NHẮN
            </h3>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="olivia@untitledui.com"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                placeholder="Nội dung tin"
                id="exampleFormControlTextarea1"
                rows={3}
                defaultValue={""}
              />
            </div>
            <button
              className="header_btn bg-danger text-light mt-3"
              style={{ width: "120px" }}
            >
              Gửi
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};
const mapState = ({ ...state }) => ({
  global: state.global,
});
const mapDispatchToProps = {
  GetLoai: GlobalAction.GetLoai,
};

export default connect(mapState, mapDispatchToProps)(HoTro);
