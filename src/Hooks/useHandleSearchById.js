import { useEffect, useState } from 'react';
import axios from 'axios';

const useHandleSearchById = movieId => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ro-RO`,
          {
            headers: {
              accept: 'application/json',
              Authorization: process.env.REACT_APP_TMDB_API_TOKEN,
            },
          }
        );
        setData(response.data);
      } catch (err) {
        setError('Nu s-au putut obține datele filmului.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  return { data, isLoading, error };
};

export default useHandleSearchById;
