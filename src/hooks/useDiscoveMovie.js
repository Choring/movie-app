
import { useQuery } from "@tanstack/react-query"
import api from "../utils/app"

const fetchSortMovie = () => {
    const language = 'ko-KR';
    return api.get(`/discover/movie?language=${language}`);
}

export const useDiscoverMovie = () => {
    return useQuery({
        queryKey:["movie-sort"],
        queryFn: fetchSortMovie,
    })
}