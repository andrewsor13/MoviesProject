import React, { Suspense, lazy } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Container from './Container/Container';
import Navigation from './Navigation/Navigation';
import StoreProvider from 'Store';
import LoadingPage from './LoadingPage/LoadingPage';

const LazyHomePage = lazy(() => import('./HomePage/HomePage'));

const LazySearchPage = lazy(() => import('./SearchPage/SearchPage'));

const LazyMovieDetails = lazy(() => import('./MovieDetails/MovieDetails'));

export const App = () => {
  return (
    <StoreProvider>
      <div>
        <BrowserRouter>
          <Navigation />
          <Suspense fallback={<LoadingPage />}>
            <Routes>
              <Route
                path="/MoviesProject"
                element={
                  <Container>
                    <LazyHomePage />
                  </Container>
                }
              ></Route>

              <Route
                path="/MoviesProject/search"
                element={
                  <Container>
                    <LazySearchPage />
                  </Container>
                }
              >
                <Route path=":query" element="" />
              </Route>

              <Route path=":movieId" element={<LazyMovieDetails />} />

              <Route path="*" element="" />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
    </StoreProvider>
  );
};
