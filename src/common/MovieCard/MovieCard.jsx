import React from 'react'
import { Badge } from 'react-bootstrap'
import './MovieCard.style.css';

export const MovieCard = ({movie,index}) => {
  return (
    <div 
        style={{backgroundImage:"url("+`https://media.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`+")"}}
        className='movie-card'
    >
        <div className='overlay'>
            <h1>{movie.title}</h1>
            {movie.genre_ids.map((id)=>{
                <Badge bg="danger">{id}</Badge>
            })}
            <div>
                <div>{movie.vote_average}</div>
                <div>{movie.popularity}</div>
                <div>{movie.adult?'over18':'under18'}</div>
            </div>
        </div>
    </div>
  )
}
