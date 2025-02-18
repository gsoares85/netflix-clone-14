import {getServerSession} from "next-auth";
import {NextResponse} from "next/server";
import prismadb from "@/lib/prismadb";

export const GET = async () => {
    try {
        const session = await getServerSession()
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Not authenticated'}, {status: 401});
        }

        const movies = await prismadb.movie.findMany();

        return NextResponse.json(movies)
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: 'Error getting movies'}, {status: 400})
    }
}