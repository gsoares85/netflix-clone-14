"use client";

import {isEmpty} from "lodash";
import {useMovieList} from "@/hooks/useMovieList";
import {MovieCard} from "@/components/movie-card";

interface MovieListProps {
    title: string;
}

export const MovieList = ({title}: MovieListProps) => {
    const { data: movies = []} = useMovieList();

    if (isEmpty(movies)) {
        return null;
    }

    return (
        <div className="px-4 md:px-12 my-4 space-y-8">
            <div>
                <p className="text-white text-md md:text-xl lg:text-2xl font-semibold">
                    {title}
                </p>
                <div className="grid grid-cols-4 gap-2">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </div>
    )
}