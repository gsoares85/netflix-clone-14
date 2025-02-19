import {MovieCard} from "@/components/movie-card";
import {Movie} from "@prisma/client";

interface MovieListGridProps {
    movies: Movie[];
    title: string;
}

export const MovieListGrid = ({movies, title}: MovieListGridProps) => {
    if (!movies.length) return null;

    return (
        <div className="px-4 md:px-12 my-4 space-y-8">
            <div>
                <p className="text-white text-md md:text-xl lg:text-2xl font-semibold">
                    {title}
                </p>
                <div className="grid grid-cols-4 gap-2">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie}/>
                    ))}
                </div>
            </div>
        </div>
    )
}