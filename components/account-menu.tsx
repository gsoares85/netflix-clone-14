"use client";

import Image from "next/image";
import {signOut} from "next-auth/react";

interface AccountMenuProps {
    visible?: boolean;
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
}

export const AccountMenu = ({ visible, user }: AccountMenuProps) => {
    if (!visible) return null;

    return (
        <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
            <div className="flex flex-col gap-3">
                <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
                    <Image src="/images/default-blue.png" alt="User" width={30} height={30} className="rounded-md" />
                    <p className="text-white text-sm group-hover/item:underline">
                        {user?.name || 'User'}
                    </p>
                </div>
                <hr className="bg-gray-600 border-0 h-px my-4" />
                <div onClick={() => signOut()} className="px-3 text-center text-white text-sm hover:underline">
                    Sign out of Netflix
                </div>
            </div>
        </div>
    )
}