import React, { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';

const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: process.env.REACT_APP_TMDB_API_TOKEN,
  },
};
const TrendingContext = createContext();

export const TrendingMoviesProvider = ({ children }) => {
  const [trendingData, setTrendingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, options);
        setTrendingData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const contextValue = { trendingData, isLoading, error };

  return (
    <TrendingContext.Provider value={contextValue}>
      {children}
    </TrendingContext.Provider>
  );
};

export const useTrendingData = () => {
  const context = useContext(TrendingContext);
  if (!context) {
    throw new Error(
      'useTradingData must be used inside of an TrendingProvider'
    );
  }
  return context;
};
