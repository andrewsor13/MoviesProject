import React from 'react';
import styles from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import SearchButton from 'components/SearchButton/SearchButton';
import { useSearchData } from 'Store/SearchData';

export default function Navigation() {
  const location = useLocation();
  const { resetPagination } = useSearchData();

  return (
    <nav className={styles.navigation}>
      <NavLink
        onClick={resetPagination}
        exact="true"
        to="/MoviesProject"
        className={styles.link}
      >
        <p>
          <span className={styles.titleFirst}>Movies</span>
          <span className={styles.titleSecond}>Page</span>
        </p>
      </NavLink>
      <div className={styles.navigationRight}>
        <NavLink
          onClick={resetPagination}
          exact="true"
          to="/MoviesProject"
          className={styles.link}
        >
          <p
            className={`${styles.linkOption} ${
              location.pathname === '/MoviesProject' ? styles.activeLink : ''
            }`}
          >
            Trending
          </p>
        </NavLink>
        <SearchButton />
      </div>
    </nav>
  );
}
