import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import {ProfileComponent} from "@/components/profile";

const ProfilesPage = async () => {
    const session = await getServerSession();

    if (!session || !session.user) {
        redirect('/auth');
    }

    return (
        <div className="flex items-center h-full justify-center">
            <div className="flex flex-col">
                <h1 className="text-3xl md:text-6xl text-white text-center">
                    Who is watching?
                </h1>
                <div className="flex items-center justify-center gap-8 mt-10">
                    <ProfileComponent user={session.user} />
                </div>
            </div>
        </div>
    );
};

export default ProfilesPage;
