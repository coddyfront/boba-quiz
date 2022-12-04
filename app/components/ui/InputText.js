import React from 'react';

const InputText = ({label, placeholder, color, bgColor, required, id, action, value}) => {

    const onChangeAction = (e) => {
        action(e.target.value)
        e.target.style.height = 'auto'
        e.target.style.height = e.target.scrollHeight + 2 + 'px'
        // configStore.focusElementID = id
    }

    return (
        <div className="py-2 w-full">
            <label className="font-medium text-gray-900">{label}</label>
            <textarea id={id}
                      rows={1}
                      className="text-gray-900 text-sm rounded-lg block w-full py-2
                      resize-none outline-none placeholder-gray-400"
                      placeholder={placeholder} required={required}
                      onChange={(e) => onChangeAction(e)}
                      value={value}
            />
        </div>
    );
};

export default InputText;
