import { Storage } from 'common/Storage';
import React, { useEffect, useRef, useState } from 'react'
import { connect } from "react-redux";
import CDynamicTableAjax from "components/CDynamicTableAjax";
import roleListViewJson from 'containers/AdminSite/Pages/User/Role/ListView.json';
import { IAjax } from 'common/Models';
import $ from 'jquery'; 
interface Props {
       
}

const Home = (props: Props) => {  
    return(
        <section className="section dashboard">
            <div className="row">
                <div className="col-md-4">
                <div className="card info-card sales-card">
                    <div className="card-body">
                    <h5 className="card-title">Tiêu đề lớn <span>tiêu đề nhỏ</span></h5>
                    <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-cart" />
                        </div>
                        <div className="ps-3">
                        <h6>150</h6>
                        <span className="small pt-1 fw-bold">150</span> <span className="text-muted small pt-2 ps-1">mô tả</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-md-4">
                <div className="card info-card revenue-card">
                    <div className="card-body">
                    <h5 className="card-title">Tiêu đề lớn <span>tiêu đề nhỏ</span></h5>
                    <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-cart" />
                        </div>
                        <div className="ps-3">
                        <h6>150</h6>
                        <span className="small pt-1 fw-bold">150</span> <span className="text-muted small pt-2 ps-1">mô tả</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-md-4">
                <div className="card info-card customers-card">
                    <div className="card-body">
                        <h5 className="card-title">Tiêu đề lớn <span>tiêu đề nhỏ</span></h5>
                        <div className="d-flex align-items-center">
                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-cart" />
                            </div>
                            <div className="ps-3">
                            <h6>150</h6>
                            <span className="small pt-1 fw-bold">150</span> <span className="text-muted small pt-2 ps-1">mô tả</span>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>               
            </div>
        </section>
    )
}
const mapState = ({ ...state }) => ({
    
});
const mapDispatchToProps = {
    
};

export default connect(mapState, mapDispatchToProps)(Home);