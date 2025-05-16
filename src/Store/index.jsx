import React from 'react';

import { AuthProvider } from './AuthContext';
import { SearchFormProvider } from './SearchData';
import { TrendingMoviesProvider } from './TrendingDataContext';

export default function StoreProvider({ children }) {
  return (
    <>
      <AuthProvider>
        <TrendingMoviesProvider>
          <SearchFormProvider>{children}</SearchFormProvider>
        </TrendingMoviesProvider>
      </AuthProvider>
    </>
  );
}
