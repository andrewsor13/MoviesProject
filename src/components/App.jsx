import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import SearchPage from './SearchPage/SearchPage';
import Container from './Container/Container';
import Navigation from './Navigation/Navigation';
import { TrendingMoviesProvider } from '../Store/TrendingDataContext';
import MovieDetails from './MovieDetails/MovieDetails';

export const App = () => {
  return (
    <TrendingMoviesProvider>
      <div>
        <BrowserRouter>
          <Container>
            <Navigation />
          </Container>
          <Routes>
            <Route
              index
              path="/MoviesProject"
              element={
                <Container>
                  <HomePage />
                </Container>
              }
            ></Route>
            <Route
              path="/MoviesProject/search"
              element={
                <Container>
                  <SearchPage />
                </Container>
              }
            ></Route>
            <Route
              path="*"
              element={
                <Container>
                  <HomePage />
                </Container>
              }
            />
            <Route path="/:movieId" element={<MovieDetails />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </TrendingMoviesProvider>
  );
};
