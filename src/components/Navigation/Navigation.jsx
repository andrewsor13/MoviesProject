import React, { useEffect, useState } from 'react';
import styles from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import SearchButton from 'components/SearchButton/SearchButton';
import { useSearchData } from 'Store/SearchData';
import { FaUserCircle } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';
import Menu from 'components/Menu/Menu';
import { useAuth } from '../../Store/AuthContext';

export default function Navigation() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const location = useLocation();
  const { resetPagination } = useSearchData();
  const { user } = useAuth();
  const isAuth = !!user;

  const handleMenuClick = () => {
    setIsMenuActive(!isMenuActive);
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      {width < 600 ? (
        <div className={styles.navigationRight}>
          <SearchButton />
          <GiHamburgerMenu
            onClick={() => {
              handleMenuClick();
            }}
            size={20}
          />
        </div>
      ) : (
        <div className={styles.navigationRight}>
          <SearchButton />
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
          {isAuth ? (
            <div className={styles.userButton}>
              <FaUserCircle size={25} />
              <IoMdArrowDropdown size={20} />
            </div>
          ) : (
            <NavLink
              onClick={() => {
                resetPagination();
              }}
              exact="true"
              to="/MoviesProject/signIn"
              className={styles.link}
            >
              <p className={styles.linkOption}>Sign in</p>
            </NavLink>
          )}
        </div>
      )}
      {isMenuActive ? (
        <Menu handleMenuClick={handleMenuClick} isOpen={isMenuActive} />
      ) : null}
    </nav>
  );
}
