import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { connect } from "react-redux";
const { v4: uuidv4 } = require("uuid");
import { InitState } from "./InitState";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import { String } from "common/String";
import CButton from "components/CButton";
import { IUserInfo } from "common/Models";
import { Storage } from "common/Storage";
import InputComment from "./InputComment";
import CNotification from "components/CNotification";

interface Props {
  id: any;
}

const Comment = (props: Props) => {
  const [item, setItem] = useState(3);
  const [idChange, setIdChange] = useState("");
  const [state, dispatch] = useReducer(Reducer, InitState);
  let userInfo: IUserInfo = JSON.parse(Storage.getSession("UserInfo"));
  const [binhLuan, setBinhLuan] = useState("");
  const [binhLuanChild, setBinhLuanChild] = useState("");
  const refNotification = useRef<any>();

  useEffect(() => {
    Actions.getComment(props.id, dispatch);
  }, []);

  const seeMore = () => {
    setItem(item + 3);
  };

  const SaveMainComment = async () => {
    if (binhLuan.length > 0) {
      let res = await Actions.saveComment(
        props.id,
        userInfo.UserName,
        binhLuan
      );
      if (res && res.Success) {
        Actions.getComment(props.id, dispatch);
        setBinhLuan("");
      }
    }
    if (!binhLuan.length) {
      refNotification.current.showNotification(
        "warning",
        "Bình luận không được để trống"
      );
      return false;
    }
  };
  // heello

  const reload = () => {
    Actions.getComment(props.id, dispatch);
  };

  return (
    <div className="" style={{ backgroundColor: "white", padding: "0px 16px" }}>
      <CNotification ref={refNotification} />

      <h5 className="text-uppercase mt-2 mb-3 text-center">Bình luận</h5>
      <textarea
        className="form-control mb-1 shadow-none"
        placeholder="Bình luận"
        aria-label="BinhLuan"
        aria-describedby="basic-addon1"
        value={binhLuan}
        onChange={(e) => {
          setBinhLuan(e.target.value);
        }}
      />
      <div className="te-sac">
        <CButton
          title="Bình luận"
          className="bg-danger no-border "
          onClick={() => {
            SaveMainComment();
          }}
        />
      </div>

      {state.DataItem &&
        state.DataItem.slice(0, item).map((val: any) => {
          return (
            <div key={uuidv4()}>
              <div
                //
                className="mb-3 mt-2"
                style={{
                  border: "1px solid gainsboro",
                  borderRadius: "5px 5px",
                  backgroundColor: "white",
                }}
              >
                <div
                  id="main_comment"
                  style={{ padding: "10px 10px", paddingBottom: "5px" }}
                >
                  <div className="d-flex mb-2">
                    <div>
                      <p style={{ fontWeight: "bold" }}>{val.TaiKhoan}</p>
                      <p
                        style={{
                          fontSize: "calc(1rem * 0.8)",
                          color: "gray",
                        }}
                      >
                        <i className="bi bi-clock" />{" "}
                        {String.date(val.CreatedDateTime)}
                      </p>
                    </div>
                  </div>
                  <p
                    className="mb-2"
                    style={{
                      textAlign: "justify",
                      fontSize: "calc(1rem * 0.8)",
                    }}
                  >
                    {val.NoiDung}
                  </p>

                  {idChange == val.Id ? (
                    <div className="input-group mb-1">
                      <InputComment
                        reloads={reload}
                        idKhoaHoc={props.id}
                        id={val.Id}
                        value={""}
                      />
                    </div>
                  ) : (
                    <p
                      onClick={() => {
                        setIdChange(val.Id);
                        setBinhLuanChild("");
                      }}
                      id="removeInput"
                      className="mb-1 text-danger text-end"
                      style={{
                        cursor: "pointer",
                        fontSize: "calc(1rem * 0.8)",
                      }}
                    >
                      Phản hồi
                    </p>
                  )}
                </div>

                {val.Child &&
                  val.Child.length > 0 &&
                  val.Child.map((child: any) => {
                    return (
                      <div className="mt-1" key={uuidv4()}>
                        <div className="container-xl">
                          <div className="split-kuys-z"></div>
                        </div>

                        <div
                          id="main_comment"
                          style={{ padding: "10px 26px", paddingBottom: "5px" }}
                        >
                          <div className="d-flex mb-2">
                            <div>
                              <p style={{ fontWeight: "bold" }}>
                                {child.TaiKhoan}
                              </p>
                              <p
                                style={{
                                  fontSize: "calc(1rem * 0.8)",
                                  color: "gray",
                                }}
                              >
                                <i className="bi bi-clock" />{" "}
                                {String.date(child.CreatedDateTime)}
                              </p>
                            </div>
                          </div>
                          <p
                            className="mb-2"
                            style={{
                              textAlign: "justify",
                              fontSize: "calc(1rem * 0.8)",
                            }}
                          >
                            {child.NoiDung}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}

      {state.DataItem &&
      state.Count &&
      state.Count > 3 &&
      item < state.CountSort ? (
        <div className="d-flex justify-content-center align-items-center">
          <span
            onClick={() => {
              seeMore();
            }}
            style={{ cursor: "pointer" }}
          >
            <i className="bi bi-caret-down-fill" /> Xem thêm{" "}
            <i className="bi bi-caret-down-fill" />
          </span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(Comment);
