import React, { useEffect, useReducer, useRef, useState } from "react";
import { connect } from "react-redux";
import { InitState } from "./InitState";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import { IUserInfo } from "common/Models";
import { Storage } from "common/Storage";
import { Guid, Message } from "common/Enums";
import CNotification from "components/CNotification";
import { String } from "common/String";
import { useHistory } from "react-router-dom";

interface Props {}

const CaNhan = (props: Props) => {
  const [change, setChange] = useState(1);
  const [state, dispatch] = useReducer(Reducer, InitState);
  let userInfo: IUserInfo = JSON.parse(Storage.getSession("UserInfo"));
  const history = useHistory();
  const [input, setInput] = useState({
    FullName: "",
    Phone: "",
    Address: "",
    Note: "",
  });
  const refNotification = useRef<any>();
  const onChanges = (num: number) => {
    setChange(num);
  };

  const GoToOtherPage = (page: string, id: string, search: string, IdLopHoc:any ,IdMonHoc: any) => {
    history.push({
      pathname: page,
      state: { id: id, IdLopHoc: IdLopHoc, IdMonHoc:IdMonHoc },
      search: `/${search}`,
    });
    window.scrollTo(0, 0);
  };

  const onFormUser = (e: any, name: any) => {
    setInput({
      ...input,
      [name]: e.target.value,
    });
  };

  const checkValidate = () => {
    if (!input.FullName) {
      refNotification.current.showNotification("warning", "Họ và tên trống");
      return false;
    }
    if (!input.Address) {
      refNotification.current.showNotification("warning", "Địa chỉ trống");
      return false;
    }
    if (!input.Phone) {
      refNotification.current.showNotification(
        "warning",
        "Số điện thoại trống"
      );
      return false;
    }
    refNotification.current.showNotification("success", "Cập nhật thành công ");
    return true;
  };

  const save = () => {
    if (checkValidate()) {
      Actions.saveUser(input);
    }
  };

  const GoToDetailPage = (page: string, id: string, search: string) => {
    history.push({
      pathname: page,
      state: { id: id },
      search: `/${search}`,
    });
    window.scrollTo(0, 0);
  };

  const fetch = async () => {
    let res = await Actions.GetIteamuser(userInfo.UserId, dispatch);
    setInput(res);
  };
  useEffect(() => {
    Actions.GetLichSuKhoaHoc(dispatch);
    Actions.GetDachSachKhoaHoc(dispatch);
    fetch();
  }, []);

  return (
    <div style={{minHeight:"80vh"}}>
      <CNotification ref={refNotification} />
      <div className="container-sm container-canhan">
        <div className="row justify-content-between w-100 m-0">
          <div className="col-md-3">
            <ul className="w-100 p-0">
              <li
                className={`li-canhan ${change === 1 && "li-canhan-active"}`}
                onClick={() => {
                  onChanges(1);
                }}
              >
                <i className="bi bi-person-fill"></i> Tài Khoản
              </li>
              <li
                className={`li-canhan ${change === 2 && "li-canhan-active"}`}
                onClick={() => {
                  onChanges(2);
                }}
              >
                <i className="bi bi-cart-fill"></i> Lịch sử giao dịch
              </li>
              <li
                className={`li-canhan ${change === 3 && "li-canhan-active"}`}
                onClick={() => {
                  onChanges(3);
                }}
              >
                <i className="bi bi-file-earmark-lock2-fill"></i> Mật khẩu và
                bảo mật
              </li>
            </ul>
          </div>

          <div className="col-sm-12 col-md-9">
            {change === 1 && (
              <div className="tai-khoan-ca-nhan">
                <h3 className="mb-3">Tổng quan</h3>
                <p className="mb-1">Họ và tên: Dương Đức Anh</p>
                <p className="mb-1">Email: duongdoican@gmail.com</p>
                <p className="mb-1">Ngày tham gia: 23 tháng 12 năm 2023</p>
                <p className="mb-3">Đã tham gia: 6 khóa học - 3 sự kiện</p>
                {/* <div className="split-avat"></div> */}
                {/* <div className="d-flex align-items-center mb-3">
                  <div className="img-canhan">
                    <img
                      width={200}
                      height={200}
                      className="child-img-canhan"
                      src={profile}
                    />
                  </div>
                  <button className="btn-avatar-canhan">
                    Sửa ảnh đại diện
                  </button>
                  <div className="split-2-aba"></div>
                  <div className="right-text-canhan">
                    <p>Vui lòng chọn ảnh nhỏ hơn 5MB</p>
                    <p>Chọn hình ảnh phù hợp, không phản cảm</p>
                  </div>
                </div> */}
                <div className="split-avat mb-3"></div>
                <h3 className="mb-3">Cập nhật thông tin</h3>
                <div className="col-sm-4">
                  <label>Họ và tên</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Họ và tên"
                    aria-label="Name"
                    value={input.FullName}
                    onChange={(e: any) => {
                      onFormUser(e, "FullName");
                    }}
                    aria-describedby="basic-addon1"
                  ></input>
                  <label>Số điện thoại</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Số điện thoại"
                    aria-label="Phone"
                    value={input.Phone}
                    onChange={(e: any) => {
                      onFormUser(e, "Phone");
                    }}
                    aria-describedby="basic-addon1"
                  ></input>
                  <label>Địa chỉ</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Địa chỉ"
                    aria-label="Address"
                    aria-describedby="basic-addon1"
                    value={input.Address}
                    onChange={(e: any) => {
                      onFormUser(e, "Address");
                    }}
                  ></input>
                  <label>Ghi chú</label>
                  <textarea
                    className="form-control mb-2"
                    placeholder="Địa chỉ"
                    aria-label="Address"
                    aria-describedby="basic-addon1"
                    value={input.Note}
                    onChange={(e: any) => {
                      onFormUser(e, "Note");
                    }}
                  ></textarea>
                  <button
                    type="button"
                    onClick={() => {
                      save();
                    }}
                    className="btn btn-danger"
                  >
                    Lưu thay đổi
                  </button>
                </div>
              </div>
            )}
            {change == 2 && (
              <div className="tai-khoan-ca-nhan">
                <h3 className="mb-2">Lịch sử mua khóa học</h3>
                <p className="mb-3">
                  Hiển thị thông tin các khóa học bạn đã mua
                </p>
                <div className="split-avat mb-3"></div>
                {state.DataLichSuGiaoDich.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table align-middle text-center">
                      <thead className="table-danger">
                        <tr>
                          <th scope="col">Stt</th>
                          <th scope="col">Khóa học</th>
                          <th scope="col">Học phí</th>
                          <th scope="col">Giảm giá</th>
                          <th scope="col">Thời hạn</th>
                          <th scope="col">Miễn phí</th>
                        </tr>
                      </thead>
                      <tbody className="table-light table-striped">
                        {state.DataLichSuGiaoDich &&
                          state.DataLichSuGiaoDich.map(
                            (value: any, index: any) => {
                              return (
                                <tr>
                                  <td>{index + 1}</td>
                                  <td className="text-start">{value.TieuDe}</td>
                                  <td>{String.num(value.HocPhiGoc)}₫</td>
                                  <td>{String.num(value.HocPhiGiamGia)}₫</td>
                                  <td>{value.ThoiHan} tháng</td>
                                  <td>{value.ThoiHanTruyCapMienPhi} tháng</td>
                                </tr>
                              );
                            }
                          )}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <h6 className="text-center">Chưa có giao dịch</h6>
                )}
              </div>
            )}
            {change == 3 && (
              <div className="tai-khoan-ca-nhan">
                <h3 className="mb-2">Mật khẩu & Bảo mật</h3>
                <div className="split-avat mb-3"></div>
                <div className="d-flex align-items-center mb-3">
                  <div>
                    <h5 className="mb-3">Đổi mật khẩu</h5>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Mật khẩu mới"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    ></input>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nhập lại mật khẩu"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    ></input>
                  </div>

                  <div className="split-2-abaa"></div>
                  <div className="right-text-canhan">
                    <p>Phải từ 8 ký tự trở lên</p>
                    <p>
                      Phải có ít nhất 1 chữ in hoa, 1 số và 1 ký tự đặc biệt
                    </p>
                  </div>
                </div>
                <button type="button" className="btn btn-danger">
                  Lưu thay đổi
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(CaNhan);
