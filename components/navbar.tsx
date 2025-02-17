"use client";

import Image from "next/image";
import {NavbarItem} from "@/components/nabvar-item";
import {BsBell, BsChevronDown, BsSearch} from "react-icons/bs";
import {MobileMenu} from "@/components/mobile-menu";
import {useCallback, useState, useEffect} from "react";
import {AccountMenu} from "@/components/account-menu";

interface NavbarProps {
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
}

const TOP_OFFSET = 66;

export const Navbar = ({user}: NavbarProps) => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current);
    }, []);

    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackground(true);
            } else {
                setShowBackground(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    })

    return (
        <nav className="w-full fixed z-40">
            <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500
            ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}>
                <Image src="/images/logo.png" alt="Logo" width={90} height={25} />
                <div className="flex-row ml-8 gap-7 hidden lg:flex">
                    <NavbarItem label="Home" />
                    <NavbarItem label="Series" />
                    <NavbarItem label="Films" />
                    <NavbarItem label="New & Popular" />
                    <NavbarItem label="My List" />
                    <NavbarItem label="Browse by languages" />
                </div>
                <div
                    onClick={toggleMobileMenu}
                    className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
                >
                    <p className="text-white text-sm">Browse</p>
                    <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
                    <MobileMenu visible={showMobileMenu} />
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsSearch />
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsBell />
                    </div>
                    <div onClick={toggleAccountMenu} className="flex flex-row cursor-pointer relative items-center">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden flex items-center justify-center">
                            <Image src="/images/default-blue.png" alt="User" width={25} height={25} />
                        </div>
                        <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
                        <AccountMenu visible={showAccountMenu} user={user} />
                    </div>
                </div>
            </div>
        </nav>
    );
};