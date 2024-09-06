import { useQuery } from "@tanstack/react-query"
import api from "../utils/app"


const fetchMovieReviews = ({movieId}) => {
    return api.get(`movie/${movieId}/reviews`);
}

export const useMovieReviews = ({movieId}) => {
    return useQuery({
        queryKey: ['movie-genre', movieId],
        queryFn: () => fetchMovieReviews({movieId}),
        select: (result) => result.data.results,
        staleTime: 300000, // 5분
    });
};