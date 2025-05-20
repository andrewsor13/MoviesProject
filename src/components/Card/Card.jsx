import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import styles from './Card.module.css';
import { useNavigate } from 'react-router-dom';
import { useSearchData } from 'Store/SearchData';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { useAuth } from 'Store/AuthContext';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  timeout: 1000,
  position: 'left-bottom',
  clickToClose: true,
  pauseOnHover: false,
});

export default function Card({
  poster_path,
  title,
  vote_average,
  release_date,
  movie_id,
}) {
  const navigate = useNavigate();
  const { query, pageNumber } = useSearchData();
  const [hovered, setHovered] = useState(false);
  const { user, favorites, addFavorite, fetchFavorites, deleteFavorite } =
    useAuth();
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (!user) {
      setFavorite(false);
      return;
    }

    const isFavorite = favorites?.some(
      fav => fav.movie_id?.toString() === movie_id.toString()
    );
    setFavorite(isFavorite);
  }, [favorites, user, movie_id]);

  const handleClick = () => {
    if (query) {
      navigate(`/MoviesProject/search/${query}/${pageNumber}/${movie_id}`);
    } else {
      navigate(`/MoviesProject/details/${movie_id}`);
    }
  };

  const toggleFavorite = async () => {
    if (!user) {
      Notiflix.Notify.failure('You need to log in to save to favorites.');
      return;
    }

    try {
      if (favorite) {
        await deleteFavorite(movie_id);
        Notiflix.Notify.success('Deleted from favorites!');
      } else {
        await addFavorite(movie_id);
        Notiflix.Notify.success('Added to favorites!');
      }

      await fetchFavorites(user.uid);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.coverContainer}>
      <div className={styles.imageContainer}>
        <div
          className={styles.favoriteIcon}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={toggleFavorite}
        >
          {favorite || hovered ? (
            <MdFavorite size={20} color="#f44336" />
          ) : (
            <MdFavoriteBorder size={20} color="black" />
          )}
        </div>

        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className={styles.image}
          onClick={handleClick}
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
