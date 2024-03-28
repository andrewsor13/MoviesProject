import React from 'react';
import styles from './Reviews.module.css';
import { RxAvatar } from 'react-icons/rx';

export default function Reviews({ reviews }) {
  return (
    <div>
      {/* <p className={styles.reviewsHead}>
        Reviews <span>({reviews?.length})</span>
      </p> */}
      <ul className={styles.list}>
        {reviews?.map((review, index) => {
          return (
            <li key={index} className={styles.listItem}>
              <div className={styles.reviewerContainer}>
                <div className={styles.reviewer}>
                  <RxAvatar size={60} />
                  <p>{review.author}</p>
                </div>
              </div>
              <div className={styles.reviewContent}>
                <p className={styles.content}>{review.content}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
