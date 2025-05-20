import React, { useEffect, useRef } from 'react';
import styles from './DropdownMenu.module.css';
import { FaUserCircle } from 'react-icons/fa';
import { BiCameraMovie } from 'react-icons/bi';
import { BiMoviePlay } from 'react-icons/bi';
import { IoLogOutOutline } from 'react-icons/io5';
import { useSearchData } from 'Store/SearchData';
import { useAuth } from 'Store/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';

export default function DropdownMenu({ isClicked, toggle }) {
  const toggleRef = useRef(null);

  const { resetPagination } = useSearchData();
  const { user, logout } = useAuth();
  const isAuth = !!user;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/MoviesProject');
    } catch (error) {
      console.error('Eroare la logout:', error);
    }
  };

  useEffect(() => {
    if (!isClicked) return;

    function handleClickOutside(event) {
      if (toggleRef.current && !toggleRef.current.contains(event.target)) {
        setTimeout(() => {
          toggle();
        }, 180);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isClicked, toggle]);
  return (
    <div
      ref={toggleRef}
      className={`${styles.menuContainer} ${
        isClicked ? styles.animateIn : null
      }`}
    >
      <div className={styles.menuOptions}>
        {isAuth ? (
          <div className={styles.menuOptions}>
            <NavLink
              onClick={() => {
                resetPagination();
              }}
              exact="true"
              to={`/MoviesProject/profile/${user.uid}`}
              className={styles.link}
            >
              <FaUserCircle size={25} color="white" />
              <p className={styles.linkOption}>MyProfile</p>
            </NavLink>
            <NavLink
              onClick={() => {
                resetPagination();
              }}
              exact="true"
              to={`/MoviesProject/${user.displayName}/favorites`}
              className={styles.link}
            >
              <BiMoviePlay size={25} color="white" />
              <p className={styles.linkOption}>My list</p>
            </NavLink>
            <NavLink
              onClick={() => {
                resetPagination();
              }}
              exact="true"
              to="/MoviesProject"
              className={styles.link}
            >
              <BiCameraMovie size={25} color="white" />
              <p className={styles.linkOption}>Trending</p>
            </NavLink>
            <NavLink
              onClick={() => {
                resetPagination();
                handleLogout();
              }}
              exact="true"
              to="/MoviesProject"
              className={styles.link}
            >
              <IoLogOutOutline size={25} color="white" />
              <p className={styles.linkOption}>Logout</p>
            </NavLink>
          </div>
        ) : (
          <div className={styles.menuOptions}>
            <div className={styles.accountBlock}>
              <NavLink
                onClick={() => {
                  resetPagination();
                }}
                exact="true"
                to="/MoviesProject/signIn"
                className={styles.link}
              >
                <FaUserCircle color="white" size={25} />
                <p className={styles.linkOption}>Sign in</p>
              </NavLink>
              <p className={styles.linkOption}>/</p>
              <NavLink
                onClick={() => {
                  resetPagination();
                }}
                exact="true"
                to="/MoviesProject/signUp"
                className={styles.link}
              >
                <p className={styles.linkOption}>Sign up</p>
              </NavLink>
            </div>

            <NavLink
              onClick={() => {
                resetPagination();
              }}
              exact="true"
              to="/MoviesProject/Movies"
              className={styles.link}
            >
              <BiCameraMovie size={25} color="white" />
              <p className={styles.linkOption}>Trending</p>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}
