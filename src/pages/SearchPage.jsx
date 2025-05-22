import { useSearchData } from 'Store/SearchData';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import MoviesLayout from 'components/MoviesLayout/MoviesLayout';
import Pagination from 'components/Pagination/Pagination';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function SearchPage() {
  const { searchData, isLoading, error, setQuery, setPageNumber } =
    useSearchData();
  const { query, pageNumber } = useParams();
  useEffect(() => {
    if (query && pageNumber) {
      setQuery(query);
      setPageNumber(pageNumber);
    }
  }, [query, pageNumber, setPageNumber, setQuery]);

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
