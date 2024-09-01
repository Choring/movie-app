import React from 'react'
import './Homepage.style.css';
import { Banner } from './components/Banner/Banner';
import { PopularMovieslide } from './components/PopularMovieSlide/PopularMovieslide';
import { TopRatedMovieSlide } from './components/TopRatedMovieSlide/TopRatedMovieSlide';
import { UpComingMovieSlide } from './components/UpComingMovieSlide/UpComingMovieSlide';

// 1.배너 => popuar 영화를 들고와서 첫번째 아이템을 보여주자.
// 2.popular movie
// 3.top rated movie
// 4.upcoming movie

export const Homepage = () => {
  return (
    <div className='home-container'>
      <Banner />
      <PopularMovieslide />
      <TopRatedMovieSlide />
      <UpComingMovieSlide />
    </div>
  )
}
