import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import {Navbar} from "@/components/navbar";
import {Billboard} from "@/components/billboard";

export default async function Home() {
    const session = await getServerSession();

    if (!session || !session.user) {
        redirect('/auth');
    }

    return (
        <>
            <Navbar user={session.user} />
            <Billboard />
        </>
    );
}
