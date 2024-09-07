import React, { useEffect, useState } from 'react';
import './MoviesPage.style.css';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Alert } from 'bootstrap';
import { Col, Container, Row, Spinner, Form } from 'react-bootstrap';
import { MovieCard } from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';

export const MoviesPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();  
  const keywordFromQuery = query.get('q');
  const genreFromQuery = query.get('g');
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState(keywordFromQuery || '');
  const [genre, setGenre] =  useState(genreFromQuery || '');
  const [sort, setSort] = useState('popularity.desc');
  
  const { data: genreData } = useMovieGenreQuery();
  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page, genre, sort });
  
  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const handleRadioChange = (e) => {
    setSort(e.target.value);
  };
  
  // keyword가 변경되면 navigate로 URL을 업데이트하고, 데이터를 다시 패치
  useEffect(() => {
    setKeyword(keywordFromQuery || '');  
  }, [keywordFromQuery]);

  useEffect(() => {
    if (keyword) {
      navigate(`/movies?q=${keyword}`);
    } else if (genre) {
      navigate(`/movies?g=${genre}`);
    } else {
      navigate(`/movies`);
    }
  }, [keyword, genre, navigate]);

  useEffect(() => {
    (genre) ? navigate(`/movies?g=${genre}`) : navigate(`/movies?q=${keyword}`);
  },[genre])

  if (isLoading) {
    return (
      <div className='movies-container py-5' style={{ height: "100vh" }}>
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='movies-container py-5' style={{ height: "100vh" }}>
        <Alert variant="danger">{error.message}</Alert>
      </div>
    );
  }

  return (
    <div className='movies-container py-5'>
      <Container className='movie-container'>
          <Row xl={12} className='mb-4'>
            <Col xl={6}>
              <p className='m-0 mb-2' style={{ color: "white" }}>장르선택</p>
              <Form.Select size="sm" onChange={(event) => setGenre(event.target.value)}>
                <option>선택</option>
                {genreData?.map((genre, index) => {
                  return <option key={index} value={genre.id}>{genre.name}</option>;
                })}
              </Form.Select>
            </Col>
            <Col className='d-flex gap-3 align-items-center' xl={6} style={{color:"white"}}>
              <div className='mr-3'>
                <input 
                  type='radio' 
                  name='popular' 
                  value={'popularity.desc'}
                  checked={sort === 'popularity.desc'}
                  onChange={handleRadioChange}
                />인기순(오름차순)
              </div>
              <div>
                <input  
                  type='radio' 
                  name='popular' 
                  value={'popularity.asc'} 
                  checked={sort === 'popularity.asc'}
                  onChange={handleRadioChange}
                />인기순(내림차순)
              </div>
            </Col>
          </Row>
          <Col>
            {data?.results?.length > 0 ? (
              <>
                <Row>
                  {data?.results.map((movie, index) => (
                    <Col className='mb-5' key={index} lg={3} xs={12}>
                      <MovieCard movie={movie} />
                    </Col>
                  ))}
                </Row>
                <ReactPaginate className='pagination'
                  nextLabel=">"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  marginPagesDisplayed={0}
                  pageCount={data?.total_pages}
                  previousLabel="<"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel={false}
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
                  forcePage={page - 1}
                />
              </>
            ) : (
              <Row>
                <div style={{ height: "100vh"}}>
                  <h1 className='mt-3' style={{color:"white", width:"fit-content", margin:"0 auto"}}>검색결과가 없습니다.</h1>
                </div>
              </Row>
            )}
          </Col>
      </Container>
    </div>
  );
};
