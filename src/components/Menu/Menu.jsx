import React, { useEffect, useRef, useState } from 'react';
import styles from './Menu.module.css';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import { useSearchData } from 'Store/SearchData';
import { FaUserCircle } from 'react-icons/fa';
import { BiCameraMovie } from 'react-icons/bi';
import { BiMoviePlay } from 'react-icons/bi';

export default function Menu({ handleMenuClick, isOpen }) {
  const [animateOut, setAnimateOut] = useState(false);
  const menuRef = useRef(null);
  const { resetPagination } = useSearchData();
  const toggleMenu = () => {
    setAnimateOut(true);
    setTimeout(() => {
      setAnimateOut(false);
      handleMenuClick();
    }, 400);
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        toggleMenu();
      }
    }

    if (isOpen && !animateOut) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, animateOut]);
  useEffect(() => {
    if (isOpen && !animateOut) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, animateOut]);
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
        <NavLink
          onClick={() => {
            resetPagination();
            toggleMenu();
          }}
          exact="true"
          to="/MoviesProject/signIn"
          className={styles.link}
        >
          <FaUserCircle color="white" size={20} />
          <p className={styles.linkOption}>Sign in</p>
        </NavLink>{' '}
        <NavLink
          onClick={() => {
            resetPagination();
            toggleMenu();
          }}
          exact="true"
          to="/MoviesProject/Movies"
          className={styles.link}
        >
          <BiCameraMovie size={20} color="white" />
          <p className={styles.linkOption}>Movies</p>
        </NavLink>{' '}
        <NavLink
          onClick={() => {
            resetPagination();
            toggleMenu();
          }}
          exact="true"
          to="/MoviesProject/tvShows"
          className={styles.link}
        >
          <BiMoviePlay size={20} color="white" />
          <p className={styles.linkOption}>Tv shows</p>
        </NavLink>{' '}
      </div>
    </div>
  );
}
