import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useHandleSearch from '../../Hooks/useHandleSearch';
import Container from 'components/Container/Container';
import styles from './MovieDetails.module.css';
import { FaStar } from 'react-icons/fa';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import Reviews from 'components/Reviews/Reviews';
import Credits from 'components/Credits/Credits';
import Notiflix from 'notiflix';
import { useAuth } from 'Store/AuthContext';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';

export default function MovieDetails() {
  const [revClick, setRevClick] = useState(false);
  const { fetchData, setItem, data, isLoading, credits, reviews } =
    useHandleSearch();
  const { movieId } = useParams();
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
      fav => fav.movie_id?.toString() === movieId.toString()
    );
    setFavorite(isFavorite);
  }, [favorites, user, movieId]);

  const toggleFavorite = async () => {
    if (!user) {
      Notiflix.Notify.failure('You need to log in to save to favorites.');
      return;
    }

    try {
      if (favorite) {
        await deleteFavorite(movieId);
        Notiflix.Notify.success('Deleted from favorites!');
      } else {
        await addFavorite(movieId);
        Notiflix.Notify.success('Added to favorites!');
      }

      await fetchFavorites(user.uid);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRevClick = () => {
    setRevClick(true);
  };

  const handleCastClick = () => {
    setRevClick(false);
  };

  const valueConverter = num => {
    if (num >= 1e9) {
      const convertedValue = (num / 1e9).toFixed(1);
      return `${convertedValue}b $`;
    } else if (num >= 1e6) {
      const convertedValue = (num / 1e6).toFixed(1);
      return `${convertedValue}m $`;
    } else {
      return `${num.toLocaleString()}$`;
    }
  };

  useEffect(() => {
    if (movieId) {
      setItem(movieId);
      fetchData();
    }
  }, [fetchData, setItem, movieId, isLoading]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Container>
          <div className={styles.container}>
            {data && (
              <div>
                <div className={styles.posterContainer}>
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
                      src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                      alt="Movie Poster"
                      className={styles.poster}
                    />
                  </div>

                  <div className={styles.details}>
                    <div className={styles.title}>
                      <h2>
                        {data.title} ({data.release_date.split('-')[0]})
                      </h2>
                      <div>
                        <div className={styles.detailsInfo}>
                          <p>({data.original_language.toUpperCase()})</p>
                          <p>{data.release_date}</p>
                          <ul className={styles.detailsGenres}>
                            {data.genres.map((genre, index) => (
                              <li
                                key={index}
                                className={styles.detailsGenresGenre}
                              >
                                <strong>
                                  {genre.name}
                                  {index < data.genres.length - 1 ? ',' : null}
                                </strong>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className={styles.detailsRating}>
                        <FaStar color="orange" size={20} />
                        <p>
                          <strong>{data.vote_average?.toFixed(1)}</strong>
                        </p>
                      </div>
                      <p className={styles.detailsTagline}>{data.tagline}</p>
                    </div>

                    <div className={styles.tabletDescription}>
                      <p>
                        <b>Description:</b>
                      </p>
                      <p className={styles.detailsOverview}>{data.overview}</p>
                    </div>

                    <ul className={styles.sideInfoExtraInfoTablet}>
                      <li className={styles.extraInfo_item}>
                        <p className={styles.extraInfo_item_title}>Status:</p>
                        <p className={styles.extraInfo_item_text}>
                          {data?.status}
                        </p>
                      </li>
                      <li className={styles.extraInfo_item}>
                        <p className={styles.extraInfo_item_title}>Budget:</p>
                        <p className={styles.extraInfo_item_text}>
                          {data?.budget === 0
                            ? 'N/A'
                            : valueConverter(data?.budget)}
                        </p>
                      </li>
                      <li className={styles.extraInfo_item}>
                        <p className={styles.extraInfo_item_title}>Revenue:</p>
                        <p className={styles.extraInfo_item_text}>
                          {data?.revenue === 0
                            ? 'N/A'
                            : valueConverter(data?.revenue)}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <hr className={styles.line}></hr>

                <div className={styles.sideInfo}>
                  <div className={styles.sideInfoDescription}>
                    <p>
                      <b>Description:</b>
                    </p>
                    <p className={styles.detailsOverview}>{data.overview}</p>
                  </div>
                  <hr className={styles.line}></hr>
                  <ul className={styles.sideInfoExtraInfo}>
                    <li className={styles.extraInfo_item}>
                      <p className={styles.extraInfo_item_title}>Status:</p>
                      <p className={styles.extraInfo_item_text}>
                        {data?.status}
                      </p>
                    </li>
                    <li className={styles.extraInfo_item}>
                      <p className={styles.extraInfo_item_title}>Budget:</p>
                      <p className={styles.extraInfo_item_text}>
                        {data?.budget === 0
                          ? 'N/A'
                          : valueConverter(data?.budget)}
                      </p>
                    </li>
                    <li className={styles.extraInfo_item}>
                      <p className={styles.extraInfo_item_title}>Revenue:</p>
                      <p className={styles.extraInfo_item_text}>
                        {data?.revenue === 0
                          ? 'N/A'
                          : valueConverter(data?.revenue)}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            <div className={styles.extras}>
              <button
                className={`${styles.extrasButton} ${
                  !revClick ? styles.extrasButtonActive : ''
                }`}
                onClick={handleCastClick}
              >
                Cast
              </button>
              <button
                className={`${styles.extrasButton} ${
                  revClick ? styles.extrasButtonActive : ''
                }`}
                onClick={handleRevClick}
              >
                Reviews (<b>{reviews?.total_results}</b>)
              </button>
            </div>
            <div className={styles.elContainer}>
              <div className={styles.dataBlock}>
                <div className={styles.dataBlock_castRev}>
                  {revClick ? (
                    <Reviews reviews={reviews} />
                  ) : (
                    <Credits credits={credits} />
                  )}
                  <div className={styles.fadeElement}></div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
