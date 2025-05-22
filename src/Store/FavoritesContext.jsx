import React, { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Store/AuthContext';

const FavoritesContext = createContext();

export const FavoriteMoviesProvider = ({ children }) => {
  const [favoritesData, setFavoritesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!favorites || favorites.length === 0) {
        setFavoritesData([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const promises = favorites.map(favorite =>
          axios.get(
            `https://api.themoviedb.org/3/movie/${favorite.movie_id}?language=ro-RO`,
            {
              headers: {
                accept: 'application/json',
                Authorization: process.env.REACT_APP_TMDB_API_TOKEN,
              },
            }
          )
        );

        const responses = await Promise.all(promises);
        const data = responses.map(res => res.data);
        setFavoritesData(data);
      } catch (err) {
        setError('Error while fetching favorite movies.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [favorites]);

  const contextValue = { favoritesData, isLoading, error };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesData = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      'useFavoritesData must be used inside of an FavoritesProvider'
    );
  }
  return context;
};
