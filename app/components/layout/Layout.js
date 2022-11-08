import React from 'react';
import Header from "./Header/Header";
import Main from "./Main/Main";
import HeadTag from "./Head/HeadTag";

const Layout = ({Component, pageProps}) => {
    return (
        <>
            <HeadTag title={pageProps.title} description={pageProps.description}/>
            <div className="bg-white dark:bg-black flex flex-col">
                <Header/>
                <Main Component={Component} pageProps={pageProps}/>
            </div>
        </>
    );
};

export default Layout;
