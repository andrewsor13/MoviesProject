import React from 'react';

import { AuthProvider } from './AuthContext';
import { SearchFormProvider } from './SearchData';
import { TrendingMoviesProvider } from './TrendingDataContext';
import { FavoriteMoviesProvider } from './FavoritesContext';

export default function StoreProvider({ children }) {
  return (
    <>
      <AuthProvider>
        <TrendingMoviesProvider>
          <SearchFormProvider>
            <FavoriteMoviesProvider>{children}</FavoriteMoviesProvider>
          </SearchFormProvider>
        </TrendingMoviesProvider>
      </AuthProvider>
    </>
  );
}
