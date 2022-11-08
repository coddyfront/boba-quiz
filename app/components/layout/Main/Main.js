import React from 'react';

const Main = ({Component, pageProps}) => {
    return (
        <main className="p-2 h-full">
            <Component {...pageProps}/>
        </main>
    );
};

export default Main;
