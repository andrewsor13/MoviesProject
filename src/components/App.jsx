import React, { Suspense, lazy } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Container from './Container/Container';
import Navigation from './Navigation/Navigation';
import StoreProvider from 'Store';
import LoadingPage from './LoadingPage/LoadingPage';
import NotFoundPage from './NotFoundPage/NotFountPage';

const LazyHomePage = lazy(() => import('../pages/HomePage'));

const LazyMovieDetails = lazy(() => import('../pages/MoviePage'));

const LazySearchPage = lazy(() => import('../pages/SearchPage'));

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
                path="/MoviesProject/search/:query"
                element={
                  <Container>
                    <LazySearchPage />
                  </Container>
                }
              ></Route>

              <Route
                path="/MoviesProject/details/:movieId"
                element={
                  <Container>
                    <LazyMovieDetails />
                  </Container>
                }
              />

              <Route
                path="/MoviesProject/search/:query/:movieId"
                element={
                  <Container>
                    <LazyMovieDetails />
                  </Container>
                }
              ></Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
    </StoreProvider>
  );
};
