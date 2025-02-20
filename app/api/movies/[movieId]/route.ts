import {getServerSession} from "next-auth";
import {NextRequest, NextResponse} from "next/server";
import prismadb from "@/lib/prismadb";
import {Movie} from "@prisma/client";

export const GET = async (req: NextRequest, { params }: { params: { movieId: string } }) => {
    try {
        const movieId = params.movieId;
        console.log(movieId);

        if (!movieId) {
            return NextResponse.json({ error: 'Invalid ID'}, { status: 400 });
        }

        const session = await getServerSession()
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Not authenticated'}, {status: 401});
        }

        const movie: Movie = await prismadb.movie.findUnique({
            where: {
                id: movieId
            }
        });

        if (!movie) {
            return NextResponse.json({ error: 'Invalid ID'}, { status: 400 });
        }

        return NextResponse.json(movie)
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: 'Error getting movies'}, {status: 400})
    }
}