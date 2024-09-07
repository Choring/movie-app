import { useQuery } from "@tanstack/react-query";
import api from "../utils/app";

const fetchMovieVideo = ({ movieId }) => {
    return api.get(`/movie/${movieId}/videos?language=ko-KR`);
}

export const useMovieVideo = ({ movieId }) => {
    return useQuery({
        queryKey: ['movie-video', movieId],
        queryFn: () => fetchMovieVideo({ movieId }),
        select: (result) => result.data.results[1],
        staleTime: 300000, // 5분
    });
};