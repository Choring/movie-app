import React from 'react'
import './MoviesPage.style.css';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { useSearchParams } from 'react-router-dom';
import { Alert } from 'bootstrap';
import { Col, Container, Row } from 'react-bootstrap';
import { MovieCard } from '../../common/MovieCard/MovieCard';

//경로 2가지
//nav바에서 클릭해서 온경우 => popularMovie 보여주기
//keyword를 입력해서 온경우 => keyword와 관련된 영화들을 보여줌
//pagenation 설치
//page state 만들기
//pagenation 클릭할때마다 page 바꿔주기
//page 값이 바뀔때 마다 useSearchMovie에 page까지 넣어서 fetch

export const MoviesPage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");

  const {data,isLoading,isError,error} = useSearchMovieQuery({keyword});

  if(isLoading){
    return <h1 vaiant="danger">Loading...</h1>
  }
  if(isError){
      return <Alert vaiant="danger">{error.message}</Alert>
  }

  return (
    <div className='movies-container'>
      <Container >
        <Row>
          <Col lg={4} xs={12}>
            필터
          </Col>
          <Col lg={8} xs={12}>
            <Row>
              {data?.results.map((movie,index)=>{
                return <Col key={index} lg={4} xs={12} ><MovieCard movie={movie} /></Col>})}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
