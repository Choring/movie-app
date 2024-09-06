import React, { useState } from 'react'
import { Badge } from 'react-bootstrap'
import './MovieCard.style.css';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import { createPortal } from 'react-dom';
import { ModalContent } from '../../Modal/ModalContent.jsx';
import { useMovieVideo } from '../../hooks/useMovieVideo.js';
import { useNavigate } from 'react-router-dom';

export const MovieCard = ({movie}) => {
    const navigate = useNavigate();
    const {data:genreData} = useMovieGenreQuery();
    const [showModal, setShowModal] = useState(false);
    const { data: videoData } = useMovieVideo({ movieId: movie.id });

    const showGenre = (genreIdList) => {
        if(!genreIdList) {return []};
        
        const genreNameList = genreIdList.map((id)=>{
            const genreObj = genreData?.find((genre) => genre.id === id );
            return genreObj?.name;
        });

        return genreNameList
    };

    const handleCardClick = () => {
        navigate(`/movies/${movie.id}`, { state: { movie } }); 
      };
  return (
    <div 
        style={{backgroundImage:"url("+`https://media.themoviedb.org/t/p/w500/${movie.poster_path}`+")"}}
        className='movie-card'
    >
        <div className='overlay p-3'>
            <div onClick={handleCardClick}>
                <h5 className='fw-bold'>{movie.title}</h5>
                {showGenre(movie.genre_ids)?.map((id,index)=>{                
                    return <Badge className='noto-light' bg="danger" key={index} style={{marginRight:"6px"}}>{id}</Badge>
                })}
                <div className='mt-2'>
                    {movie.adult? 
                    <>
                        <div className='adult-box'>
                            <p className='m-0 noto-light' style={{fontSize:"0.8rem"}}>18+</p>
                        </div>
                    </>
                            : '' }
                    <div className='noto-light vote-average mb-1'>평점 {(movie.vote_average)?.toFixed(1)}</div>
                    <div className='noto-light release-date mb-1'>개봉일 {movie.release_date}</div>
                    {movie.overview ? 
                        <div className='noto-light overview-box'>줄거리 :
                            <p className='m-0' style={{fontSize:"0.8rem"}}>{movie.overview}</p>
                        </div>
                    : ""}
                </div>
            </div>
                {
                    (videoData) ? 
                        <div className='d-flex justify-content-center mt-1' onClick={() => setShowModal(true)} >
                            <img src="/icon/play-circle.svg" alt="playButton" width={34} />
                        </div>
                        : null
                }
                
                {showModal && createPortal(
                    <ModalContent onClose={() => setShowModal(false)} videoKey={videoData.key} />,
                    document.body
                )}
        </div>
    </div>
  )
}