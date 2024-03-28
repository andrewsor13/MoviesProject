import React from 'react';
import styles from './Credits.module.css';
import { RxAvatar } from 'react-icons/rx';

export default function Credits({ credits }) {
  return (
    <ul className={styles.list}>
      {credits?.map((credit, index) => {
        return (
          <li key={index} className={styles.listItem}>
            {credit.profile_path ? (
              <div className={styles.imageContainer}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${credit.profile_path}`}
                  alt={credit.name}
                  className={styles.image}
                />
              </div>
            ) : (
              <div className={styles.avatar}>
                <RxAvatar size={150} />
              </div>
            )}

            <div className={styles.reviewer}>
              <p className={styles.reviewerName}>
                <strong>{credit.name}</strong>
              </p>
              <p className={styles.reviewerCharacter}>{credit.character}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
