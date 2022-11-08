import React from 'react';
import {RadioGroup} from "@headlessui/react";

const RadioGroupOption = ({text, value, color}) => {
    return (
        <RadioGroup.Option value={value}
                           className={'bg-' + color + " p-2 border-solid border-2 border-main_blue rounded-2xl"}>
            {({checked}) => (
                <span className={checked ? 'bg-blue-200' : ''}>{text}</span>
            )}
        </RadioGroup.Option>
    );
};

export default RadioGroupOption;
