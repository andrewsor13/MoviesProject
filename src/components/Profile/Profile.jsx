import React, { useState } from 'react';
import styles from './Profile.module.css';
import { useAuth } from 'Store/AuthContext';
import {
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { LiaEdit } from 'react-icons/lia';
import Notiflix from 'notiflix';
import { FaCheckCircle } from 'react-icons/fa';

export default function Profile() {
  const { user } = useAuth();
  const [nickName, setNickName] = useState(user.displayName);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [nickNameCLick, setNickNameClick] = useState(false);
  const [passwordClick, setPasswordClick] = useState(false);
  const [check, setCheck] = useState({
    hasUpperCase: false,
    hasNumber: false,
    isLongEnough: false,
    hasSymbol: false,
  });

  const handleNickNameInput = e => {
    setNickName(e.target.value);
  };

  const handleOldPasswordInput = e => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordInput = e => {
    setNewPassword(e.target.value);
    setCheck({
      hasUpperCase: /[A-Z]/.test(e.target.value),
      hasNumber: /\d/.test(e.target.value),
      hasSymbol: /[!@#$%^&*]/.test(e.target.value),
      isLongEnough: e.target.value.length >= 8,
    });
  };

  const handleNickNameClick = () => {
    setPasswordClick(false);
    setNickNameClick(!nickNameCLick);
    setNickName(user.displayName);
  };

  const handlePasswordClick = () => {
    setNickNameClick(false);
    setPasswordClick(!passwordClick);
  };

  const handleNickNameChange = async e => {
    e.preventDefault();
    if (auth.currentUser && nickName.trim()) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: nickName.trim(),
        });
        Notiflix.Notify.success('Nickname updated!');
        setNickNameClick(false);
      } catch (error) {
        console.error('Eroare la setarea displayName:', error);
        Notiflix.Notify.failure('A apărut o eroare.');
      }
    } else {
      Notiflix.Notify.failure("The nickname can't be empty!");
    }
  };

  const handlePasswordChange = async e => {
    e.preventDefault();

    if (!oldPassword || !newPassword) {
      Notiflix.Notify.failure('You must complete both fields!');
      return;
    }

    if (
      !check.hasUpperCase ||
      !check.hasNumber ||
      !check.hasSymbol ||
      !check.isLongEnough
    ) {
      Notiflix.Notify.failure(
        'Password must respect the security requirements.'
      );
      return;
    }

    const user = auth.currentUser;

    if (user) {
      const credential = EmailAuthProvider.credential(user.email, oldPassword);

      try {
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        Notiflix.Notify.success('Password changed succesfully!');
        setOldPassword('');
        setNewPassword('');
        setPasswordClick(false);
        setCheck({
          hasUpperCase: false,
          hasNumber: false,
          isLongEnough: false,
          hasSymbol: false,
        });
      } catch (error) {
        console.error(error);
        Notiflix.Notify.failure('Old password inccorect or another error.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div className={styles.dataContainer}>
          <h3>Nickname:</h3>
          {!nickNameCLick ? (
            <p className={styles.text}>{user.displayName}</p>
          ) : (
            <form
              onSubmit={handleNickNameChange}
              className={
                nickNameCLick
                  ? `${styles.nicknameAnimation} ${styles.form} `
                  : `${styles.form}`
              }
            >
              <input
                className={styles.input}
                placeholder={user.displayName}
                onChange={handleNickNameInput}
                value={nickName}
                type="text"
              ></input>
              <button className={styles.saveButton} type="submit">
                Save
              </button>
            </form>
          )}
          <LiaEdit
            onClick={handleNickNameClick}
            className={
              !nickNameCLick
                ? `${styles.editButton}`
                : `${styles.editButton} ${styles.nicknameAnimation}`
            }
            size={20}
            color="#469ae8"
          />
        </div>
        <div className={styles.dataContainer}>
          <h3>Email:</h3>
          <p className={styles.text}>{user.email}</p>
        </div>
        <div className={styles.dataContainer}>
          <h3>Created at:</h3>
          <p className={styles.text}>
            {new Date(user.metadata.creationTime).toLocaleDateString('ro-RO')}
          </p>
        </div>
        <div className={styles.dataPassContainer}>
          <button
            className={styles.changePasswordButton}
            onClick={handlePasswordClick}
          >
            Change Password
          </button>
          <div className={styles.overflowContainer}>
            <div
              className={
                passwordClick
                  ? `${styles.passwordAnimation}`
                  : `${styles.passwordContainer}`
              }
            >
              {passwordClick ? (
                <form
                  onSubmit={handlePasswordChange}
                  className={styles.passwordForm}
                >
                  <label>Old password</label>
                  <input
                    className={styles.passInput}
                    type="password"
                    placeholder="********"
                    onChange={handleOldPasswordInput}
                    value={oldPassword}
                  />

                  <label>New password</label>
                  <input
                    className={styles.passInput}
                    type="password"
                    placeholder="********"
                    onChange={handleNewPasswordInput}
                    value={newPassword}
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

                  <button className={styles.saveButton} type="submit">
                    Save
                  </button>
                </form>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
