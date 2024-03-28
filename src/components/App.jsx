import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import SearchPage from './SearchPage/SearchPage';
import Container from './Container/Container';
import Navigation from './Navigation/Navigation';
import MovieDetails from './MovieDetails/MovieDetails';
import StoreProvider from 'Store';

export const App = () => {
  return (
    <StoreProvider>
      <div>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route
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
            >
              <Route path=":query" element="" />
            </Route>
            <Route path=":movieId" element={<MovieDetails />} />

            <Route path="*" element="" />
          </Routes>
        </BrowserRouter>
      </div>
    </StoreProvider>
  );
};
