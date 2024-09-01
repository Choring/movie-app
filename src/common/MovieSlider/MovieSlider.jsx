import React from 'react'
import './MovieSlider.style.css';
import Carousel from 'react-multi-carousel';
import { MovieCard } from '../MovieCard/MovieCard';
import 'react-multi-carousel/lib/styles.css';

export const MovieSlider = ({title,movies,responsive}) => {
    

    return (
        <div> 
            <h3 className='text-white'>{title}</h3>
            <Carousel
            infinite={true}
            centerMode={true}
            itemClass='movie-silider p-1'
            containerClass='carousel-container'
            responsive={responsive}
            >
                {movies.results.map((movie,index) => <MovieCard movie={movie} index={index} />)}
            </Carousel>
        </div>
    )
}
