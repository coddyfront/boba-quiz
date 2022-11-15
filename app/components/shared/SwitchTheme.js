import React, {useEffect, useState} from 'react';
import {Switch} from '@headlessui/react'

const SwitchTheme = () => {


    let theme;

    const [lightThemeActive, setLightThemeActive] = useState(theme)


    useEffect(() => {
        if (localStorage) {
            theme = localStorage.getItem('theme')
        } else {
            theme = 'light'
        }
        document.documentElement.classList.add(theme)
        setLightThemeActive(theme)
    })

    const switchTheme = async () => {
        if (theme === 'dark') {
            document.documentElement.classList.replace('dark', 'light');
            localStorage.setItem('theme', 'light');
            setLightThemeActive('light')
        } else {
            document.documentElement.classList.replace('light', 'dark');
            localStorage.setItem('theme', 'dark');
            setLightThemeActive('dark')
        }
    }

    return (
        <div className="flex items-center">
            <Switch
                checked={lightThemeActive === 'light'}
                onChange={switchTheme}
                className={`${lightThemeActive === 'light' ? 'bg-black' : 'bg-white'}
          relative inline-flex h-[20px] w-[40px] shrink-0 cursor-pointer rounded-full border-transparent
          transition-colors duration-200 ease-in-out focus:outline-none`}>
                <span aria-hidden="true"
                      className={`${lightThemeActive === 'light' ? 'translate-x-8 bg-white' : 'translate-x-0 bg-black'}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full shadow-lg ring-0
            transition duration-200 ease-in-out`}/>
            </Switch>
        </div>)
};

export default SwitchTheme;
