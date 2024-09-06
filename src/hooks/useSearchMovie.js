import { useQuery } from "@tanstack/react-query"
import api from "../utils/app";

const fetchSearchMovie = ({keyword,page}) => {
    const language = 'ko-KR';
    const keywords = keyword ? `query=${keyword}` : '';
    const pages = page ? `page=${page}` : '';

    return keyword 
        ? api.get(`/search/movie?language=${language}&${keywords}&${pages}`) 
        : api.get(`/movie/popular?language=${language}&${pages}`);
}

export const useSearchMovieQuery = ({keyword,page}) => {
    return useQuery({
        queryKey:["movie-search",{keyword,page}],
        queryFn:() => fetchSearchMovie({keyword,page}),
        select: (result) => result.data
    })
}