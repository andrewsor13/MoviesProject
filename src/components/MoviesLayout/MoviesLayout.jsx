import React from 'react';
import styles from './MoviesLayout.module.css';
import Card from 'components/Card/Card';

import { useTrendingData } from '../../Store/TrendingDataContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export default function MoviesLayout({ data }) {
  const { isLoading, error } = useTrendingData();

  const hasResultsArray = Array.isArray(data?.results);
  const hasDirectArray = Array.isArray(data);

  const movies = hasResultsArray ? data.results : hasDirectArray ? data : [];

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{error}</p>
      ) : movies.length > 0 ? (
        <ul className={styles.list}>
          {movies.map(movie => (
            <li className={styles.listItem} key={movie.movie_id || movie.id}>
              <Card
                poster_path={movie.poster_path}
                title={movie.title}
                vote_average={movie.vote_average}
                release_date={movie.release_date}
                movie_id={movie.movie_id || movie.id}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
