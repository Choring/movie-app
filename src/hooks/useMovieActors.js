import { useQuery } from "@tanstack/react-query"
import api from "../utils/app"


const fetchMovieActors = ({movieId}) => {
    return api.get(`movie/${movieId}/credits?language=ko-KR`);
}

export const useMovieActors = ({movieId}) => {
    return useQuery({
        queryKey: ['movie-genre'.movieId],
        queryFn: () => fetchMovieActors({movieId}),
        select: (result) => result.data,
        staleTime: 300000, // 5분
    });
};