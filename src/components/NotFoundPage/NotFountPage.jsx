import React from 'react';
import notFoundImg from '../../Assets/browser-error-404-icon.svg';
import styles from './NotFoundPage.module.css';

import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/MoviesProject');
  };

  return (
    <div className={styles.not_found}>
      <img src={notFoundImg} alt="Not Found" />
      <p>Ruta nu exista 404.</p>
      <button onClick={handleRedirect}>Inapoi la pagina principala</button>
    </div>
  );
}
