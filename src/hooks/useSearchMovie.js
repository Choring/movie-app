import { useQuery } from "@tanstack/react-query"
import api from "../utils/app";

const fetchSearchMovie = ({keyword,page,widthGenres}) => {
    const language = 'ko-KR';
    return keyword 
        ? api.get(`/search/movie?language=${language}&query=${keyword}&page=${page}&with_genres=${widthGenres}`) 
        : api.get(`/movie/popular?language=${language}&page=${page}&width_genres=${widthGenres}`);
}

export const useSearchMovieQuery = ({keyword,page,widthGenres}) => {
    console.log(widthGenres);
    return useQuery({
        queryKey:["movie-search",{keyword,page,widthGenres}],
        queryFn:() => fetchSearchMovie({keyword,page,widthGenres}),
        select: (result) => result.data
    })
}