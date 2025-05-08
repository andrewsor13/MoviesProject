import React, { useEffect, useRef, useState } from 'react';
import styles from './SearchButton.module.css';
import { IoSearchCircleSharp } from 'react-icons/io5';
import { useSearchData } from 'Store/SearchData';
import { useNavigate } from 'react-router-dom';

export default function SearchButton() {
  const { setQuery, pageNumber } = useSearchData();
  const [inputValue, setInputValue] = useState('');
  const [windowSize, setWindowSize] = useState(window.screen.width);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleResize = () => {
    setWindowSize(window.screen.width);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (inputValue !== '') {
      setQuery(inputValue);
      navigate(`/MoviesProject/search/${inputValue}/${pageNumber}`);
      setInputValue('');
      if (inputRef.current) {
        inputRef.current.blur();
      }
      document.documentElement.style.zoom = '1';
    }
  };

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          ref={inputRef}
          className={styles.input}
          placeholder="Search..."
        />
        <button type="submit" className={styles.searchButton}>
          <IoSearchCircleSharp
            size={windowSize >= 768 ? 25 : 20}
            className={styles.icon}
          />
        </button>
      </form>
    </div>
  );
}
