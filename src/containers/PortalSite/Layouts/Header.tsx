import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { connect } from "react-redux";
import logo from "assets/img/logo.jpg";
import { useHistory, useLocation } from "react-router-dom";
import MenuService from "services/MenuService";
import { IUserInfo } from "common/Models";
import { Actions } from "store/Global/Action";
import { Storage } from "common/Storage";
import { Message } from "common/Enums";
import CNotification from "components/CNotification";
const { v4: uuidv4 } = require("uuid");

interface Props {
  global: any;
  UserLogout?: Function;
  GetLoai: any;
  GetToInfoShop: any;
  GetToSocialMedia: any;
}

interface HData {
  Name: String;
  Id: String;
  Code: Number;
  Children: HData[];
  URL: String;
}

interface HTreePortal {
  Data: HData[];
  Message: String;
  StatusCode: Number;
  Success: Boolean;
}

const Header = (props: Props) => {
  const location = useLocation();
  const history = useHistory();
  const [tree, setTree] = useState<HTreePortal>(null);
  const refNotification = useRef<any>();
  const [inputSearch, setInputSearch] = useState("");
  const [name, setName] = useState("");
  const [changeSearch, setChangeSearch] = useState(false);
  let userInfo: IUserInfo = JSON.parse(Storage.getSession("UserInfo"));

  const GoToOtherPage = (page: string) => {
    history.push(page);
    window.scrollTo(0, 0);
  };

  const fetchMXH = () => {
    props.GetToInfoShop();
    props.GetToSocialMedia();
  };

  const TimKiemPage = (page: string) => {
    if (inputSearch) {
      history.push({
        pathname: page,
        state: { inputSearch },
        search: `/${inputSearch}`,
      });
      window.scrollTo(0, 0);
    } else {
      refNotification.current.showNotification(
        "warning",
        "Nhập từ khóa tìm kiếm"
      );
    }
  };

  const changeInputSearch = (e: any) => {
    setInputSearch(e.target.value);
  };

  const fetchTreePortal = useCallback(async () => {
    let response = await MenuService.GetTreePortal();
    setTree(response);
  }, []);

  useEffect(() => {
    fetchTreePortal();
    fetchMXH();
  }, []);

  useEffect(() => {
    if (location.search == "?/sukien") {
      setName("/chinh-dang-chay-bo");
    }
    if (location.search == "?/tintuc") {
      setName("/kien-thuc");
    }
    if (!location.search) {
      setName(location.pathname);
    }
  }, [location.search]);

  const Logout = () => {
    refNotification.current.showNotification("success", `Đăng xuất thành công`);
    props.UserLogout();
    Storage.removeSession("popup");
    history.push("/trang-chu");
  };

  const navbar =
    tree &&
    tree.Data?.map((itemTree: HData, iTree: any) => (
      <Fragment key={uuidv4()}>
        <div className="show_catching">
          <span
            className={`${
              itemTree.URL == name && "lage dumsa"
            }  catching la nav navbar_link sups`}
            onClick={() => {
              GoToOtherPage(itemTree.URL as string);
              setName(itemTree.URL as string);
            }}
          >
            {itemTree.Name}
          </span>
          {itemTree.Children.length > 0 && (
            <div className="hide">
              {itemTree.Children.map((child: any) => (
                <div key={uuidv4()} className="kkk">
                  <p
                    className="la ddd"
                    onClick={() => {
                      GoToOtherPage(child.URL as string);
                    }}
                  >
                    {child.Name}
                  </p>
                  {child.Children.length > 0 && (
                    <div className="hides">
                      {child.Children.map((childrens: HData) => (
                        <div key={uuidv4()}>
                          <p
                            className="la"
                            onClick={() => {
                              GoToOtherPage(childrens.URL as string);
                            }}
                          >
                            {childrens.Name}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        {iTree == tree.Data.length - 1 ? (
          <></>
        ) : (
          <div className="menu-vertical"></div>
        )}
      </Fragment>
    ));

  const navbarMob =
    tree &&
    tree.Data?.map((tree: HData) => (
      <li key={uuidv4()}>
        <h6
          data-bs-dismiss="offcanvas"
          onClick={() => {
            GoToOtherPage(tree.URL as string);
            setName(tree.URL as string);
          }}
          className={`${tree.URL == name ? "golden" : "unGolden"}`}
        >
          {tree.Name}
        </h6>
        {tree.Children.length > 0 && (
          <div className="row row-cols-2 mb-2 mt-2">
            {tree.Children.map((childe: any) => {
              return (
                <div
                  data-bs-dismiss="offcanvas"
                  key={uuidv4()}
                  onClick={() => {
                    GoToOtherPage(childe.URL as string);
                  }}
                  className={`unGolden col chilin`}
                >
                  {childe.Name}
                </div>
              );
            })}
          </div>
        )}
      </li>
    ));

  const cardCount = () => {
    var cardInfo = Storage.getSession("cart-info");
    if (!cardInfo) {
      return 0;
    }
    var arrCardInfo = cardInfo.split(",");
    return arrCardInfo.length;
  };

  const mangXaHoi =
    props.global.InfoShop &&
    props.global.InfoShop.map((value: any) => {
      return (
        <span key={uuidv4()} className="header_top_left_child">
          <span className=" header_top_left_text">
            <i className={`${value.Code}`}></i> {value.Value}
          </span>
        </span>
      );
    });

  const icon =
    props.global.SocialMedia &&
    props.global.SocialMedia.map((value: any) => {
      return (
        <a
          key={uuidv4()}
          href={value.Value}
          className="header_link h-100"
          aria-label="See more"
        >
          <i
            className={`${value.Code}`}
            style={{ verticalAlign: "middle" }}
          ></i>
        </a>
      );
    });

  const searchbarsuv = () => {
    setChangeSearch(!changeSearch);
  };
  return (
    <header
      className="header_portal"
      style={{ height: `${!changeSearch ? "100px" : "150px"}`, overflow: 'hidden' }}
    >
      <CNotification ref={refNotification} />

      <section className="header_portal_top bg-success text-light">
        <section className="container-xl header_top_container d-flex align-items-center justify-content-between">
          <section className="header_top_mobile">
            <section
              id="carouselExampleIndicators"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <section className="carousel-inner">
                <section className="carousel-item active">
                  <span>
                    <i className="bi bi-telephone-fill	"></i>
                  </span>
                  <span className=" header_top_left_text">0914 693 379</span>
                </section>
                <section className="carousel-item">
                  <span>
                    <i className="bi bi-envelope-at-fill"></i>
                  </span>
                  <span className="header_top_left_text">
                    htxsapaagri@gmail.com
                  </span>
                </section>
              </section>
            </section>
          </section>

          <span className="header_top_tab">{mangXaHoi}</span>

          <span className="d-flex gap-2 align-items-center justify-content-center group_icon">
            {icon}
          </span>
        </section>
      </section>
      <section className="container-xl header_bottom">
        <section className="d-flex justify-content-between align-items-center h-100 ">
          <section className="d-flex navbar_container_main ">
            <img src={logo} className="header_bottom_logo" alt="..." />
            {navbar}
          </section>
          <div className="form-search">
            <i className="bi bi-search"></i>
            <input
              type="text"
              className="form-control form-input"
              onChange={(e) => {
                changeInputSearch(e);
              }}
              placeholder="Nhập từ khóa ..."
            />
            <span
              className="left-pan cursor-pointer"
              onClick={() => {
                TimKiemPage("/tim-kiem");
              }}
            >
              Tìm kiếm
            </span>
          </div>

          <div className="d-flex gap-3 align-items-center error_nav">
            <span
              style={{ cursor: "pointer" }}
              className="header_bottom_link position-relative soueby"
              onClick={() => {
                searchbarsuv();
              }}
            >
              <i className="bi bi-search" style={{ fontSize: "1.3rem" }}></i>
            </span>

            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                GoToOtherPage("/gio-hang");
              }}
              className="header_bottom_link position-relative"
            >
              <span
                style={{ fontSize: "calc(1rem*0.7)" }}
                className="position-absolute top-100 start-100 translate-middle badge rounded-pill bg-success"
              >
                {cardCount()}
                {" +"}
                <span className="visually-hidden">unread messages</span>
              </span>
              <i className="bi bi-cart" style={{ fontSize: "1.3rem" }}></i>
            </span>
            {/* )} */}

            {userInfo ? (
              <div className="btn-group ">
                <span
                  data-bs-toggle="dropdown"
                  data-bs-display="static"
                  aria-expanded="false"
                  style={{ cursor: "pointer" }}
                >
                  <i
                    className="bi bi-person-circle"
                    style={{ fontSize: "2rem" }}
                  ></i>
                </span>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={() => {
                        GoToOtherPage("/ca-nhan");
                      }}
                    >
                      Hồ sơ cá nhân
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={() => {
                        GoToOtherPage("/khoa-hoc-ca-nhan");
                      }}
                    >
                      Khóa học của tôi
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        Logout();
                      }}
                      className="dropdown-item"
                      type="button"
                    >
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <button
                onClick={() => {
                  GoToOtherPage("/dang-nhap");
                }}
                className="header_btn bg-success text-light"
                style={{ width: "100px" }}
              >
                Đăng nhập
              </button>
            )}
          </div>
          <div className="header_mob_scene">
            <i
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
              className="bi bi-list"
              style={{ fontSize: "2rem" }}
            ></i>
          </div>

          <div
            className="offcanvas offcanvas-end"
            tabIndex={-1}
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
          >
            <div className="offcanvas-header">
              <h5 id="offcanvasRightLabel">Menu</h5>

              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="ul-gold-uo">{navbarMob}</ul>
              <div className="ul-gold-uo-split mb-3"></div>
              {!userInfo && (
                <ul className="ul-gold-uo">
                  <li>
                    <h6
                      onClick={() => {
                        GoToOtherPage("/dang-ky");
                      }}
                      data-bs-dismiss="offcanvas"
                      className={`${
                        //"/dang-ky"
                        "unGolden"
                      }`}
                    >
                      Đăng ký
                    </h6>
                  </li>
                  <li>
                    <h6
                      onClick={() => {
                        GoToOtherPage("/dang-nhap");
                      }}
                      data-bs-dismiss="offcanvas"
                      className={`${
                        //"/dang-nhap"
                        "unGolden"
                      }`}
                    >
                      Đăng nhập
                    </h6>
                  </li>
                </ul>
              )}
              {userInfo && (
                <ul className="ul-gold-uo">
                  <li>
                    <h6
                      className="unGolden"
                      onClick={() => {
                        GoToOtherPage("/ca-nhan");
                      }}
                      data-bs-dismiss="offcanvas"
                    >
                      Hồ sơ cá nhân
                    </h6>
                  </li>
                  <li>
                    <h6
                      className="unGolden"
                      onClick={() => {
                        GoToOtherPage("/khoa-hoc-ca-nhan");
                      }}
                      data-bs-dismiss="offcanvas"
                    >
                      Khóa học của tôi
                    </h6>
                  </li>
                  <li>
                    <h6
                      onClick={() => {
                        Logout();
                      }}
                      className="unGolden"
                      data-bs-dismiss="offcanvas"
                    >
                      Đăng xuất
                    </h6>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </section>
      </section>

      <div className="searchinhg-su" style={{transition: "0.3s ease-in-out", visibility: "visible", display:'block'}}>
        <div className="container-xl">
          <div className="form-search2">
            <i className="bi bi-search"></i>
            <input
              type="text"
              className="form-control form-input shadow-none"
              onChange={(e) => {
                changeInputSearch(e);
              }}
              placeholder="Nhập từ khóa ..."
            />
            <span
              className="left-pan cursor-pointer"
              onClick={() => {
                TimKiemPage("/tim-kiem");
              }}
            >
              Tìm kiếm
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
const mapState = ({ ...state }) => ({
  global: state.global,
});
const mapDispatchToProps = {
  UserLogout: Actions.UserLogout,
  GetLoai: Actions.GetLoai,
  GetToInfoShop: Actions.GetToInfoShop,
  GetToSocialMedia: Actions.GetToSocialMedia,
};

export default connect(mapState, mapDispatchToProps)(Header);
