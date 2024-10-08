import React from 'react'
import { useTopRatedMoviesQuery } from '../../../../hooks/useTopRatedMovies';
import { Alert } from 'bootstrap';
import 'react-multi-carousel/lib/styles.css';
import './TopRatedMovieSlide.style.css';
import { Container, Spinner } from 'react-bootstrap';
import { MovieSlider } from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';

export const TopRatedMovieSlide = () => {
    const {data, isLoading, isError, error} = useTopRatedMoviesQuery();
    
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
        <div className='item-container'>   
            <Container>
              <MovieSlider 
                title={"가장 인기있는 영화"} 
                movies={data} 
                responsive={responsive}
              />
            </Container>
        </div>
    )
}