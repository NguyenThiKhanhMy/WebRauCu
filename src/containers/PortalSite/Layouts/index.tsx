import { AppName } from 'common/Enums';
import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import Footer from './Footer';
import Header from './Header';
import ChatBot from 'components/ChatBot';

interface Props {
    children: React.ReactNode
}

const Index = (props: Props) => {  
    return(
        <>
            <Header />      
            {props.children}      
            <Footer />    
        </>
    )
}
export default Index;