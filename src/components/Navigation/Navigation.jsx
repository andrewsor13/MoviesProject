import React from 'react';
import styles from './Navigation.module.css';
import { NavLink, Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className={styles.navigation}>
      <Link to="/MoviesProject">
        <p>
          Movies<span>Page</span>
        </p>
      </Link>
      <div className={styles.navigationRight}>
        <NavLink exact="true" to="/MoviesProject" className={styles.link}>
          Home
        </NavLink>
        <NavLink
          exact="true"
          to="/MoviesProject/movies"
          className={styles.link}
        >
          Search
        </NavLink>
      </div>
    </nav>
  );
}
