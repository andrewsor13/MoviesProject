import React from 'react';
import styles from './MoviesLayout.module.css';
import Card from 'components/Card/Card';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { useTrendingData } from '../../Store/TrendingDataContext';

export default function MoviesLayout() {
  const { trendingData, isLoading, error } = useTrendingData();

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className={styles.list}>
          {trendingData?.map(movie => (
            <li className={`${styles.listItem}`} key={movie.id}>
              <Card
                poster_path={movie.poster_path}
                title={movie.title}
                vote_average={movie.vote_average}
                release_date={movie.release_date}
                movie_id={movie.id}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
