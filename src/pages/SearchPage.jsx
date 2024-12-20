import { useSearchData } from 'Store/SearchData';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import MoviesLayout from 'components/MoviesLayout/MoviesLayout';
import Pagination from 'components/Pagination/Pagination';
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
        searchData && (
          <div>
            <MoviesLayout data={searchData} />
            <Pagination totalPages={searchData.total_pages} />
          </div>
        )
      )}
    </div>
  );
}
