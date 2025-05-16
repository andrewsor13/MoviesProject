import React, { useState } from 'react';
import styles from './RegisterForm.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { useAuth } from 'Store/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const { register } = useAuth();
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState({
    hasUpperCase: false,
    hasNumber: false,
    isLongEnough: false,
    hasSymbol: false,
  });
  const navigate = useNavigate();

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = e => {
    const value = e.target.value;
    setPassword(value);

    setCheck({
      hasUpperCase: /[A-Z]/.test(value),
      hasNumber: /\d/.test(value),
      hasSymbol: /[!@#$%^&*]/.test(value),
      isLongEnough: value.length >= 8,
    });
  };

  const checkPassword = e => {
    e.preventDefault();
    const allTrue = Object.values(check).every(value => value === true);
    if (allTrue) {
      handleRegister();
    } else {
      console.log('Parola nu este puternica!');
    }
  };

  const handleRegister = async () => {
    try {
      const user = await register(email, password);
      console.log('User ID (UID):', user.uid);
      navigate(`/MoviesProject`);
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className={styles.formContainer}>
      <form onSubmit={checkPassword} className={styles.form}>
        <div className={styles.formItem}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={handleEmailChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formItem}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={handlePasswordChange}
            className={styles.input}
          />
          <div className={styles.passCheckBlock}>
            <p
              className={`${styles.passCheck} ${
                check.isLongEnough ? styles.valid : null
              }`}
            >
              <FaCheckCircle size={10} />
              Contains 8 characters,
            </p>
            <p
              className={`${styles.passCheck} ${
                check.hasUpperCase ? styles.valid : null
              }`}
            >
              <FaCheckCircle size={10} />
              Contains one uppercase character.
            </p>
            <p
              className={`${styles.passCheck} ${
                check.hasNumber ? styles.valid : null
              }`}
            >
              <FaCheckCircle size={10} />
              Contains one number character.
            </p>
            <p
              className={`${styles.passCheck} ${
                check.hasSymbol ? styles.valid : null
              }`}
            >
              <FaCheckCircle size={10} />
              Contains one special character.
            </p>
          </div>
        </div>
        <div className={styles.registerBlock}>
          <p className={styles.registerText}>Allready have an account?</p>
          <NavLink
            exact="true"
            to="/MoviesProject/signIn"
            className={styles.link}
          >
            <p className={styles.registerLink}>Sign in now.</p>
          </NavLink>
        </div>
        <button type="submit" className={styles.submitButton}>
          Sign Up
        </button>
      </form>
    </div>
  );
}
