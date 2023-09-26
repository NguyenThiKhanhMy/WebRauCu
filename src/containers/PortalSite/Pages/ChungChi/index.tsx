import CButton from "components/CButton";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import ChungNhan from "assets/img/certificate.png";
import CInput from "components/CInput";
import CNotification from "components/CNotification";
import { jsPDF } from "jspdf";
import logo from "assets/img/logoRun.png"
import { Storage } from 'common/Storage';
import { IUserInfo } from "common/Models";
import { InitState } from "./InitState";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";


interface Props {}

const CaNhan = (props: Props) => {
  const location = useLocation();
  const refNotification = useRef<any>();
  const [hold, setHold] = useState(false);
  const [pdfs, setPdfs] = useState(null);
  const [pdft, setPdft] = useState(null);
  const [time, setTime] = useState(null);
  const [date, setDate] = useState(new Date().getDate())
  const [month, setMonth] = useState((new Date().getMonth() + 1))
  const [year, setYear] = useState(new Date().getFullYear())
  const [state, dispatch] = useReducer(Reducer, InitState);
  let userInfo:IUserInfo = JSON.parse(Storage.getSession("UserInfo"));    

  const Download = () => {
    const input = document.getElementById("cert");
    
    html2canvas(input, {
      onclone: function (clonedDoc) {
        clonedDoc.getElementById("cert").style.display = "block";
      },
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
      });
      const pdfWidth = 297;
      const pdfHeight = 210;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      // var string = pdf.output('blob');
      // var file = new File([string], "name");
      // setPdfs(file)

      pdf.save("download.pdf");
    });
  };
  useEffect(() => {
    Actions.GetInfor(dispatch)
  }, [])
  useEffect(() => {
    const input = document.getElementById("cert");

    html2canvas(input, {
      onclone: function (clonedDoc) {
        clonedDoc.getElementById("cert").style.display = "block";
      },
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      setPdft(imgData);
    });

    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    setTime(date + "." + month + "." + year);
  }, [state.Infor.FullName]);

 

  return (
    // 1123/794
    <div style={{ minHeight: "80vh" }}>
      <CNotification ref={refNotification} />

      <div className="container-xl mt-3 mb-3">
        <div>
          <div className="hoho-xp">
            <h3 className="text-center text-danger">
              Chúc mừng bạn đã vượt qua khóa học
            </h3>
          </div>
        </div>

        <div id="cert" className="Chung-chi2 mb-3">
          <img width="100%" height="100%" src={ChungNhan} alt="" />
          <h5 className="nametext text-uppercase">{state.Infor && state.Infor.FullName}</h5>

          <div className="nametextt"><h6 className="sae">{location.state.tieuDe}</h6></div>
          <h6 className="nametexttt">{date}</h6>
          <h6 className="nametextttt">{month}</h6>
          <h6 className="nametexttttt">{year}</h6>
          <img className="logooks" src={logo} alt="..."/>
        </div>

        <div className="relat">
          <CButton
            className={"bg-danger no-border relat-1"}
            onClick={() => {
              Download();
            }}
            title="Tải về chứng chỉ"
          />
          <div id="certificate" className="Chung-chi mb-3">
            <img width="100%" height="auto" src={pdft} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(CaNhan);