import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import MoviesPage from './MoviesPage/MoviesPage';
import Container from './Container/Container';
import Navigation from './Navigation/Navigation';

export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navigation />
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
      </BrowserRouter>
    </div>
  );
};
