"use client"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser} from "@fortawesome/free-solid-svg-icons";
import Search from "@/Layout/Header/Search";
import Menu from "@/Layout/Header/Menu"
import Link from "next/link";
import { useAppContext } from "@/Helpers/AppContext/AppProvider";
import { useEffect, useState } from "react";

export default function Header() {
    const {token} = useAppContext()
    const {account} = useAppContext()
    useEffect(() => {
    }, [token]);
    return (
        <header className="header p-3">
            <div className="header--inner screen">
                <nav className={'flex items-center'}>
                    <Link href={'/home'}>
                        <div className="header__logo cursor-pointer">
                            <h1 className="logo__name font-bold">NXTRWG</h1>
                        </div>
                    </Link>
                    <Search />
                    <div className="header__user shrink-0">
                        <button className="header__login flex items-center bg-white text-black rounded-full px-2 text-xsmall font-semibold gap-1 py-2">
                            { (Object.entries(account).length != 0 && token) ? (
                                <Link href='/profile' className="flex items-center">
                                    <FontAwesomeIcon icon={faCircleUser} className='text-large'/>
                                    <span className="pl-1">Xin chào, {account?.name}</span>
                                </Link>
                            ) : (
                                <Link href='/login' className="flex items-center">
                                    <FontAwesomeIcon icon={faCircleUser} className='text-large'/>
                                    <span className="pl-1">Đăng nhập/Đăng ký</span>
                                </Link>
                            )}
                        </button>
                    </div>
                </nav>
                <nav className="header--bottom flex items-center justify-center">
                    <Menu/>
                </nav>
            </div>
        </header>

)
}