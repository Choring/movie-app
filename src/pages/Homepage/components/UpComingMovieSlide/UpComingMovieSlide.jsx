import React from 'react'
import { useUpComingMoviesQuery } from '../../../../hooks/useUpComing';
import { Alert } from 'bootstrap';
import 'react-multi-carousel/lib/styles.css';
import './UpComingMovieSlide.style.css';
import { Container } from 'react-bootstrap';
import { MovieSlider } from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';


export const UpComingMovieSlide = () => {
    const {data, isLoading, isError, error} = useUpComingMoviesQuery();
    
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
                title={"UpComing Movies"} 
                movies={data} 
                responsive={responsive}
              />
            </Container>
        </div>
    )
}
