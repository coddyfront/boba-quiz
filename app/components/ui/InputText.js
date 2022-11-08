import React from 'react';

const InputText = ({label, placeholder, color, bgColor, required, id, action, value}) => {

    return (
        <div className="py-2 w-full">
            <label className="font-medium text-gray-900">{label}</label>
            <input type="text" id={id}
                   className="text-gray-900 text-sm rounded-lg block w-full py-2 bg-gray outline-none placeholder-gray-400"
                   placeholder={placeholder} required={required}
                   onChange={(e) => action(e.target.value)}
                   value={value}
            />
        </div>
    );
};

export default InputText;
