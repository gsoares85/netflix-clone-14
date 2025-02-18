import {getServerSession} from "next-auth";
import {NextResponse} from "next/server";
import prismadb from "@/lib/prismadb";

export const GET = async () => {
    try {
        const session = await getServerSession()
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Not authenticated'}, {status: 401});
        }

        const movieCount = await prismadb.movie.count();
        const randomIndex = Math.floor(Math.random() * movieCount);
        const randomMovie = await prismadb.movie.findMany({
            take: 1,
            skip: randomIndex
        });

        return NextResponse.json(randomMovie[0])
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: 'Error getting random movie'}, {status: 400})
    }
}
