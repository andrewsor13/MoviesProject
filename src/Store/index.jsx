import React from 'react';

import { SearchFormProvider } from './SearchData';
import { TrendingMoviesProvider } from './TrendingDataContext';

export default function StoreProvider({ children }) {
  return (
    <>
      <TrendingMoviesProvider>
        <SearchFormProvider>{children}</SearchFormProvider>
      </TrendingMoviesProvider>
    </>
  );
}
