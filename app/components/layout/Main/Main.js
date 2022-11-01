import React from 'react';

const Main = ({Component, pageProps}) => {
    return (
        <div className="">
            <Component {...pageProps}/>
        </div>
    );
};

export default Main;
