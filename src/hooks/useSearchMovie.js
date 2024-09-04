import { useQuery } from "@tanstack/react-query"
import api from "../utils/app";

const fetchSearchMovie = (keyword) => {
    const language = 'ko-KR';
    return keyword ? api.get(`/search/movie?language=${language}&query=${keyword}`) : api.get(`/movie/popular?language=${language}`);
}

export const useSearchMovieQuery = ({keyword}) => {
    return useQuery({
        queryKey:["movie-search",keyword],
        queryFn:() => fetchSearchMovie(keyword),
        select: (result) => result.data
    })
}