import React from 'react'
import { useUpComingMoviesQuery } from '../../../../hooks/useUpComing';
import { Alert } from 'bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { MovieCard } from '../../../../common/MovieCard/MovieCard';
import './UpComingMovieSlide.style.css';


export const UpComingMovieSlide = () => {
    const {data, isLoading, isError, error} = useUpComingMoviesQuery();
    
    if(isLoading){
        return <h1 vaiant="danger">Loading...</h1>
    }
    if(isError){
        return <Alert vaiant="danger">{error.message}</Alert>
    }
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 6,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        }
      };
      
    return (
        <div className='item-container'>   
            <h1 className='text-white'>UpComing Movies</h1>
            <Carousel
            infinite={true}
            centerMode={true}
            itemClass='movie-silider p-1'
            containerClass='carousel-container'
            responsive={responsive}
            >
                {data.results.map((movie,index) => <MovieCard movie={movie} index={index} />)}
            </Carousel>;
        </div>
    )
}
