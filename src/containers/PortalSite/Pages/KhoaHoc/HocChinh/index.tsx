import React, { useEffect, useReducer, useRef, useState } from "react";
import { connect } from "react-redux";
import avatar from "assets/img/ava3.png";
import Comment from "../../Comment/HocChinhComment/comment";
import Tree from "react-animated-tree";
import { Link, useLocation } from "react-router-dom";
import { InitState } from "./InitState";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import { Number } from "common/Number";
import { String } from "common/String";
import { IUserInfo } from "common/Models";
import { Storage } from "common/Storage";
import CButton from "components/CButton";
import { useHistory } from "react-router-dom";
import CNotification from "components/CNotification";
import ReactPlayer from "react-player";
const { v4: uuidv4 } = require("uuid");
import screenfull from "screenfull";
import { findDOMNode } from "react-dom";
import Duration from "common/Duration";
const HtmlToReactParser = require("html-to-react").Parser;
const htmlToReactParser = new HtmlToReactParser();

interface Props { }

const HocThu = (props: Props) => {
  const [state, dispatch] = useReducer(Reducer, InitState);
  const [change, setChange] = useState(1);
  const [linkVideo, setLinkVideo] = useState({ URL_Video: "", NoiDung: "" });
  const location = useLocation();
  const [name, setName] = useState("");
  const [newId, setNewId] = useState("");
  const [nopBai, setNopBai] = useState("");
  const history = useHistory();
  const refNotification = useRef<any>();
  const [nameRoush, setNameRoush] = useState([]);
  const [textArea, setTextArea] = useState("");
  const [trangThai, setTrangThai] = useState(false);
  const [show, setshow] = useState(JSON.parse(Storage.getSession("popup")));
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState<any>(0);
  const [seeking, setSeeking] = useState<any>(false);
  const [duration, setDuration] = useState<any>(0);
  const refPlayer = useRef<any>();
  const [chuyenbai, setChuyen] = useState("");
  useEffect(() => {
    default_video();
  }, []);
  const onProgress = (state: any) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };
  const onDuration = (duration: any) => {
    setDuration(duration);
  };
  const handleSeekMouseDown = (e: any) => {
    setSeeking(true);
  };

  const handleSeekChange = (e: any) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = (e: any) => {
    setSeeking(false);
    refPlayer.current.seekTo(parseFloat(e.target.value));
  };
  let userInfo: IUserInfo = JSON.parse(Storage.getSession("UserInfo"));

  const changeContent = (content: number) => {
    setChange(content);
  };
  const ThoiLuongRender = (ThoiLuong: any) => {
    var val = "0";
    if (Number.isInt(ThoiLuong)) {
      val = ThoiLuong + "";
    } else if (Number.isFloat(ThoiLuong)) {
      val =
        (ThoiLuong + "").split(".")[0] + ":" + (ThoiLuong + "").split(".")[1];
    }
    return val;
  };
  const scroll = () => {
    const section = document.querySelector( '#scrool-to' );
    section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
  };
  const GetLinkVideoLyThuyet = async (Id: any) => {
    var link = await Actions.GetLinkVideoLyThuyet(Id);
    setLinkVideo(link);
    scroll();
  };
  const GetLinkVideoThucHanh = async (Id: any) => {
    var link = await Actions.GetLinkVideoThucHanh(Id);
    setLinkVideo(link);
    scroll();
  };

  const GiaoAnLyThuyetRender = () => {
    var element: any = [];
    state.ItemKhoaHocThu.GiaoAnLyThuyet.map((e1: any, ie: any) => {
      element.push(
        <div className="accordion mt-2" id="accordionPanelsStayOpenExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="panelsStayOpen-headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#panelsStayOpen-collapse" + ie}
                aria-expanded="true"
                aria-controls={"panelsStayOpen-collapse" + ie}
              >
                {e1.Name}
              </button>
            </h2>
            <div
              id={"panelsStayOpen-collapse" + ie}
              className="accordion-collapse collapse show"
              aria-labelledby={"panelsStayOpen-heading" + ie}
            >
              <div className="accordion-body">
                {e1.Children.length > 0 &&
                  e1.Children.map((e2: any, ie2: any) => {
                    return (
                      <Tree content={e2.Name}>
                        {
                          <>
                            {e2.Children.length > 0 &&
                              e2.Children.map((e3: any, ie3: any) => {
                                return (
                                  <Tree
                                    open
                                    content={
                                      <div className="play">
                                        <i className="bi bi-play-circle text-danger"></i>{" "}
                                        {ThoiLuongRender(e3.ThoiLuong)}
                                      </div>
                                    }
                                    type={
                                      <span
                                        className="title"
                                        onClick={() => {
                                          if (e3.MienPhi) {
                                            GetLinkVideoLyThuyet(e3.Id);
                                            setName(e3.Name);
                                            setNopBai("");
                                            setNewId(e3.Id);
                                          }
                                        }}
                                      >
                                        {e3.Name}
                                        {e3.MienPhi ? (
                                          <i className="bi bi-eye-fill"></i>
                                        ) : (
                                          <></>
                                        )}
                                      </span>
                                    }
                                  />
                                );
                              })}
                          </>
                        }
                      </Tree>
                    );
                  })}
                {/* <Tree content="main" type="ITEM" canHide open>
                  <Tree content="hello" type={<span className="play"><i className="bi bi-play-circle text-danger"></i>{" "}12:20</span>} canHide />
                  <Tree content="subtree with children" canHide>
                    <Tree content="hello" />
                    <Tree content="sub-subtree with children">
                      <Tree content="child 1" />
                      <Tree content="child 2" />
                      <Tree content="child 3" />
                    </Tree>
                    <Tree content="hello" />
                  </Tree>
                  <Tree content="hello" canHide />
                  <Tree content="hello" canHide />
                </Tree> */}
              </div>
            </div>
          </div>
        </div>
      );
    });
    return element;
  };
  const ActionGiaoAn = (e4: any) => {
    if (e4.ChuaHoc) {
      return <></>;
    }
    if (e4.DaHoc) {
      return (
        <span
          className="text-success title"
          style={{
            marginLeft: "8px",
          }}
          onClick={() => {
            setTrangThai(true);
            setName(e4.Name);
            setNopBai(e4.Id);
            Actions.GetLichSu(location.state.IdLopHoc, e4.Id, 1, dispatch);
          }}
        >
          Hoàn thành
        </span>
      );
    }
    if (e4.DangHoc) {
      var nghiHoc = e4.Name && (e4.Name.trim().toLowerCase() == "nghỉ" || e4.Name.trim().toLowerCase() == "thả lỏng: nghỉ");
      if (nghiHoc) {
        return <span
          onClick={() => {
            //xử lý ở đây
            setName(e4.Name);
            Actions.GetLichSu(location.state.IdLopHoc, e4.Id, 1, dispatch);
            saveFile(e4.Id);
            // Actions.GetKhoaHocThuPortal(location.state.id, dispatch);
          }}
          className="text-danger title"
          style={{
            marginLeft: "8px",
          }}
        >
          Chuyển bài
        </span>
      }
      return (
        <span
          onClick={() => {
            setNopBai(e4.Id);
            setName(e4.Name);
            setNewId(e4.Id);
            GetLinkVideoThucHanh(e4.Id);
            setTrangThai(false);
          }}
          className="text-danger title"
          style={{
            marginLeft: "8px",
          }}
        >
          Nộp bài
        </span>
      );
    }
    return <></>;
  };
  const GiaoAnThucHanh = () => {
    var element: any = [];
    var NodeMacDinhMo =
      state.ItemKhoaHocThu.GiaoAnThucHanh.length > 0
        ? state.ItemKhoaHocThu.GiaoAnThucHanh[0].NodeMacDinhMo
        : null;
    state.ItemKhoaHocThu.GiaoAnThucHanh.map((e1: any, ie: any) => {
      element.push(
        <div className="accordion mt-2" id="accordionPanelsStayOpenExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="panelsStayOpen-headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#panelsStayOpen-collapse" + ie}
                aria-expanded="true"
                aria-controls={"panelsStayOpen-collapse" + ie}
              >
                {e1.Id == NodeMacDinhMo[0] ? <b>{e1.Name}</b> : e1.Name}
              </button>
            </h2>
            <div
              id={"panelsStayOpen-collapse" + ie}
              className="accordion-collapse collapse show"
              aria-labelledby={"panelsStayOpen-heading" + ie}
            >
              <div className="accordion-body">
                {e1.Children.length > 0 &&
                  e1.Children.map((e2: any, ie2: any) => {
                    return (
                      <Tree
                        open={e2.Id == NodeMacDinhMo[1] ? true : false}
                        content={
                          e2.Id == NodeMacDinhMo[1] ? <b>{e2.Name}</b> : e2.Name
                        }
                      >
                        {
                          <>
                            {e2.Children.length > 0 &&
                              e2.Children.map((e3: any, ie3: any) => {
                                return (
                                  <Tree
                                    open={
                                      e3.Id == NodeMacDinhMo[2] ? true : false
                                    }
                                    content={
                                      e3.Id == NodeMacDinhMo[2] ? (
                                        <b>{e3.Name}</b>
                                      ) : (
                                        e3.Name
                                      )
                                    }
                                  >
                                    <>
                                      {e3.Children.length > 0 &&
                                        e3.Children.map((e4: any, ie4: any) => {
                                          return (
                                            <Tree
                                              content={
                                                <div className="play">
                                                  <i className="bi bi-play-circle text-danger"></i>{" "}
                                                  {ThoiLuongRender(
                                                    e4.ThoiLuong
                                                  )}
                                                  {ActionGiaoAn(e4)}
                                                </div>
                                              }
                                              type={
                                                <span>
                                                  <span
                                                    className="title"
                                                    onClick={() => {
                                                      if (e4.MienPhi) {
                                                        GetLinkVideoThucHanh(
                                                          e4.Id
                                                        );
                                                        setName(e4.Name);
                                                        setNewId(e4.Id);
                                                        setNopBai("");
                                                      }
                                                    }}
                                                  >
                                                    {" "}
                                                    {e4.DaHoc == false &&
                                                      e4.DangHoc == true ? (
                                                      <b>{e4.Name}</b>
                                                    ) : (
                                                      e4.Name
                                                    )}
                                                    {e4.MienPhi ? (
                                                      <i className="bi bi-eye-fill"></i>
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </span>
                                                </span>
                                              }
                                            />
                                          );
                                        })}
                                    </>
                                  </Tree>
                                );
                              })}
                          </>
                        }
                      </Tree>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      );
    });
    return element;
  };

  const contentTab = () => {
    if (change == 1) {
      return (
        <div className="GiaoAnLyThuyet">
          {state.ItemKhoaHocThu && GiaoAnLyThuyetRender()}
        </div>
      );
    } else if (change == 2) {
      return (
        <div className="GiaoAnLyThuyet">
          {state.ItemKhoaHocThu && GiaoAnThucHanh()}
        </div>
      );
    }
  };

  const video_thuchanh = async (ids: any) => {
    var link = await Actions.GetLinkVideoThucHanh(ids);
    setLinkVideo(link);
  };

  const video_lythuyet = async (ids: any) => {
    var link = await Actions.GetLinkVideoLyThuyet(ids);
    setLinkVideo(link);
  };

  async function default_video() {
    let data = await Actions.GetKhoaHocThuPortal(location.state.id, dispatch);
    if (show) {
      Actions.GetPopup(dispatch);
    }
    if (data && data.GiaoAnLyThuyet.length > 0) {
      for (var i = 0; i < data.GiaoAnLyThuyet.length; i++) {
        if (data.GiaoAnLyThuyet[i].MienPhi) {
          await video_lythuyet(data.GiaoAnLyThuyet[i].Id);
          break;
        }
        if (data.GiaoAnLyThuyet[i].Children.length > 0) {
          for (var j = 0; j < data.GiaoAnLyThuyet[i].Children.length; j++) {
            if (data.GiaoAnLyThuyet[i].Children[j].MienPhi) {
              await video_lythuyet(data.GiaoAnLyThuyet[i].Children[j].Id);
              break;
            }
            if (data.GiaoAnLyThuyet[i].Children[j].Children.length > 0) {
              for (
                var z = 0;
                z < data.GiaoAnLyThuyet[i].Children[j].Children.length;
                z++
              ) {
                if (data.GiaoAnLyThuyet[i].Children[j].Children[z].MienPhi) {
                  await video_lythuyet(
                    data.GiaoAnLyThuyet[i].Children[j].Children[z].Id
                  );
                  break;
                }
              }
            }
          }
        }
      }
    } else if (data && data.GiaoAnThucHanh.length > 0) {
      for (var i = 0; i < data.GiaoAnThucHanh.length; i++) {
        if (data.GiaoAnThucHanh[i].MienPhi) {
          await video_thuchanh(data.GiaoAnThucHanh[i].Id);
          break;
        }
        if (data.GiaoAnThucHanh[i].Children.length > 0) {
          for (var j = 0; j < data.GiaoAnThucHanh[i].Children.length; j++) {
            if (data.GiaoAnThucHanh[i].Children[j].MienPhi) {
              await video_thuchanh(data.GiaoAnThucHanh[i].Children[j].Id);
              break;
            }
            if (data.GiaoAnThucHanh[i].Children[j].Children.length > 0) {
              for (
                var z = 0;
                z < data.GiaoAnThucHanh[i].Children[j].Children.length;
                z++
              ) {
                if (data.GiaoAnThucHanh[i].Children[j].Children[z].MienPhi) {
                  await video_thuchanh(
                    data.GiaoAnThucHanh[i].Children[j].Children[z].Id
                  );
                  break;
                }

                for (
                  var l = 0;
                  l <
                  data.GiaoAnThucHanh[i].Children[j].Children[l].Children
                    .length;
                  l++
                ) {
                  if (
                    data.GiaoAnThucHanh[i].Children[j].Children[z].Children[l]
                      .MienPhi
                  ) {
                    await video_thuchanh(
                      data.GiaoAnThucHanh[i].Children[j].Children[z].Children[l]
                        .Id
                    );
                    break;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  const goToDetailPage = () => {
    history.push("/khoa-hoc-ca-nhan");
    window.scrollTo(0, 0);
  };
  const changeFile = (e: any) => {
    try {
      switch (e.target.name) {
        case "fileName":
          let newNames = [...nameRoush, e.target.files[0]];
          setNameRoush(newNames);
          break;

        default:
          refNotification.current.showNotification(
            "warning",
            "File không hợp lệ"
          );
      }
    } catch (error) {
      refNotification.current.showNotification("warning", "File không hợp lệ");
    }
  };

  const saveFile = async (Id?: any) => {
    if (Id) {
      let objectData = {
        IdLopHoc: location.state.IdLopHoc,
        IdGiaoAn: Id,
        LoaiGiaoAnLy: "1",
        NguoiNopBai: userInfo.UserName,
        NoiDungNopBai: "Nghỉ",
      };
      await Actions.SaveFiles(nameRoush, objectData);
      await Actions.GetKhoaHocThuPortal(location.state.id, dispatch);
      refNotification.current.showNotification("success", "Thao tác thành công");
    } else {
      let objectData = {
        IdLopHoc: location.state.IdLopHoc,
        IdGiaoAn: nopBai,
        LoaiGiaoAnLy: "1",
        NguoiNopBai: userInfo.UserName,
        NoiDungNopBai: textArea,
      };
      await Actions.SaveFiles(nameRoush, objectData);
      await Actions.GetKhoaHocThuPortal(location.state.id, dispatch);
      refNotification.current.showNotification("success", "Nộp bài thành công");
    }

  };

  const removeFile = (index: any) => {
    let data = [...nameRoush];
    data.splice(index, 1);
    setNameRoush([...data]);
  };
  const fileDiv =
    nameRoush &&
    nameRoush.length > 0 &&
    nameRoush.map((value: any, index: any) => {
      return (
        <div key={uuidv4()} className="fileDiv">
          <div>
            <i className="bi bi-check-circle-fill text-success x-c-ftext"></i>
            {" " + String.stringL(value.name)}
          </div>
          <div
            onClick={() => {
              removeFile(index);
            }}
          >
            <i className="bi bi-x"></i>
          </div>
        </div>
      );
    });

  const downloadEmployeeData = (url: any, name: any) => {
    fetch(url).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = name;
        a.click();
      });
    });
  };

  const fileDivLichSu =
    state.ItemLichSu &&
    state.ItemLichSu.por_LopHoc_HocVien_FileNopBais &&
    state.ItemLichSu.por_LopHoc_HocVien_FileNopBais.length > 0 &&
    state.ItemLichSu.por_LopHoc_HocVien_FileNopBais.map((value: any) => {
      return (
        <p
          key={uuidv4()}
          className="fileDiv"
          onClick={() => {
            downloadEmployeeData(
              String.fileUrl(value.URL_FileNopBai),
              value.TieuDeFile
            );
          }}
        >
          {value.TieuDeFile}
        </p>
      );
    });
  const NopBaiSauSoTieng = (soTieng: any) => {
    if (
      new Date().getHours() -
      new Date(state.ItemLichSu.CreatedDateTime).getHours() >=
      soTieng
    ) {
      return false;
    }
    return true;
  };

  const popup = () => {
    Storage.setSession("popup", false);
    setshow(false);
  };
  const video = () => {
    let endPoint = String.video_endPoint(
      linkVideo.URL_Video ? linkVideo.URL_Video : ""
    );
    return (
      <div id="scrool-to">
        {linkVideo && <h4>{name}</h4>}
        <div className="iframe-security">
          {endPoint ? (
            <ReactPlayer
              ref={refPlayer}
              onProgress={onProgress}
              onDuration={onDuration}
              playing={playing}
              width="100%"
              height="432px"
              url={String.video(linkVideo.URL_Video ? linkVideo.URL_Video : "")}
            />
          ) : (
            <></>
          )}
          <div className="row">
            <div className="col-sm-10">
              <input
                style={{ width: "100%" }}
                type="range"
                min={0}
                max={1}
                step="any"
                value={played}
                onMouseDown={handleSeekMouseDown}
                onChange={handleSeekChange}
                onMouseUp={handleSeekMouseUp}
              />
            </div>
            <div className="col-sm-2">
              <Duration className={""} seconds={duration * played} />:
              <Duration className={""} seconds={duration} />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <button
                className="el-button el-button--primary el-button--small bg-danger no-border"
                onClick={() => {
                  setPlaying(false);
                }}
              >
                <i className="bi bi-stop-circle"></i> Dừng lại
              </button>
              <button
                className="el-button el-button--primary el-button--small bg-danger no-border"
                onClick={() => {
                  setPlaying(true);
                }}
              >
                <i className="bi bi-play-circle"></i> Bắt đầu
              </button>
              <button
                className="el-button el-button--primary el-button--small bg-danger no-border"
                onClick={() => {
                  let element: any = findDOMNode(refPlayer.current);
                  screenfull.request(element);
                }}
              >
                <i className="bi bi-arrows-fullscreen"></i> Toàn màn hình
              </button>
            </div>
          </div>
        </div>
        <div className="mb-2">
          <span className="doContent">Nội dung</span>
        </div>
        {htmlToReactParser.parse(linkVideo.NoiDung)}
      </div>
    );
  };
  return (
    <>
      <CNotification ref={refNotification} />

      {show && (
        <div className="show_su_kien_dien_ra">
          <div
            onClick={() => {
              popup();
            }}
            className="hide_su_kien"
          ></div>
          <div className="main_show_su_kien">
            <div className="d-flex justify-content-between">
              <h4
                className="text-danger tieu-de text-center"
                style={{ wordWrap: "break-word" }}
              >
                Lời dặn từ Coach Lê Quang with Love
              </h4>
              <i
                className="bi bi-x-lg text-danger cursor-pointer"
                onClick={() => {
                  popup();
                }}
              ></i>
            </div>
            <div className="text-center noti-popup">
              {htmlToReactParser.parse(state.DataPopup.Value)}
            </div>
          </div>
        </div>
      )}

      <div className="text-center title-khoahoc-thu">
        <p>{state.ItemKhoaHocThu && state.ItemKhoaHocThu.TieuDe}</p>
      </div>
      <div className="container">
        <div className="row mt-4">
          <div className="col-sm-7 mb-3">
            {nopBai && trangThai ? (
              <div className="Card-Hoc">
                <div className="col-md-12">
                  <h2>{name}</h2>
                  {NopBaiSauSoTieng(2) ? (
                    <>
                      <div className="text-center">
                        <p>
                          Bài tập đã được nộp. Vui lòng đợi giáo viên xử lý !
                        </p>
                        <h3></h3>
                      </div>
                    </>
                  ) : (
                    <>
                      <p>Giảng viên: {state.ItemLichSu.NguoiNhanXet}</p>
                      <div className="row">
                        <span className="col-sm-7">
                          Điểm số:{" "}
                          {state.ItemLichSu.Diem == 0 ? (
                            <span className="text-danger">
                              {state.ItemLichSu.Diem}
                            </span>
                          ) : (
                            <span>
                              {state.ItemLichSu.Diem}/100 -{" "}
                              <span className="diem-so-span">
                                {(state.ItemLichSu.Diem / 100) * 100}%
                              </span>
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="split-diem-sos mt-3 mb-2"></div>
                      <h5 className="mt-3">Giáo viên nhận xét :</h5>
                      <p className="text-jusitfy">
                        {state.ItemLichSu.NoiDungNhanXet}
                      </p>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="Card-Hoc">{video()}</div>
            )}

            {userInfo ? <Comment id={location.state.IdLopHoc} /> : <></>}
          </div>
          <div className="col-sm-5 mb-4">
            {nopBai && !trangThai && (
              <>
                <div className="Card-Hoc">
                  <div className="col-md-12">
                    <p className="d-flex justify-content-between">
                      <span className="nop-bai-diem-so">Học viên nộp bài</span>
                      <span
                        className="text-danger chua-nop-diem-so cursor-pointer"
                        onClick={() => {
                          setNopBai("");
                          setNameRoush([]);
                        }}
                      >
                        Xem giáo án
                      </span>
                    </p>
                    {fileDiv}
                    <div className="tao-moi-diem-so">
                      <p className="text-center">
                        <i className="bi bi-journal-plus"></i> Thêm file{" "}
                        <input
                          type={"file"}
                          name={"fileName"}
                          onChange={(e) => {
                            changeFile(e);
                          }}
                        />
                      </p>
                    </div>
                    {nameRoush && nameRoush.length > 0 && (
                      <textarea
                        onChange={(e) => {
                          setTextArea(e.target.value);
                        }}
                        placeholder="Nội dung nộp bài"
                        className="mt-3 textarea-coo col-12"
                      />
                    )}
                    {nameRoush && nameRoush.length > 0 && (
                      <CButton
                        title="Nộp bài"
                        className={"col-12 mt-1 bg-danger no-border"}
                        onClick={() => {
                          saveFile();
                          setNopBai("");
                          setNameRoush([]);
                          setTrangThai(false);
                        }}
                      />
                    )}
                  </div>
                </div>
              </>
            )}
            {!nopBai && !trangThai && (
              <div className="Card-Hoc">
                <div className="d-flex justify-content-between">
                  <div className="d-flex gap-4">
                    <p
                      onClick={() => changeContent(1)}
                      className={`${change == 1 ? "doContent" : "unDoContent"}`}
                    >
                      Giáo án lý thuyết
                    </p>
                    <p
                      onClick={() => changeContent(2)}
                      className={`${change == 2 ? "doContent" : "unDoContent"}`}
                    >
                      Giáo án thực hành
                    </p>
                  </div>
                  <span
                    className={"text-danger chua-nop-diem-so cursor-pointer"}
                    onClick={() => {
                      goToDetailPage();
                    }}
                  >
                    Quay lại
                  </span>
                </div>
                <div className="fixed-contenttab">{contentTab()}</div>
              </div>
            )}
            {nopBai && trangThai && (
              <>
                <div className="Card-Hoc">
                  <div className="col-md-12">
                    <p className="d-flex justify-content-between">
                      <span className="nop-bai-diem-so">Nộp bài</span>
                      <span
                        className="text-danger chua-nop-diem-so cursor-pointer"
                        onClick={() => {
                          setNopBai("");
                          setNameRoush([]);
                          setTrangThai(false);
                        }}
                      >
                        Xem giáo án
                      </span>
                    </p>
                    {fileDivLichSu}
                    {/* <div className="tao-moi-diem-so">
                      <p className="text-center">
                        <i className="bi bi-journal-plus"></i> Thêm file{" "}
                        <input
                          type={"file"}
                          name={"fileName"}
                          onChange={(e) => {
                            changeFile(e);
                          }}
                        />
                      </p>
                    </div> */}

                    <textarea
                      disabled
                      onChange={(e) => {
                        setTextArea(e.target.value);
                      }}
                      value={state.ItemLichSu.NoiDungNopBai}
                      placeholder="Nội dung nộp bài"
                      className="mt-3 textarea-coo col-12"
                    />

                    {/* {nameRoush && nameRoush.length > 0 && (
                      <CButton
                        title="Nộp bài"
                        className={"col-12 mt-1 bg-danger no-border"}
                        onClick={() => {
                          saveFile();
                        }}
                      />
                    )} */}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(HocThu);
