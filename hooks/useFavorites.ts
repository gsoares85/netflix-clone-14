import useSWR from "swr";
import {fetcher} from "@/lib/fetcher";

export const useFavorites = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/favorite', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return { data, error, isLoading, mutate };
}