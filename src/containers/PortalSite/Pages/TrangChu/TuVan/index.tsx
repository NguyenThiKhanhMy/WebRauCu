import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import formImg from "assets/img/form-image.jpg";
import { Message } from "common/Enums";
import CNotification from "components/CNotification";
import TuVanService from "services/TuVanService";
import { IResponseMessage } from "common/Models";

interface Props {}

const TuVan = (props: Props) => {
  const [tuVan, setTuVan] = useState({
    Ten: "",
    GioiTinh: "0",
    Sdt: "",
    Email: "",
    NoiDung: "",
  });
  const refNotification = useRef<any>();

  const onChangeFormTuVan = (key: string, e: any) => {
    setTuVan({
      ...tuVan,
      [key]: e,
    });
  };

  const ValidateFormTuVan = () => {
    if (!tuVan.Email) {
      refNotification.current.showNotification("warning", Message.TuVan_Wrong);
      return false;
    }
    if (!tuVan.GioiTinh) {
      refNotification.current.showNotification("warning", Message.TuVan_Wrong);
      return false;
    }
    if (!tuVan.NoiDung) {
      refNotification.current.showNotification("warning", Message.TuVan_Wrong);

      return false;
    }
    if (!tuVan.Sdt) {
      refNotification.current.showNotification("warning", Message.TuVan_Wrong);
      return false;
    }
    if (!tuVan.Ten) {
      refNotification.current.showNotification("warning", Message.TuVan_Wrong);
      return false;
    }
    return true;
  };

  const sendTuVan = async () => {
    if (ValidateFormTuVan()) {
      let res: IResponseMessage = await TuVanService.CreateItem(tuVan);
      if (res && res.Success) {
        refNotification.current.showNotification("success", res.Message);
        setTuVan({ Email: "", GioiTinh: "0", NoiDung: "", Sdt: "", Ten: "" });
        document.querySelectorAll("input").forEach((item: any) => {
          item.value = "";
        });
        document.querySelector("textarea").value = "";
      }
    }
  };

  return (
    <>
      <CNotification ref={refNotification} />
      <div
        className="main_sub_detal mt-5"
        style={{ padding: "10px 0 30px 0 " }}
      >
        <div
          id="constate_before"
          className="container-xl d-flex justify-content-between"
        >
          <div id="constate_after_img" style={{ width: "40%" }}>
            <img
              loading="lazy"
              src={formImg}
              style={{ width: "100%", height: "603px" }}
              alt="..."
            />
          </div>
          <div id="constate_after" style={{ width: "55%", textAlign: "start" }}>
            <h4
              className="text-danger tieu-de"
              style={{ wordWrap: "break-word" }}
            >
              ĐĂNG KÍ TƯ VẤN MIỄN PHÍ
            </h4>
            <div className="input-group flex-nowrap mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Họ và Tên(*)"
                aria-label="Username"
                aria-describedby="addon-wrapping"
                onChange={(e: any) => {
                  onChangeFormTuVan("Ten", e.target.value);
                }}
              />
            </div>
            <p className="mt-3" style={{ fontWeight: "bold" }}>
              Giới tính
            </p>
            <div className="form-check form-check-inline dd-aa-aba">
              <input
                className="tt-ds-asa-ava"
                type="radio"
                name="inlineRadioOptions"
                id="gender1"
                checked={tuVan.GioiTinh == "0" ? true : false}
                defaultValue="option1"
                onChange={(e: any) => {
                  onChangeFormTuVan("GioiTinh", "0");
                }}
              />
              <label className="form-check-label da-sac-scd" htmlFor="gender1">
                Nam
              </label>
            </div>
            <div className="form-check form-check-inline dd-aa-aba">
              <input
                className="tt-ds-asa-ava"
                type="radio"
                name="inlineRadioOptions"
                id="gender2"
                defaultValue="option2"
                onChange={(e: any) => {
                  onChangeFormTuVan("GioiTinh", "1");
                }}
              />
              <label className="form-check-label" htmlFor="gender2">
                Nữ
              </label>
            </div>
            <div className="form-check form-check-inline dd-aa-aba">
              <input
                className="tt-ds-asa-ava"
                type="radio"
                name="inlineRadioOptions"
                id="gender3"
                defaultValue="option2"
                onChange={(e: any) => {
                  onChangeFormTuVan("GioiTinh", "2");
                }}
              />
              <label className="form-check-label" htmlFor="gender3">
                Khác
              </label>
            </div>
            <div className="input-group flex-nowrap mt-2">
              <input
                type="text"
                className="form-control"
                placeholder="Số điện thoại(*)"
                aria-label="PhoneNumber"
                aria-describedby="addon-wrapping"
                onChange={(e: any) => {
                  onChangeFormTuVan("Sdt", e.target.value);
                }}
              />
            </div>
            <div className="input-group flex-nowrap mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Email(*)"
                aria-label="Email"
                aria-describedby="addon-wrapping"
                onChange={(e: any) => {
                  onChangeFormTuVan("Email", e.target.value);
                }}
              />
            </div>
            <div className="mt-3">
              <textarea
                className="form-control"
                rows={3}
                placeholder="Đặt câu hỏi của bạn tại đây ....(*)"
                defaultValue={""}
                onChange={(e: any) => {
                  onChangeFormTuVan("NoiDung", e.target.value);
                }}
              />
            </div>
            <p
              className="mt-3 text-danger"
              style={{
                fontSize: "calc(1rem * 0.8)",
                textAlign: "justify",
                fontStyle: "italic",
                fontWeight: "bold",
              }}
            >
              (*): Thông tin bắt buộc
            </p>
            <div className="d-flex justify-content-center align-items-center">
              <button
                onClick={() => {
                  sendTuVan();
                }}
                className="header_btn bg-danger text-light mt-3"
                style={{ width: "120px" }}
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(TuVan);
