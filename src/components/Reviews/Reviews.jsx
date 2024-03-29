import React, { useState } from 'react';
import styles from './Reviews.module.css';
import { RxAvatar } from 'react-icons/rx';

export default function Reviews({ reviews }) {
  const [expandedIndices, setExpandedIndices] = useState([]);

  const toggleExpand = index => {
    if (expandedIndices.includes(index)) {
      setExpandedIndices(expandedIndices.filter(item => item !== index));
    } else {
      setExpandedIndices([...expandedIndices, index]);
    }
  };

  return (
    <div>
      <ul className={styles.list}>
        {reviews?.map((review, index) => {
          const isExpanded = expandedIndices.includes(index);
          const contentToShow = isExpanded
            ? review.content
            : review.content.substring(0, 200) + '...';
          const buttonText = isExpanded ? '...show less' : 'show more';

          return (
            <li key={index} className={styles.listItem}>
              <div className={styles.reviewerContainer}>
                <div className={styles.reviewer}>
                  <RxAvatar size={60} />
                  <p>{review.author}</p>
                </div>
              </div>
              <div className={styles.reviewContent}>
                <p>
                  {contentToShow}{' '}
                  {review.content.length > 200 && (
                    <span
                      className={styles.showMore}
                      onClick={() => toggleExpand(index)}
                    >
                      {buttonText}
                    </span>
                  )}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// {review.content.length > 200 ? (
//   <div>
//     {!showMore ? (
//       <p>
//         {review.content.substring(0, 200)}...
//         <span
//           className={styles.showMore}
//           onClick={handleShowMore}
//         >
//           show more
//         </span>
//       </p>
//     ) : (
//       <p>{review.content}</p>
//     )}
//     {showMore && (
//       <p>
//         {review.content}
//         <span
//           className={styles.showMore}
//           onClick={handleShowMore}
//         >
//           show less
//         </span>
//       </p>
//     )}
//   </div>
// ) : (
//   <p className={styles.content}>{review.content}</p>
// )}
