import React from 'react'
import './MovieSlider.style.css';
import Carousel from 'react-multi-carousel';
import { MovieCard } from '../MovieCard/MovieCard';
import 'react-multi-carousel/lib/styles.css';

export const MovieSlider = ({title,movies,responsive}) => {
    

    return (
        <div> 
            <h3 className='text-white mb-0 noto-bold'>{title}</h3>
            <Carousel
            infinite={true}
            centerMode={false}
            itemClass='movie-silider p-1'
            containerClass='carousel-container'
            responsive={responsive}
            >
                {movies.results.map((movie,index) => <MovieCard movie={movie} key={index} />)}
            </Carousel>
        </div>
    )
}
