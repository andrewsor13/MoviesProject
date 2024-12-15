import React, { useEffect, useState } from 'react';
import styles from './Reviews.module.css';
import { RxAvatar } from 'react-icons/rx';

export default function Reviews({ reviews }) {
  const [expandedIndices, setExpandedIndices] = useState([]);
  const [windowSize, setWindowSize] = useState(window.screen.width);

  const toggleExpand = index => {
    if (expandedIndices.includes(index)) {
      setExpandedIndices(expandedIndices.filter(item => item !== index));
    } else {
      setExpandedIndices([...expandedIndices, index]);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {reviews.results?.map((review, index) => {
          const isExpanded = expandedIndices.includes(index);
          const buttonText = isExpanded ? '...show less' : 'show more';
          const contentToShow = () => {
            if (!isExpanded) {
              if (windowSize < 1200) {
                return review.content.substring(0, 200) + '...';
              } else if (windowSize >= 1200) {
                return review.content.substring(0, 500) + '...';
              }
            }
            return review.content;
          };

          return (
            <li key={index} className={styles.listItem}>
              <div className={styles.reviewerContainer}>
                <div className={styles.reviewer}>
                  <RxAvatar size={windowSize < 1200 ? 40 : 60} />
                  <p className={styles.reviewerName}>{review.author}</p>
                </div>
              </div>
              <div
                className={`${styles.reviewContent} ${
                  isExpanded ? styles.showMore : styles.showLess
                }`}
              >
                <p
                  className={styles.reviewText}
                  dangerouslySetInnerHTML={{
                    __html: contentToShow(),
                  }}
                />
                {windowSize < 1200
                  ? review.content.length > 200 && (
                      <span
                        className={styles.showMoreButton}
                        onClick={() => toggleExpand(index)}
                      >
                        {buttonText}
                      </span>
                    )
                  : review.content.length > 500 && (
                      <span
                        className={styles.showMoreButton}
                        onClick={() => toggleExpand(index)}
                      >
                        {buttonText}
                      </span>
                    )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
