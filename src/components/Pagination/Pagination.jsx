import React from 'react';
import styles from './Pagination.module.css';
import { useNavigate } from 'react-router-dom';
import { useSearchData } from 'Store/SearchData';

export default function Pagination({ totalPages }) {
  const { pageNumber, setPageNumber, query } = useSearchData();
  const navigate = useNavigate();

  const handlePageClick = newPageNumber => {
    setPageNumber(newPageNumber);
    navigate(`/MoviesProject/search/${query}/${newPageNumber}`);
  };

  const pagination = () => {
    const pages = [];
    if (pageNumber > 3) {
      pages.push(
        <li
          key={`page-${pageNumber - 1}`}
          className={styles.pageButton}
          onClick={() => handlePageClick(pageNumber - 1)}
        >
          {pageNumber - 1}
        </li>
      );
      pages.push(
        <li
          key={`page-${pageNumber}`}
          className={`${styles.pageButton} ${styles.active}`}
        >
          {pageNumber}
        </li>
      );
      if (pageNumber !== totalPages) {
        pages.push(
          <li
            key={`page-${pageNumber + 1}`}
            className={styles.pageButton}
            onClick={() => handlePageClick(pageNumber + 1)}
          >
            {pageNumber + 1}
          </li>
        );
        if (pageNumber <= totalPages - 2) {
          pages.push(
            <span key={`dots-after-${pageNumber}`} className={styles.dots}>
              ...
            </span>
          );
          pages.push(
            <li
              key={`page-${totalPages}`}
              className={styles.pageButton}
              onClick={() => handlePageClick(totalPages)}
            >
              {totalPages}
            </li>
          );
        }
      } else {
        pages.unshift(
          <li
            key={`page-${pageNumber - 2}`}
            className={styles.pageButton}
            onClick={() => handlePageClick(pageNumber - 2)}
          >
            {pageNumber - 2}
          </li>
        );
      }

      pages.unshift(
        <span key={`dots-before-${pageNumber}`} className={styles.dots}>
          ...
        </span>
      );
      pages.unshift(
        <li
          key={`page-1`}
          className={styles.pageButton}
          onClick={() => handlePageClick(1)}
        >
          {1}
        </li>
      );
    } else {
      for (let i = 1; i <= 3 && i <= totalPages; i++) {
        pages.push(
          <li
            key={`page-${i}`}
            className={`${styles.pageButton} ${
              pageNumber === i ? styles.active : ''
            }`}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </li>
        );
      }
    }
    return pages;
  };

  return (
    <ul className={styles.buttonsList}>
      {pageNumber > 1 && (
        <li
          key="previous"
          className={styles.pageButton}
          onClick={() => handlePageClick(pageNumber - 1)}
        >
          Previous
        </li>
      )}
      {pagination()}
      {pageNumber < totalPages && (
        <li
          key="next"
          className={styles.pageButton}
          onClick={() => handlePageClick(pageNumber + 1)}
        >
          Next
        </li>
      )}
    </ul>
  );
}
