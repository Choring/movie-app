import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AppLayout } from './layout/AppLayout';
import { Homepage } from './pages/Homepage/Homepage';
import { MovieDetailPage } from './pages/MovieDetail/MovieDetailPage';
import { MoviesPage } from './pages/Movies/MoviesPage';
import { NotFoundPage } from './pages/NotFoundpage/NotFoundPage';
import 'bootstrap/dist/css/bootstrap.min.css';

// 홈페이지
// 영화 전체보여주는 페이지(서치) /movies
// 영화 디테일 페이지 /movies/:id
// 추천 영화 /movies/:id/recommandation
// 리뷰 /movies/:id/reviews
function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {/* index 는 부모에서 쓰여진 path를 같은걸 쓴다는 뜻 */}
        <Route index element={<Homepage />} /> 
        <Route path='movies'>
          <Route index element={<MoviesPage />} />
          <Route path=":id" element={<MovieDetailPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
