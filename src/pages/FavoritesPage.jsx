import MoviesLayout from 'components/MoviesLayout/MoviesLayout';
import React from 'react';
import { useFavoritesData } from 'Store/FavoritesContext';
import { useAuth } from 'Store/AuthContext';

export default function FavoritesPage() {
  const { favoritesData } = useFavoritesData();
  const { favorites } = useAuth();
  return (
    <div>
      {favorites.length > 0 ? (
        <MoviesLayout data={favoritesData}></MoviesLayout>
      ) : (
        <p style={{ margin: '50px auto', width: '200px' }}>
          No movies in your list.
        </p>
      )}
    </div>
  );
}
