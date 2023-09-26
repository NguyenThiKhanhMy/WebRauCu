import React, { useEffect, useReducer, useRef, useState } from "react";
import { connect } from "react-redux";
import { InitState } from "./InitState";
import { Actions } from "./Action";
import { Reducer } from "./Reducer";
import { String } from "common/String";
interface Props {}


const ThanhTichHocVien = (props: Props) => {
    const [state, dispatch] = useReducer(Reducer, InitState);
    useEffect(() => {
        Actions.GetChiTiet(dispatch);
    }, []);
    const ContentRender = () => {
        let html:any = [];
        for(let i = 0;i < state.DataItems.length;i++)
        {
            let giaichayHTML = <h4 className="text-center bold mb-3">{state.DataItems[i].TenGiaiChay}</h4>;
            let tieudeHTML = <h5 className="text-center bold mb-3">{state.DataItems[i].TieuDe}</h5>
            let noidungHTML = <p className="text-center mb-3">{state.DataItems[i].NoiDung}</p>
            let anhGioiThieuHTML:any = [];
            if(state.DataItems[i].URL_AnhGioiThieu1 && state.DataItems[i].URL_AnhGioiThieu2)
            {
                anhGioiThieuHTML.push(<>
                    <div className="row mb-3">
                        <div className="col-sm-6 text-center">
                            <img width={"100%"} height={"auto"} src={String.fileUrl(state.DataItems[i].URL_AnhGioiThieu1)} alt="Ảnh giới thiệu 1"/>
                        </div>
                        <div className="col-sm-6 text-center">
                            <img width={"100%"} height={"auto"} src={String.fileUrl(state.DataItems[i].URL_AnhGioiThieu2)} alt="Ảnh giới thiệu 2"/>
                        </div>
                    </div>
                </>)
            }
            else
            {
                if(state.DataItems[i].URL_AnhGioiThieu1)
                {
                    anhGioiThieuHTML.push(<>
                        <div className="row mb-3">
                            <div className="col-sm-12 text-center">
                                <img width={"100%"} height={"auto"} src={String.fileUrl(state.DataItems[i].URL_AnhGioiThieu1)} alt="Ảnh giới thiệu 1"/>
                            </div>
                        </div>
                    </>)
                }
                else if(state.DataItems[i].URL_AnhGioiThieu2)
                {
                    anhGioiThieuHTML.push(<>
                        <div className="row mb-3">
                            <div className="col-sm-12 text-center">
                                <img width={"100%"} height={"auto"} src={String.fileUrl(state.DataItems[i].URL_AnhGioiThieu2)} alt="Ảnh giới thiệu 2"/>
                            </div>
                        </div>
                    </>)
                }
            }
            html.push(<>
                {giaichayHTML}
                {anhGioiThieuHTML}
                {tieudeHTML}
                {noidungHTML}
                <hr/>
            </>)
        }
        return html;
    }
    return (
        <div className="container mt-3 mb-3">
            <div id="main_newss_fat">
                <div className="container main_newss d-dex-f mt-3">
                    <div className="neil-ch">
                        <h4 className="text-center text-danger">THÀNH TÍCH HỌC VIÊN</h4>
                    </div>
                    <h4 className="text-uppercase bold-asu-aa">THÀNH TÍCH HỌC VIÊN ĐĂNG QUANG MARATHON</h4>
                    <p className="mb-2 texxt-er">
                        {String.date(new Date())} 
                    </p>
                    {ContentRender()}
                </div>
                <div className="container-xl"></div>
            </div>
        </div>
    );
}
const mapState = ({ ...state }) => ({});
const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(ThanhTichHocVien);