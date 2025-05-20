import { createContext, useContext, useEffect, useState } from 'react';
import {
  setPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { auth, db } from 'firebaseConfig';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, async currentUser => {
          setUser(currentUser);

          if (currentUser) {
            await fetchFavorites(currentUser.uid);
          } else {
            setFavorites([]);
          }

          setLoading(false);
        });

        return () => unsubscribe();
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const fetchFavorites = async uid => {
    try {
      const favoritesRef = collection(db, 'users', uid, 'favorites');
      const snapshot = await getDocs(favoritesRef);

      const movies = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFavorites(movies);
    } catch (error) {
      console.error(error);
    }
  };

  const addFavorite = async movieId => {
    if (!user) return;
    try {
      const movieIdStr = movieId.toString();
      const favoriteRef = doc(db, 'users', user.uid, 'favorites', movieIdStr);
      await setDoc(favoriteRef, {
        movie_id: movieId,
      });
      await fetchFavorites(user.uid);
    } catch (error) {
      console.error('Eroare la adăugarea în favorite:', error);
    }
  };

  const deleteFavorite = async movieId => {
    if (!user) return;
    try {
      const movieIdStr = movieId.toString();
      const favoriteRef = doc(db, 'users', user.uid, 'favorites', movieIdStr);
      await deleteDoc(favoriteRef);
      await fetchFavorites(user.uid);
    } catch (error) {
      console.error('Eroare la ștergerea favoritei:', error);
    }
  };

  const register = async (email, password) => {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredentials;
  };

  const login = async (email, password) => {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredentials;
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        favorites,
        fetchFavorites,
        addFavorite,
        deleteFavorite,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
