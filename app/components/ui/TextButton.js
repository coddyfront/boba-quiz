import React from 'react';

const TextButton = ({text, color, bgColor, action}) => {

    console.log(bgColor)

    const styleButton = `inline-flex justify-center rounded-md text-${color} bg-${bgColor} px-4 py-2 mx-2 font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`

    return (
        <button className={styleButton} onClick={action}>
            {text}
        </button>
    );
};

export default TextButton;
