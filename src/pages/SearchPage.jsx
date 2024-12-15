import { useSearchData } from 'Store/SearchData';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import MoviesLayout from 'components/MoviesLayout/MoviesLayout';
import React from 'react';

export default function SearchPage() {
  const { searchData, isLoading, error } = useSearchData();

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        searchData && <MoviesLayout data={searchData} />
      )}
    </div>
  );
}
