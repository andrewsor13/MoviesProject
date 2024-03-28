import React from 'react';
import styles from './MoviesLayout.module.css';
import Card from 'components/Card/Card';

export default function MoviesLayout({ data }) {
  return (
    <div>
      <ul className={styles.list}>
        {data.map(movie => (
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
    </div>
  );
}
