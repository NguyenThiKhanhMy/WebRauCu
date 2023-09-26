import React, { useEffect, useReducer, useRef, useState } from "react";
import { connect } from "react-redux";
import bg40 from "assets/img/Khoahoc.png";
import { InitState, Item } from "./InitState";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import TreeMenu from "react-simple-tree-menu";
import "react-simple-tree-menu/dist/main.css";
import { Guid, LabelPortal } from "common/Enums";
import { String } from "common/String";
import ReactPaginate from "react-paginate";
import noimage from "assets/img/noimage.png";
import { useHistory, useLocation } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const { v4: uuidv4 } = require("uuid");

interface Props {}

const KhoaHoc = (props: Props) => {
  const [state, dispatch] = useReducer(Reducer, InitState);
  const [name, setName] = useState("");
  const [accName, setAccName] = useState("");
  const [width, setWidth] = useState(window.innerWidth);
  const [reLength, setReLength] = useState(0);
  const kh1 = useRef(null);
  const [itemOffset, setItemOffset] = useState(0);
  const history = useHistory();
  const [theoKhoaHoc, setTheoKhoaHoc] = useState("");
  const pa = useRef(null);
  const pb = useRef(null);
  const [supers, setSupers] = useState(1);
  const location = useLocation();
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  useEffect(() => {
    
    Actions.GetTreeMonHocPortal(dispatch);
    Actions.GetLoaiKhoaHocHoatDongPortal(dispatch);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);
  useEffect(() => {
    if(location.search)
    {
      let id = location.search.split("?")[1];
      for(let i = 0;i < state.TreeMonHoc.length;i++)
      {
        if(state.TreeMonHoc[i].key == id)
        {
          setTheoKhoaHoc(state.TreeMonHoc[i].label)
          break;
        }
        for(let j = 0;j < state.TreeMonHoc[i].nodes.length;j++)
        {
          if(state.TreeMonHoc[i].nodes[j].key == id)
          {
            setTheoKhoaHoc(state.TreeMonHoc[i].nodes[j].label)
            break;
          }
        }
      }
    }
  }, [state.TreeMonHoc])
  useEffect(() => {
    let id = Guid.Empty;
    if(location.search)
    {
      id = location.search.split("?")[1];
    }
    Actions.GetMaKhoaHocPortal(itemOffset, itemOffset + 10, id, dispatch);
  }, []);

  // useEffect(() => {
  //   if (width > 1110 && kh1.current.children.length > 0) {
  //     kh1.current.children[reLength].scrollIntoView({
  //       behavior: "smooth",
  //       block: "nearest",
  //       inline: "start",
  //     });
  //   }
  // }, [reLength]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * 10) % state.Count;
    Actions.GetKhoaHocChangePortal(newOffset, newOffset + 10, dispatch);
  };

  const changeName = (name: string) => {
    setName(name);
  };

  const changeSetaccName = (name: string) => {
    setAccName(name);
  };

  const handleLoaiKhoaHoc = (Id: string) => {
    Actions.GetKhoaHocTheoLoaiKhoaHoc(Id, dispatch);
    setAccName("");
    pb.current.state.focusKey = "";
    pb.current.state.activeKey = "";
    state.Count > 0 && (pa.current.state.selected = 0);
  };

  const colorStar = (danhgia: number) => {
    return (
      <span>
        {[...Array(danhgia)].map(() => (
          <span key={uuidv4()}>
            <i className="bi bi-star-fill co-or" aria-hidden="true"></i>
            &nbsp;
          </span>
        ))}
      </span>
    );
  };

  const noColorStar = (danhgia: number) => {
    return (
      <span>
        {[...Array(5 - danhgia)].map(() => (
          <span key={uuidv4()}>
            <i className="bi bi-star co-or" aria-hidden="true"></i>
            &nbsp;
          </span>
        ))}
      </span>
    );
  };

  const GoToDetailPage = (page: string, id: string, search: string) => {
    history.push({
      pathname: page,
      state: { id: id },
      search: `/${search}`,
    });
    window.scrollTo(0, 0);
  };

  const initialOpenNodes = (tree: any) => {
    let nodes: any = [];
    if (tree && tree.length > 0) {
      for (let i = 0; i < tree.length; i++) {
        nodes.push(tree[i].key);
      }
    }
    return nodes;
  };

  return (
    <div>
      <div className="wrapper_img mb-3">
        <img className="mb-3" src={bg40} width="100%" height="auto"  alt="..."/>
        <h1 className="reszex">KHÓA HỌC</h1>
      </div>
      {/* {width > 1110 && (
        <h4 className="text-danger text-center tieu-de mb-3">
          Loại khóa học
        </h4>
      )} */}

      <div className="container-xl ">
        {width > 980 && (
          <div className="trau-s">
            <h4 className="text-danger text-center tieu-de mb-3 kh-apeperar">
              Chủ đề phổ biến
            </h4>
            <Carousel
              className="mb-5"
              swipeable={false}
              draggable={false}
              showDots={true}
              responsive={responsive}
              arrows={false}
              infinite={true}
              autoPlay={true}
              customTransition={"transform 300ms ease-in-out"}
              autoPlaySpeed={10000}
              rewind={true}
              keyBoardControl={false}
              transitionDuration={500}
              removeArrowOnDeviceType={["tablet", "mobile"]}

              // itemClass=""
            >
              {state.DataHoatDong &&
                state.DataHoatDong.map((value: any, index: any) => {
                  return (
                    <div
                      className="pad-card-1"
                      key={uuidv4()}
                      onClick={() => {
                        handleLoaiKhoaHoc(value.Id);
                        setTheoKhoaHoc(value.TieuDe);
                      }}
                    >
                      <div className="pad-card">{value.TieuDe}</div>
                    </div>
                  );
                })}
            </Carousel>
          </div>
        )}

        {accName ? (
          <h4 className="text-danger text-center tieu-de mb-3 kh-apeperar">
            {accName}
          </h4>
        ) : (
          <h4 className="text-danger text-center tieu-de mb-3">
            {theoKhoaHoc ? theoKhoaHoc : "Khóa học tổng hợp"}
          </h4>
        )}
        <div className="container-khoa-hoc khoa-hoc-header justify-content-between">
          <div className={`kh-search-bar `}>
            <i className={`bi bi-search i-kh-ab`}></i>
            <input
              placeholder="Tìm kiếm"
              className="kh-input"
              onKeyDown={(e) => {
                if (e.keyCode == 13) {
                  Actions.GetKhoaHocSearch(
                    (e.target as HTMLInputElement).value,
                    dispatch
                  );
                  state.Count > 0 && (pa.current.state.selected = 0);
                }
              }}
            />
          </div>
          <div className="kh-contain-result">
            Tìm thấy <span className="kh-result">{state && state.Count}</span>{" "}
            kết quả
          </div>
        </div>
        {width <= 980 && (
          <div className="d-flex gap-2">
            <a
              className="mob-kh-btn"
              data-bs-toggle="offcanvas"
              href="#offcanvasExample"
              role="button"
              aria-controls="offcanvasExample"
              onClick={() => {
                setSupers(1);
              }}
            >
              <i className="bi bi-filter"></i>
            </a>
            <a
              className="mob-kh-btn"
              data-bs-toggle="offcanvas"
              href="#offcanvasExample"
              role="button"
              aria-controls="offcanvasExample"
              onClick={() => {
                setSupers(2);
              }}
            >
              <i className="bi bi-journal-text"></i>
            </a>
          </div>
        )}
        {width <= 980 && (
          <div
            className="offcanvas offcanvas-start"
            tabIndex={-1}
            id="offcanvasExample"
            aria-labelledby="offcanvasExampleLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                {supers == 1 ? "Danh sách môn học" : "Danh sách loại khóa học"}
              </h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <div
                className="accordion pim"
                id="accordionPanelsStayOpenExample"
              >
                {supers == 1 ? (
                  <>
                    <h6 className="kik-kh-kuki">
                      <i className="bi bi-bookmark-star-fill"></i> Môn học
                    </h6>
                    <div className="backgroundColorTreeMenu">
                      <div data-bs-dismiss="offcanvas">
                        <TreeMenu
                          ref={pb}
                          data={state.TreeMonHoc}
                          openNodes={initialOpenNodes(state.TreeMonHoc)}
                          hasSearch={false}
                          onClickItem={({ key, label, ...props }) => {
                            Actions.GetKhoaHocPortal(
                              itemOffset,
                              itemOffset + 10,
                              key,
                              dispatch
                            );

                            changeSetaccName(label);
                            state.Count > 0 && (pa.current.state.selected = 0);
                          }}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h6 className="kik-kh-kuki">
                      <i className="bi bi-bookmark-star-fill"></i> Loại khóa học
                    </h6>
                    <div className="backgroundColorTreeMenu">
                      {state.DataHoatDong &&
                        state.DataHoatDong.map((value: any, index: any) => {
                          return (
                            <div
                              className="pad-card-1"
                              data-bs-dismiss="offcanvas"
                              key={uuidv4()}
                              onClick={() => {
                                handleLoaiKhoaHoc(value.Id);
                                setTheoKhoaHoc(value.TieuDe);
                              }}
                            >
                              <div className="pad-card">{value.TieuDe}</div>
                            </div>
                          );
                        })}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="container-khoa-hoc pb-4">
          {width > 980 && (
            <div className={`side-left-khoa-hoc ji-kh`}>
              <h6 className="kik-kh-kuki">
                <i className="bi bi-bookmark-star-fill"></i> Môn học
              </h6>
              <div className="backgroundColorTreeMenu">
                <TreeMenu
                  ref={pb}
                  data={state.TreeMonHoc}
                  openNodes={initialOpenNodes(state.TreeMonHoc)}
                  hasSearch={false}
                  onClickItem={({ key, label, ...props }) => {
                    Actions.GetKhoaHocPortal(
                      itemOffset,
                      itemOffset + 10,
                      key,
                      dispatch
                    );
                    changeSetaccName(label);
                    state.Count > 0 && (pa.current.state.selected = 0);
                  }}
                />
              </div>
            </div>
          )}

          <div className={`side-right-khoa-hoc `}>
            <div className="row">
              {state.DsKhoaHoc &&
                state.DsKhoaHoc.map((e: any, ie: any) => {
                  return (
                    <div
                      key={uuidv4()}
                      className="col-sm-6"
                      // style={{ paddingRight: 0 }}
                    >
                      <div
                        className="card mb-4 border-popse"
                        style={{ maxWidth: "100%" }}
                      >
                        <div className="row g-0">
                          <div className="col-sm-12">
                            <p
                              className="card-title card-title-kh underline-head-tt mb-1"
                              onClick={() =>
                                GoToDetailPage(
                                  "/khoa-hoc-chi-tiet",
                                  e.Ma as string,
                                  e.Ma as string
                                )
                              }
                            >
                              {e.TieuDe}
                            </p>
                          </div>
                        </div>
                        <div className="row g-0">
                          <div className="col-sm-5 try-kh-ui">
                            {e.URL_AnhDaiDien ? (
                              <img
                                src={String.fileUrl(e.URL_AnhDaiDien)}
                                className="img-kh-cls card-image-kh"
                                alt="..."
                              />
                            ) : (
                              <img
                                src={noimage}
                                className="img-kh-cls "
                                alt="..."
                              />
                            )}
                          </div>
                          <div className="col-sm-7">
                            <div className="card-body card-bodys">
                              <div className="row">
                                <div className="col-sm-8 pl-0-mobi pl-5-mobi">
                                  <p className="card-text popse-khso-p">
                                    <small className="text-muted">
                                      {String.date(e.CreatedDateTime)}
                                    </small>
                                  </p>
                                  <p className="card-text posp-khso text-dark">
                                    {LabelPortal.ThoiHan} <b>{e.ThoiHan}</b>{" "}
                                    tháng
                                  </p>
                                  {e.ThoiHanTruyCapMienPhi &&
                                  e.ThoiHanTruyCapMienPhi !== 0 ? (
                                    <p className="card-text posp-khso text-dark">
                                      {LabelPortal.MienPhiTruyCap}{" "}
                                      <b>{e.ThoiHanTruyCapMienPhi}</b> tháng
                                    </p>
                                  ) : (
                                    <></>
                                  )}
                                  <span className="star-rate">
                                    {colorStar(e.TyLeDanhGia)}
                                    {noColorStar(e.TyLeDanhGia)}
                                  </span>
                                </div>
                                <div className="col-sm-4 pl-0-mobi pl-5-mobi">
                                  <p className="card-text gia-tien-kh-l marginBottom-5">
                                    <span>
                                      {e.HocPhiGiamGia < e.HocPhiGoc &&
                                      e.HocPhiGiamGia > 0 ? (
                                        <span>
                                          {String.num(e.HocPhiGiamGia)}₫
                                        </span>
                                      ) : (
                                        <span>{String.num(e.HocPhiGoc)}₫</span>
                                      )}
                                    </span>
                                  </p>
                                  <span className="gia-tien-giam-gias">
                                    {e.HocPhiGiamGia < e.HocPhiGoc &&
                                      e.HocPhiGiamGia > 0 &&
                                      String.num(e.HocPhiGoc)}
                                    ₫
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="d-flex justify-content-center pagi-kh-os align-items-center mt-3 olksai">
              {state.Count && Math.ceil(state.Count / 10) > 0 ? (
                <ReactPaginate
                  ref={pa}
                  breakLabel="..."
                  nextLabel="Sau"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  pageCount={state.Count && Math.ceil(state.Count / 10)}
                  previousLabel="Trước"
                  className="pagination"
                  initialPage={0}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(KhoaHoc);
