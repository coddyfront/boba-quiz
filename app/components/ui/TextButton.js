import React from 'react';

const TextButton = ({text, textColor, bgColor, action, style, disabled = false}) => {

    const styleButton = style + ` inline-flex justify-center rounded-md ${textColor} ${disabled ? 'bg-main_gray opacity-50' : bgColor} 
    px-4 py-2 font-medium focus:outline-none focus-visible:ring-2
    focus-visible:ring-white focus-visible:ring-opacity-75`
    
    return (
        <button className={styleButton} onClick={action} disabled={disabled}>
            {text}
        </button>
    );
};

export default TextButton;
