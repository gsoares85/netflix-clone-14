import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import {UserComponent} from "@/components/user";

export default async function Home() {
    const session = await getServerSession();

    if (!session || !session.user) {
        redirect('/auth');
    }

    return (
        <>
            <h1 className="text-2xl text-green-500">Netflix Clone</h1>
            <p className="text-white">Logged in as: {session.user.email}</p>
            <UserComponent />
        </>
    );
}
