import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import prismadb from "@/lib/prismadb";

export const GET = async () => {
    try {
        const session = await getServerSession()
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Not authenticated'}, {status: 401});
        }

        const currentUser = await prismadb.user.findUnique({
            where: {
                email: session.user.email
            }
        })

        return NextResponse.json(currentUser)
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: 'Error getting current user'}, {status: 400})
    }
}