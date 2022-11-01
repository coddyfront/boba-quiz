import React from 'react';
import {Menu} from '@headlessui/react'
import Link from "next/link";
import Image from "next/image";
import Logo from '/app/assets/images/Logo.svg'

const Header = () => {

    const styleButton = 'inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 mx-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'

    return (
        <header className="bg-main_blue w-full p-2 flex justify-between	items-center">
            <div className="flex">
                <Link className="flex items-center" href="/">
                    <Image src={Logo} alt="Логотип Boba Quiz" className="w-10 mx-2"/>
                    <p className="text-white px-2 text-2xl" >Boba Quiz</p>
                </Link>
                <nav className="flex items-center mx-3">
                    <Link className="text-white px-3" href="/#">
                        Страница 1
                    </Link>
                    <Link className="text-white px-3" href="/#">
                        Страница 2
                    </Link>
                </nav>
            </div>
            <div className="flex">
                <Menu>
                    <Menu.Button className={styleButton}>
                        Войти
                    </Menu.Button>
                    <Menu.Button className={styleButton}>
                        Регистрация
                    </Menu.Button>
                </Menu>
            </div>
        </header>
    );
};

export default Header;
