import { useQuery } from "@tanstack/react-query"
import api from "../utils/app";

const fetchSearchMovie = ({keyword,page,genre,sort}) => {
    const language = 'ko-KR';
    const keywords = keyword ? `query=${keyword}` : '';
    const pages = page ? `page=${page}` : '';
    const sortby = sort ? `sort_by=${sort}` : 'sort_by=popularity.asc';
    const genres = genre ? `with_genres=${genre}` : '';

    return keyword 
        ? api.get(`/search/movie?language=${language}&${keywords}&${pages}`)
        : api.get(`/discover/movie?language=${language}&${pages}&${genres}&${sortby}`);
}

export const useSearchMovieQuery = ({keyword,page,genre,sort}) => {
    return useQuery({
        queryKey:["movie-search",{keyword,page,genre,sort}],
        queryFn:() => fetchSearchMovie({keyword,page,genre,sort}),
        select: (result) => result.data
    })
}