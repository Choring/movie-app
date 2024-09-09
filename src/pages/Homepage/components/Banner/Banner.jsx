import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import { Alert } from 'bootstrap';
import './Banner.style.css';
import { Container, Spinner } from 'react-bootstrap';

export const Banner = () => {
    const {data, isLoading, isError, error} = usePopularMoviesQuery();
    
    if(isLoading){
        return (
            <div className='movies-container py-5' style={{ height: "100vh" }}>
              <Spinner animation="border" variant="danger" />
            </div>
          );
    }
    if(isError){
        return <Alert vaiant="danger">{error.message}</Alert>
    }

    return (
        <div className='section'>
            <div style={{backgroundImage:"url("+`https://image.tmdb.org/t/p/w1066_and_h600_bestv2/${data?.results[0].poster_path}`+")"}}
            className='banner'>
                <Container className='text-white banner-text-area'>
                    <h1 className='noto-extra-bold'>{data?.results[0].title}</h1> 
                    <p className='overview noto-regular'>{data?.results[0].overview}</p>  
                </Container>
            </div>
        </div>
    )
}
