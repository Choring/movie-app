import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import { Alert } from 'bootstrap';
import { MovieSlider } from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';
import { Container } from 'react-bootstrap';

export const PopularMovieslide = () => {
    const {data, isLoading, isError, error} = usePopularMoviesQuery();
    
    if(isLoading){
        return <h1 vaiant="danger">Loading...</h1>
    }
    if(isError){
        return <Alert vaiant="danger">{error.message}</Alert>
    }
    

    return (
        <div className='item-container pt-3'>  
            <Container>
                <MovieSlider 
                    title={"인기있는 영화"} 
                    movies={data} 
                    responsive={responsive} 
                />
            </Container> 
        </div>
    )
}
