import MoviesLayout from 'components/MoviesLayout/MoviesLayout';
import React from 'react';
import { useTrendingData } from '../../Store/TrendingDataContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export default function HomePage() {
  const { trendingData, isLoading, error } = useTrendingData();

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <MoviesLayout data={trendingData} />
      )}
    </div>
  );
}
