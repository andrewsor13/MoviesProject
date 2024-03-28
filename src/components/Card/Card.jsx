import React from 'react';
import { FaStar } from 'react-icons/fa';
import styles from './Card.module.css';
import { useNavigate } from 'react-router-dom';

export default function Card({
  poster_path,
  title,
  vote_average,
  release_date,
  movie_id,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${movie_id}`);
  };
  return (
    <div className={styles.coverContainer} onClick={handleClick}>
      <div className={styles.imageContainer}>
        <img
          src={`https://image.tmdb.org/t/p/w500` + poster_path}
          alt={title}
          className={styles.image}
        />
      </div>
      <div className={styles.description}>
        <h2 className={styles.title}>{title}</h2>
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
