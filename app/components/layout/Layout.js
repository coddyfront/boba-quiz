import React from 'react';
import Header from "./Header/Header";
import Main from "./Main/Main";

const Layout = ({Component, pageProps}) => {
    return (
        <div className="">
            <Header/>
            <Main Component={Component} pageProps={pageProps}/>
        </div>
    );
};

export default Layout;
