import useSwr from 'swr';
import {fetcher} from "@/lib/fetcher";
import {User} from "@prisma/client";

export const useCurrentUser = () => {
    const { data, error, isLoading, mutate } = useSwr<User>('/api/current', fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }
}