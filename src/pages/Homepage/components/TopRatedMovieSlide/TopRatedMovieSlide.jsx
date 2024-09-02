import React from 'react'
import { useTopRatedMoviesQuery } from '../../../../hooks/useTopRatedMovies';
import { Alert } from 'bootstrap';
import 'react-multi-carousel/lib/styles.css';
import './TopRatedMovieSlide.style.css';
import { Container } from 'react-bootstrap';
import { MovieSlider } from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';

export const TopRatedMovieSlide = () => {
    const {data, isLoading, isError, error} = useTopRatedMoviesQuery();
    
    if(isLoading){
        return <h1 vaiant="danger">Loading...</h1>
    }
    if(isError){
        return <Alert vaiant="danger">{error.message}</Alert>
    }
      
    return (
        <div className='item-container'>   
            <Container>
              <MovieSlider 
                title={"TopRated Movies"} 
                movies={data} 
                responsive={responsive}
              />
            </Container>
        </div>
    )
}