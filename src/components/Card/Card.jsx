import React from 'react';
import { FaStar } from 'react-icons/fa';
import styles from './Card.module.css';
import { Link } from 'react-router-dom';

export default function Card({
  poster_path,
  title,
  vote_average,
  release_date,
  movie_id,
}) {
  return (
    <div className={styles.coverContainer}>
      <div>
        <Link to={`/${movie_id}`}>
          <div className={styles.imageContainer}>
            <img
              src={`https://image.tmdb.org/t/p/w500` + poster_path}
              alt={title}
              className={styles.image}
            />
          </div>
        </Link>
      </div>
      <div className={styles.description}>
        <Link to={`/${movie_id}`}>
          <h2 className={styles.title}>{title}</h2>
        </Link>
        <div className={styles.rating}>
          <div className={styles.ratingContainer}>
            <FaStar color="orange" />
            <p>
              <b>{vote_average?.toFixed(1)}</b>
            </p>
          </div>
          <p>
            <b>{release_date}</b>
          </p>
        </div>
      </div>
    </div>
  );
}
