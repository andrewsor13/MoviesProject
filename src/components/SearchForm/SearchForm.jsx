import React, { useState } from 'react';
import styles from './SearchForm.module.css';
import { IoSearchSharp } from 'react-icons/io5';
import { useSearchData } from 'Store/SearchData';
import { useNavigate } from 'react-router-dom';
import MoviesLayout from 'components/MoviesLayout/MoviesLayout';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export default function SearchForm() {
  const { searchData, isLoading, error, setQuery } = useSearchData();
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    setQuery(inputValue);
    navigate(`/MoviesProject/search/${inputValue}`);
    setInputValue('');
    document.documentElement.style.zoom = '1';
  };

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className={styles.input}
        />
        <button type="submit" className={styles.searchButton}>
          <IoSearchSharp size={25} className={styles.icon} />
        </button>
      </form>
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        searchData && <MoviesLayout data={searchData} />
      )}
    </div>
  );
}
