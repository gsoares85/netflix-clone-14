import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";

export const GET = async () => {
    try {
        const session = await getServerSession()
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Not authenticated'}, {status: 401});
        }
        return NextResponse.json(session.user)
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: 'Error getting current user'}, {status: 400})
    }
}