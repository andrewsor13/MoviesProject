import React, { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';

const SearchDataContext = createContext();

export const SearchFormProvider = ({ children }) => {
  const [searchData, setSearchData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      // Verifică dacă query există înainte de a face solicitarea
      if (query !== undefined && query !== '') {
        const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTRhOTFjNTY4YjYyNWRjMTBiYjMyMTZiMmU4OTNjZSIsInN1YiI6IjY1YjM3OTVkYTA2NjQ1MDE3YzhkODdhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k-J_vpdCaIcpcHQqeu_ltZbhKGRyu_a4IsRKGb1g_wY',
          },
        };
        try {
          setIsLoading(true);
          const response = await axios.get(url, options);
          // const movies = response.data.results;

          // await Promise.all(
          //   movies.map(movie => {
          //     return new Promise((resolve, reject) => {
          //       const img = new Image();
          //       img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
          //       img.onload = resolve;
          //       img.onerror = reject;
          //     });
          //   })
          // );
          setSearchData(response.data.results);
          console.log(response.data.results);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [query]);

  const contextValue = { searchData, isLoading, error, setQuery, query };

  return (
    <SearchDataContext.Provider value={contextValue}>
      {children}
    </SearchDataContext.Provider>
  );
};

export const useSearchData = () => {
  const context = useContext(SearchDataContext);
  if (!context) {
    throw new Error('useSearchData must be used inside of an SearchProvider');
  }
  return context;
};
