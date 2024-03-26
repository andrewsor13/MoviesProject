import React from 'react';
import styles from './Navigation.module.css';
import { NavLink, Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className={styles.navigation}>
      <Link to="/react-hw-05-movies">
        <p>
          Movies<span>Page</span>
        </p>
      </Link>
      <div className={styles.navigationRight}>
        <NavLink
          exact
          to="/react-hw-05-movies"
          activeClassName={styles.linkActive}
          className={styles.link}
        >
          Home
        </NavLink>
        <NavLink
          exact
          to="/react-hw-05-movies/movies"
          activeClassName={styles.linkActive}
          className={styles.link}
        >
          Search
        </NavLink>
      </div>
    </nav>
  );
}
