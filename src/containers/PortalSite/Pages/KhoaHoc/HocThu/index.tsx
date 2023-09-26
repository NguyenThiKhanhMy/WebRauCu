import React, { useEffect, useReducer, useRef, useState } from "react";
import { connect } from "react-redux";
import avatar from "assets/img/ava3.png";
import Comment from "../../Comment/HocThuComment/comment";
import Tree from "react-animated-tree";
import { useLocation } from "react-router-dom";
import { InitState } from "./InitState";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import { Number } from "common/Number";
import { String } from "common/String";
import CButton from "components/CButton";
import { useHistory } from "react-router-dom";
import { IUserInfo } from "common/Models";
import { Storage } from "common/Storage";
import ReactPlayer from "react-player";
import screenfull from "screenfull";
import { findDOMNode } from "react-dom";
import Duration from "common/Duration";
const HtmlToReactParser = require("html-to-react").Parser;
const htmlToReactParser = new HtmlToReactParser();

interface Props {}

const HocThu = (props: Props) => {
  let userInfo: IUserInfo = JSON.parse(Storage.getSession("UserInfo"));
  const [state, dispatch] = useReducer(Reducer, InitState);
  const history = useHistory();
  const [change, setChange] = useState(1);
  const [linkVideo, setLinkVideo] = useState({
    URL_Video: "",
    NoiDung: "",
  });
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState<any>(0);
  const [seeking, setSeeking] = useState<any>(false);
  const [duration, setDuration] = useState<any>(0);
  const refPlayer = useRef<any>()
  const onProgress=(state:any) => {
    if (!seeking) {
      setPlayed(state.played)
    }
  }
  useEffect(() => {
    default_video();
  }, []);
  const scroll = () => {
    const section = document.querySelector( '#scrool-to' );
    section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
  };
  const onDuration=(duration:any) => {
    setDuration(duration)
  }
  const handleSeekMouseDown = (e:any) => {
    setSeeking(true);
  };

  const handleSeekChange = (e:any) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = (e:any) => {
    setSeeking(false);
    refPlayer.current.seekTo(parseFloat(e.target.value));
  };
  const [noiDung, setNoiDung] = useState("");
  const location = useLocation();
  const [name, setName] = useState("");
 
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

  const GiaoAnThucHanh = () => {
    var element: any = [];
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
                                  <Tree open content={e3.Name}>
                                    <>
                                      {e3.Children.length > 0 &&
                                        e3.Children.map((e4: any, ie4: any) => {
                                          return (
                                            <Tree
                                              open
                                              content={
                                                <div className="play">
                                                  <i className="bi bi-play-circle text-danger"></i>{" "}
                                                  {ThoiLuongRender(
                                                    e4.ThoiLuong
                                                  )}
                                                </div>
                                              }
                                              type={
                                                <span
                                                  className="title"
                                                  onClick={() => {
                                                    if (e4.MienPhi) {
                                                      GetLinkVideoThucHanh(
                                                        e4.Id
                                                      );
                                                      setName(e4.Name);
                                                    }
                                                  }}
                                                >
                                                  {e4.Name}
                                                  {e4.MienPhi ? (
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
                                  </Tree>
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

  const contentTab = () => {
    if (change == 1) {
      return (
        <div className="GiaoAnLyThuyet">
          {state.ItemKhoaHocThu && GiaoAnLyThuyetRender()}
          {!state.ItemKhoaHocThu.GiaoAnLyThuyet.length && (
            <div className="mt-3 text-center">Chưa có giáo án</div>
          )}
        </div>
      );
    } else if (change == 2) {
      return (
        <div className="GiaoAnLyThuyet">
          {state.ItemKhoaHocThu && GiaoAnThucHanh()}
          {!state.ItemKhoaHocThu.GiaoAnThucHanh.length && (
            <div className="mt-3 text-center">Chưa có giáo án</div>
          )}
        </div>
      );
    }
  };

  const video_thuchanh = async (ids: any) => {
    var link = await Actions.GetLinkVideoThucHanh(ids);
    var data = {
      NoiDung: link.NoiDung,
      URL_Video: link.URL_Video,
    };
    setLinkVideo(data);
  };

  const video_lythuyet = async (ids: any) => {
    var link = await Actions.GetLinkVideoLyThuyet(ids);
    var data = {
      NoiDung: link.NoiDung,
      URL_Video: link.URL_Video,
    };
    setLinkVideo(data);
  };

  async function default_video() {
    let data = await Actions.GetKhoaHocThuPortal(location.state.id, dispatch);
    if (data && data.GiaoAnLyThuyet.length > 0) {
      for (var i = 0; i < data.GiaoAnLyThuyet.length; i++) {
        if (data.GiaoAnLyThuyet[i].MienPhi) {
          await video_lythuyet(data.GiaoAnLyThuyet[i].Id);
          setNoiDung(data.GiaoAnLyThuyet[i].Id);
          break;
        }
        if (data.GiaoAnLyThuyet[i].Children.length > 0) {
          for (var j = 0; j < data.GiaoAnLyThuyet[i].Children.length; j++) {
            if (data.GiaoAnLyThuyet[i].Children[j].MienPhi) {
              await video_lythuyet(data.GiaoAnLyThuyet[i].Children[j].Id);
              setNoiDung(data.GiaoAnLyThuyet[i].Children[j].Id);
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
                  setNoiDung(data.GiaoAnLyThuyet[i].Children[j].Children[z].Id);
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
              }
            }
          }
        }
      }
    }
  }
  const goToDetailPage = () => {
    history.push({
      pathname: "/khoa-hoc-chi-tiet",
      state: { id: location.state.id },
      search: `/${location.state.id}`,
    });
    window.scrollTo(0, 0);
  };

  const video = () => {
    let endPoint = String.video_endPoint(linkVideo.URL_Video ? linkVideo.URL_Video : "");
    return <>
                  {linkVideo.URL_Video && <h4>{name}</h4>}
                  <div className="iframe-security">
          {
            endPoint ?
            <ReactPlayer ref={refPlayer} onProgress={onProgress} onDuration={onDuration} playing={playing} width="100%" height="432px" url={String.video(linkVideo.URL_Video ? linkVideo.URL_Video : "")} />
            :<></>
          }
          <div className="row">
            <div className="col-sm-10">
              <input style={{ width:"100%" }} type="range" min={0} max={1} step="any" value={played}
                    onMouseDown={handleSeekMouseDown}
                    onChange={handleSeekChange}
                    onMouseUp={handleSeekMouseUp}/>
            </div>
            <div className="col-sm-2">
            <Duration className={""} seconds={duration * played} />:<Duration className={""} seconds={duration} />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <button  className="el-button el-button--primary el-button--small bg-danger no-border" onClick={() => { setPlaying(false) }}><i className="bi bi-stop-circle"></i>{" "}Dừng lại</button>
              <button className="el-button el-button--primary el-button--small bg-danger no-border" onClick={() => { setPlaying(true) }}><i className="bi bi-play-circle"></i>{" "}Bắt đầu</button>
              <button className="el-button el-button--primary el-button--small bg-danger no-border" onClick={() => { let element:any = findDOMNode(refPlayer.current); screenfull.request(element); }}><i className="bi bi-arrows-fullscreen"></i>{" "}Toàn màn hình</button>
            </div>
          </div>
        </div>
              <div className="mb-2">
                <span className="doContent">Nội dung</span>
              </div>
              {linkVideo.NoiDung && htmlToReactParser.parse(linkVideo.NoiDung)}
    </>
  }
  return (
    <>
      <div id="scrool-to" className="text-center title-khoahoc-thu">
        <p>{state.ItemKhoaHocThu && state.ItemKhoaHocThu.TieuDe}</p>
      </div>
      <div className="container">
        <div className="row mt-4">
          <div className="col-sm-7 mb-3">
            <div className="Card-Hoc">
              {video()}
            </div>
            {userInfo ? <Comment id={location.state.id} /> : <></>}
          </div>
          <div className="col-sm-5 mb-4">
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

                <CButton
                  title="Quay lại"
                  className={"mb-1 bg-danger no-border"}
                  onClick={() => {
                    goToDetailPage();
                  }}
                />
              </div>
              <div className="fixed-contenttab">{contentTab()}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(HocThu);
