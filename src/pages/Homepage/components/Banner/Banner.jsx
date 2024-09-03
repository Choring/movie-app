import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import { Alert } from 'bootstrap';
import './Banner.style.css';

export const Banner = () => {
    const {data, isLoading, isError, error} = usePopularMoviesQuery();
    
    if(isLoading){
        return <h1 vaiant="danger">Loading...</h1>
    }
    if(isError){
        return <Alert vaiant="danger">{error.message}</Alert>
    }

    return (
        <div style={{backgroundImage:"url("+`https://image.tmdb.org/t/p/original/${data?.results[0].poster_path}`+")"}}
        className='banner'>
            <div className='text-white banner-text-area'>
                <h1>{data?.results[0].title}</h1>
                <p>{data?.results[0].overview}</p>
            </div>
        </div>
    )
}
