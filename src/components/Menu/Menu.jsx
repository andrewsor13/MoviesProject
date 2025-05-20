import React, { useEffect, useRef, useState } from 'react';
import styles from './Menu.module.css';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSearchData } from 'Store/SearchData';
import { FaUserCircle } from 'react-icons/fa';
import { BiCameraMovie } from 'react-icons/bi';
import { BiMoviePlay } from 'react-icons/bi';
import { IoLogOutOutline } from 'react-icons/io5';
import { useAuth } from 'Store/AuthContext';

export default function Menu({ handleMenuClick, isOpen }) {
  const [animateOut, setAnimateOut] = useState(false);
  const menuRef = useRef(null);
  const { resetPagination } = useSearchData();
  const { user, logout } = useAuth();
  const isAuth = !!user;
  const navigate = useNavigate();

  const toggleMenu = () => {
    setAnimateOut(true);
    setTimeout(() => {
      setAnimateOut(false);
      handleMenuClick();
    }, 180);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/MoviesProject');
    } catch (error) {
      console.error('Eroare la logout:', error);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setAnimateOut(true);
        setTimeout(() => {
          setAnimateOut(false);
          handleMenuClick();
        }, 180);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleMenuClick]);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className={`${styles.menuContainer} ${
        isOpen && !animateOut ? styles.animateIn : styles.animateOut
      }`}
    >
      <div className={styles.topContainer}>
        <IoIosCloseCircleOutline
          size={30}
          onClick={toggleMenu}
          color="white"
          className={styles.closeButton}
        />
        <hr className={styles.menuLine} />
      </div>
      <div className={styles.menuOptions}>
        {isAuth ? (
          <div className={styles.menuOptions}>
            <NavLink
              onClick={() => {
                resetPagination();
                toggleMenu();
              }}
              exact="true"
              to={`/MoviesProject/profile/${user.displayName}`}
              className={styles.link}
            >
              <FaUserCircle size={25} color="white" />
              <p className={styles.linkOption}>MyProfile</p>
            </NavLink>
            <NavLink
              onClick={() => {
                resetPagination();
                toggleMenu();
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
                toggleMenu();
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
                toggleMenu();
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
                  toggleMenu();
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
                  toggleMenu();
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
                toggleMenu();
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
