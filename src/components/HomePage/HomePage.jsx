import MoviesLayout from 'components/MoviesLayout/MoviesLayout';
import React from 'react';
import { useTrendingData } from '../../Store/TrendingDataContext';
import { useSearchData } from 'Store/SearchData';
import SearchPage from 'components/SearchPage/SearchPage';

export default function HomePage() {
  const { trendingData } = useTrendingData();
  const { searchData } = useSearchData();

  return (
    <div>
      <MoviesLayout data={trendingData} />
    </div>
  );
}
