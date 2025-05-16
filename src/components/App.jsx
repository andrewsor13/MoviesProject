import React, { Suspense, lazy } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Container from './Container/Container';
import Navigation from './Navigation/Navigation';
import StoreProvider from 'Store';
import LoadingPage from './LoadingPage/LoadingPage';
import PrivateRoutes from '../routes/PrivateRoutes';

const LazyMoviePage = lazy(() => import('../pages/HomePage'));

const LazyMovieDetails = lazy(() => import('../pages/MovieInfo'));

const LazySearchPage = lazy(() => import('../pages/SearchPage'));

const LazyLoginPage = lazy(() => import('../pages/LoginPage'));

const LazyRegisterPage = lazy(() => import('../pages/RegisterPage'));

export const App = () => {
  return (
    <StoreProvider>
      <div>
        <BrowserRouter>
          <Navigation />
          <Suspense fallback={<LoadingPage />}>
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path="/MoviesProject/profile/:uid"></Route>
                <Route path="/MoviesProject/:uid/favorites"></Route>
              </Route>
              <Route
                path="/MoviesProject"
                element={
                  <Container>
                    <LazyMoviePage />
                  </Container>
                }
              ></Route>
              <Route
                path="/MoviesProject/signUp"
                element={
                  <Container>
                    <LazyRegisterPage />
                  </Container>
                }
              ></Route>
              <Route
                path="/MoviesProject/signIn"
                element={
                  <Container>
                    <LazyLoginPage />
                  </Container>
                }
              ></Route>
              <Route
                path="/MoviesProject/movies"
                element={
                  <Container>
                    <LazyMoviePage />
                  </Container>
                }
              ></Route>
              <Route
                path="/MoviesProject/search/:query/:pageNumber"
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
                path="/MoviesProject/search/:query/:pageNumber/:movieId"
                element={
                  <Container>
                    <LazyMovieDetails />
                  </Container>
                }
              ></Route>

              <Route path="*" element={<LazyMoviePage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
    </StoreProvider>
  );
};
