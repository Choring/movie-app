import React, {useEffect, useState} from 'react'
import './MoviesPage.style.css';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Alert } from 'bootstrap';
import { Col, Container, Row, Spinner, Form } from 'react-bootstrap';
import { MovieCard } from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';

//경로 2가지
//nav바에서 클릭해서 온경우 => popularMovie 보여주기
//keyword를 입력해서 온경우 => keyword와 관련된 영화들을 보여줌
//pagenation 설치
//page state 만들기
//pagenation 클릭할때마다 page 바꿔주기
//page 값이 바뀔때 마다 useSearchMovie에 page까지 넣어서 fetch

export const MoviesPage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const keyword = query.get("q");
  const {data:genreData} = useMovieGenreQuery();
  const navigate = useNavigate();

  const {data,isLoading,isError,error} = useSearchMovieQuery({keyword,page,filter});
  const handlePageClick =({selected}) => {
    setPage(selected + 1);
  }

  useEffect(()=>{
    navigate(`/movies?with_genres=${filter}`)
  },[filter])
  
  if(isLoading){
    return (
      <div className='movies-container py-5' style={{height:"100vh"}}>
        <Spinner animation="border" variant="danger" />
      </div> 
    )
  }
  if(isError){
      return (
        <div className='movies-container py-5' style={{height:"100vh"}}>
          <Alert vaiant="danger">{error.message}</Alert>
        </div>
      )
  }

  return (
    <div className='movies-container py-5'>
      <Container >
        <Row>
          <Col lg={4} xs={12}>
            <Row>
              <p className='m-0 mb-2' style={{color:"white"}}>장르선택</p>
              <Form.Select size="sm" onChange={(event) => setFilter(event.target.value)}>
                <option>선택</option>
                {genreData?.map((genre,index) => {
                  return <option key={index}>{genre.name}</option>
                })}
              </Form.Select>
            </Row>
            <Row className='mt-4'>
              <p className='m-0 mb-2' style={{color:"white"}}>정렬기준</p>
              <Form.Select size="sm">
                <option>선택</option>
                
              </Form.Select>
            </Row>
          </Col>
          <Col lg={8} xs={12}>
            <Row>
              {data?.results.map((movie,index)=>{
                return <Col key={index} lg={4} xs={12} ><MovieCard movie={movie} /></Col>})}
            </Row>
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={data?.total_pages}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
              forcePage={page - 1}
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}
