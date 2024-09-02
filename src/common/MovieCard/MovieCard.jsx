import React from 'react'
import { Badge } from 'react-bootstrap'
import './MovieCard.style.css';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';

export const MovieCard = ({movie}) => {
    const {data:genreData} = useMovieGenreQuery();
    
    const showGenre = (genreIdList) => {
        if(!genreIdList) {return []};
        
        const genreNameList = genreIdList.map((id)=>{
            const genreObj = genreData?.find((genre) => genre.id === id );
            return genreObj?.name;
        });

        return genreNameList
    };
    
  return (
    <div 
        style={{backgroundImage:"url("+`https://media.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`+")"}}
        className='movie-card'
    >
        <div className='overlay'>
            <h4>{movie.title}</h4>
            {showGenre(movie.genre_ids).map((id,index)=>{                
                return <Badge bg="danger" key={index} >{id}</Badge>
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
