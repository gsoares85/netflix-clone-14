import useSWR from "swr";
import {fetcher} from "@/lib/fetcher";
import {Movie} from "@prisma/client";

export const useMovieList = () => {
    const { data, error, isLoading } = useSWR<Movie[]>('/api/movies', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return { data, error, isLoading }
}