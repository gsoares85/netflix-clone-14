import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import prismadb from "@/lib/prismadb";
import {User} from "@prisma/client";

export const GET = async () => {
    const session = await getServerSession()
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Not authenticated'}, {status: 401});
    }

    try {
        const currentUser = await prismadb.user.findUnique({
            where: {
                email: session.user.email
            }
        });

        const favoriteMovies = await prismadb.movie.findMany({
            where: {
                id: {
                    in: currentUser.favoriteIds
                }
            }
        });

        return NextResponse.json(favoriteMovies);
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: 'Error adding movie to favorites'}, {status: 400})
    }
}

export const POST = async (req: NextRequest) => {
    const session = await getServerSession()
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Not authenticated'}, {status: 401});
    }

    try {
        const { movieId } = await req.json();
        const user = await prismadb.user.findUnique({
            where: {
                email: session.user.email
            }
        });

        if (!user) {
            return NextResponse.json({error: "Unauthorized"}, { status: 401 });
        }

        const existingMovie = await prismadb.movie.findUnique({
            where: {
                id: movieId
            }
        });

        if(!existingMovie) {
            return NextResponse.json({error: "Movie not found"}, { status: 404 });
        }

        const updatedUser = await prismadb.user.update({
            where: {
                email: session.user.email
            },
            data: {
                favoriteIds: {
                    push: movieId
                }
            }
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: 'Error adding movie to favorites'}, {status: 400})
    }
}

export const DELETE = async (req: NextRequest) => {
    const session = await getServerSession()
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Not authenticated'}, {status: 401});
    }

    try {
        const { movieId } = await req.json();
        const user: User = await prismadb.user.findUnique({
            where: {
                email: session.user.email
            }
        });

        if (!user) {
            return NextResponse.json({error: "Unauthorized"}, { status: 401 });
        }

        const existingMovie = await prismadb.movie.findUnique({
            where: {
                id: movieId
            }
        });

        if(!existingMovie) {
            return NextResponse.json({error: "Movie not found"}, { status: 404 });
        }

        const updatedFavoriteIds = user.favoriteIds.filter(id => id !== movieId);

        const updatedUser = await prismadb.user.update({
            where: {
                email: session.user.email
            },
            data: {
                favoriteIds: updatedFavoriteIds
            }
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: 'Error deleting movie from favorites'}, {status: 400})
    }
}