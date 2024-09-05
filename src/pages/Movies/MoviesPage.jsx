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
  const [query, setQuery] = useSearchParams();  // 쿼리 파라미터 읽기
  const [page, setPage] = useState(1);
  const keywordFromQuery = query.get('q');  // 쿼리에서 keyword 가져오기
  const [keyword, setKeyword] = useState(keywordFromQuery || '');  // 초기 상태 설정
  const { data: genreData } = useMovieGenreQuery();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page });

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  // keyword가 변경되면 navigate로 URL을 업데이트하고, 데이터를 다시 패치
  useEffect(() => {
    setKeyword(keywordFromQuery || '');  // 쿼리가 변경될 때 keyword를 업데이트
  }, [keywordFromQuery]);

  useEffect(() => {
    navigate(`/movies?q=${keyword}`);  // keyword가 변경될 때마다 URL 업데이트
  }, [keyword, navigate]);

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
      <Container>
        <Row>
          <Col lg={4} xs={12}>
            <Row>
              <p className='m-0 mb-2' style={{ color: "white" }}>장르선택</p>
              <Form.Select size="sm" onChange={(event) => setKeyword(event.target.value)}>
                <option>선택</option>
                {genreData?.map((genre, index) => {
                  return <option key={index}>{genre.name}</option>;
                })}
              </Form.Select>
            </Row>
          </Col>
          <Col lg={8} xs={12}>
            {data?.results?.length > 0 ? (
              <>
                <Row>
                  {data?.results.map((movie, index) => (
                    <Col key={index} lg={4} xs={12}>
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
                <div style={{ height: "100vh" }}>
                  <h1 style={{color:"white"}}>검색결과가 없습니다.</h1>
                </div>
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
