import { useQuery } from "@tanstack/react-query"
import api from "../utils/app";

const fetchSearchMovie = ({keyword,page}) => {
    const language = 'ko-KR';
    return keyword 
        ? api.get(`/search/movie?language=${language}&query=${keyword}&page=${page}`) 
        : api.get(`/movie/popular?language=${language}&page=${page}`);
}

export const useSearchMovieQuery = ({keyword,page}) => {
    return useQuery({
        queryKey:["movie-search",{keyword,page}],
        queryFn:() => fetchSearchMovie({keyword,page}),
        select: (result) => result.data
    })
}