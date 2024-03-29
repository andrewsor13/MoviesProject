import React from 'react';
import styles from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();

  return (
    <nav className={styles.navigation}>
      <NavLink exact="true" to="/MoviesProject" className={styles.link}>
        <p>
          <span className={styles.titleFirst}>Movies</span>
          <span className={styles.titleSecond}>Page</span>
        </p>
      </NavLink>
      <div className={styles.navigationRight}>
        <NavLink exact="true" to="/MoviesProject" className={styles.link}>
          <p
            className={`${styles.linkOption} ${
              location.pathname === '/MoviesProject' ? styles.activeLink : ''
            }`}
          >
            Home
          </p>
        </NavLink>
        <NavLink
          exact="true"
          to="/MoviesProject/Search"
          className={styles.link}
        >
          <p
            className={`${styles.linkOption} ${
              location.pathname === '/MoviesProject/Search'
                ? styles.activeLink
                : ''
            }`}
          >
            Explore
          </p>
        </NavLink>
      </div>
    </nav>
  );
}
