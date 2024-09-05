import React from 'react'
import { useUpComingMoviesQuery } from '../../../../hooks/useUpComing';
import { Alert } from 'bootstrap';
import 'react-multi-carousel/lib/styles.css';
import './UpComingMovieSlide.style.css';
import { Container, Spinner } from 'react-bootstrap';
import { MovieSlider } from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';


export const UpComingMovieSlide = () => {
    const {data, isLoading, isError, error} = useUpComingMoviesQuery();
    
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
                title={"개봉 예정 영화"} 
                movies={data} 
                responsive={responsive}
              />
            </Container>
        </div>
    )
}
