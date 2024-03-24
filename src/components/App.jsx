import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import MoviesPage from './MoviesPage/MoviesPage';
import Container from './Container/Container';

export const App = () => {
  return (
    <div>
      <Routes>
        <Route
          index
          path="/react-hw-05-movies"
          element={
            <Container>
              <HomePage />
            </Container>
          }
        ></Route>
        <Route
          path="/react-hw-05-movies/movies"
          element={
            <Container>
              <MoviesPage />
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
      </Routes>
    </div>
  );
};
