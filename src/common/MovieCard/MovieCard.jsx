import React from 'react'
import { Badge } from 'react-bootstrap'
import './MovieCard.style.css';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
// import { createPortal } from 'react-dom';
// import { ModalContent } from '../../Modal/ModalContent.jsx';


export const MovieCard = ({movie}) => {
    const {data:genreData} = useMovieGenreQuery();
    // const [showModal, setShowModal] = useState(false);

    const showGenre = (genreIdList) => {
        if(!genreIdList) {return []};
        
        const genreNameList = genreIdList.map((id)=>{
            const genreObj = genreData?.find((genre) => genre.id === id );
            return genreObj?.name;
        });

        return genreNameList
    };

    // useEffect(() => {
    //     console.log(showModal);
    // }, [showModal])
  return (
    <div 
        style={{backgroundImage:"url("+`https://media.themoviedb.org/t/p/w500/${movie.poster_path}`+")"}}
        className='movie-card'
    >
        <div className='overlay p-3'>
            <h5 className='fw-bold'>{movie.title}</h5>
            {showGenre(movie.genre_ids).map((id,index)=>{                
                return <Badge bg="danger" key={index} style={{marginRight:"6px"}}>{id}</Badge>
            })}
            <div className='mt-2'>
                
                    {movie.adult? 
                    <>
                        <div className='adult-box'>
                            <p className='m-0' style={{fontSize:"0.7rem"}}>18+</p>
                        </div>
                    </>
                         : '' }
                <div>평점 {(movie.vote_average).toFixed(1)}</div>
                <div>개봉일 {movie.release_date}</div>
                {movie.overview ? 
                    <div className='overview-box'>줄거리
                        <p className='m-0' style={{fontSize:"0.7rem"}}>{movie.overview}</p>
                    </div>
                : ""}
                {/* <div className='d-flex justify-content-center mt-1' onClick={() => setShowModal(true)}>
                    <img src="/icon/play-circle.svg" alt="playButton" width={34} />
                </div>
                {showModal && createPortal(
                    <ModalContent onClose={() => setShowModal(false)} />,
                    document.body
                )} */}
            </div>
        </div>
    </div>
  )
}
