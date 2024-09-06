import './MovieDetailPage.style.css';
import React, { useState } from 'react'
import { Badge, Col, Container, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import { useMovieReviews } from '../../hooks/useMovieReviews';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import { createPortal } from 'react-dom';
import { ModalContent } from '../../Modal/ModalContent';
import { useMovieVideo } from '../../hooks/useMovieVideo';
import { useMovieActors } from '../../hooks/useMovieActors';

export const MovieDetailPage = () => {
  const location = useLocation();
  const movie = location.state?.movie; 
  const {data:reviews} = useMovieReviews({movieId: movie.id});
  const {data:genreData} = useMovieGenreQuery();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { data: videoData } = useMovieVideo({ movieId: movie.id });
  const {data:actorData} = useMovieActors({movieId: movie.id});
  console.log(actorData);
  const reviewsToShow = showAll ? reviews: reviews?.slice(0,3);

  const handleToggle2 = () => {
    setShowAll(!showAll);
  }

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const showGenre = (genreIdList) => {
      if(!genreIdList) {return []};
      
      const genreNameList = genreIdList.map((id)=>{
          const genreObj = genreData?.find((genre) => genre.id === id );
          return genreObj?.name;
      });

      return genreNameList
  };

  return (
    <div className='detail-container py-5'>
      <Container style={{minHeight:"100vh"}}>
        <div className='detail-box d-flex gap-5'>
          <Col className='h-100 flex-wrap' xs={2} lg={4}>
            <div className='poster-box'>
              <img src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`} alt="poster" />
            </div>
            {(videoData) ? 
              <div className='mt-3 video-box' onClick={() => setShowModal(true)}>
                <button className='mx-auto d-block' style={{background:"none", border:"none"}}><img src="/icon/play-circle.svg" alt="playButton" width={50} /></button>
              </div>
              : null
            }
          </Col>
          <Col xs={9} className='movie-info'>
            <h5 className='noto-bold'>{movie.title}</h5>
            {showGenre(movie.genre_ids)?.map((id,index)=>{                
                return <Badge className='noto-extra-light' bg="danger" key={index} style={{marginRight:"6px"}}>{id}</Badge>
            })}
            <p className='noto-extra-light'>{movie.release_date}</p>
            <p className='noto-extra-light'>평점: {movie.vote_average.toFixed(1)}</p>
            <p className='noto-extra-light'>{movie.overview}</p>
            <div>
              <p>리뷰</p>
                { reviewsToShow?.length > 0 ? (
                  reviewsToShow?.map((review, index) => (
                    <div key={index}>
                      <p className='noto-extra-light'>{review.author}</p>
                      <p className={`review ${isExpanded ? 'expanded' : ''} noto-extra-light`}>{review.content}</p>
                      <button className='more-btn noto-extra-light' onClick={() => handleToggle()}>
                        {isExpanded ? '간략히 보기' : '더 보기'}
                      </button>
                      <hr />
                    </div>
                  ))
                ) : (
                    <p>No reviews available.</p>
                  )}
                  { reviews?.length > 3 && (
                    <button onClick={handleToggle2} className='all-reviw noto-extra-light'>
                      {showAll ? '간략히 보기' : '리뷰 전체보기'}
                    </button>
                  )} 
            </div>
          </Col>
        </div>
        <div className='actor-section mt-5'>
          <div className='cast-section'>
            <h3 className='noto-bold' style={{color:"white"}}>주요 출연진</h3>
            <div className='actor-container d-flex gap-3'>
              {actorData?.cast?.map((actor, index) => {
                return <div className='actor-box p-3' key={index}>
                  <img 
                    src={actor.profile_path 
                      ? `https://media.themoviedb.org/t/p/w138_and_h175_face/${actor.profile_path}` 
                      : `${process.env.PUBLIC_URL}/no-user.svg`
                    } 
                    alt='actor'
                    width={138} 
                    height={175}
                  />
                  <div className='actor-info mt-2'>
                    <p className='noto-medium'>{actor.name}</p>
                    <p className='noto-regular'>{actor.original_name}</p>
                  </div>
                </div>
              })}
            </div>
          </div>
          <div className='crew-section mt-4'>
            <h3 className='noto-bold' style={{color:"white"}}>주요 제작진</h3>
            <div className='actor-container d-flex gap-3'>
              {actorData?.crew?.map((actor, index) => {
                return <div className='actor-box p-3' key={index}>
                  <img 
                    src={actor.profile_path 
                      ? `https://media.themoviedb.org/t/p/w138_and_h175_face/${actor.profile_path}` 
                      : `${process.env.PUBLIC_URL}/no-user.svg`
                    } 
                    alt='actor'
                    width={138} 
                    height={175}
                  />
                  <div className='actor-info mt-2'>
                    <p className='noto-medium'>{actor.name}</p>
                    <p className='noto-regular'>{actor.original_name}</p>
                  </div>
                </div>
              })}
            </div>
          </div>
        </div>
      </Container>
      {showModal && createPortal(
          <ModalContent onClose={() => setShowModal(false)} videoKey={videoData.key} />,
          document.body
      )}
    </div>
  ) 
}
