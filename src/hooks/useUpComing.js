import { useQuery } from "@tanstack/react-query";
import api from "../utils/app";

const fetchUpComingMovies = () => {
return api.get(`/movie/upcoming?language=ko-KR`);
}

export const useUpComingMoviesQuery = () =>{
    return useQuery({
        queryKey:['movie-upComing'],
        queryFn: fetchUpComingMovies,
        select: (result) => result.data
    })
}