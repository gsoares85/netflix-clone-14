"use client";
import Image from "next/image";
import {useRouter} from "next/navigation";

type ProfileProps = {
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    }
}

export const ProfileComponent = ({user}: ProfileProps) => {
    const router = useRouter();

    return (
        <div onClick={() => router.push("/")}>
            <div className="group flex-row w-44 mx-auto">
                <div className="w-44 h-44 rounded-md flex items-center justify-center border-2
                                border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                    <Image src="/images/default-blue.png" alt="Profile" width={176} height={176} />
                </div>
                <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                    {user?.name || 'User'}
                </div>
            </div>
        </div>
    )
}