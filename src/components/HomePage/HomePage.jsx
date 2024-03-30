import MoviesLayout from 'components/MoviesLayout/MoviesLayout';
import React from 'react';
import { useTrendingData } from '../../Store/TrendingDataContext';

export default function HomePage() {
  const { trendingData } = useTrendingData();

  return (
    <div>
      <MoviesLayout data={trendingData} />
    </div>
  );
}
