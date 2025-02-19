"use client";

import {isEmpty} from "lodash";
import {useMovieList} from "@/hooks/useMovieList";
import {useFavorites} from "@/hooks/useFavorites";
import {MovieListGrid} from "@/components/movie-list-grid";

export const MovieList = () => {
    const {data: movies = []} = useMovieList();
    const {data: favorites = []} = useFavorites();

    if (isEmpty(movies)) {
        return null;
    }

    return (
        <>
            <MovieListGrid title="Trending Now" movies={movies} />
            <MovieListGrid title="My List" movies={favorites} />
        </>
    )
}