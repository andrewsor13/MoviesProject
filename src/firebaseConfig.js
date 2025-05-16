import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCLDSv_bu9K3y1Ak3XoHArwkA98Raov3os',
  authDomain: 'moviedb-6dfc6.firebaseapp.com',
  projectId: 'moviedb-6dfc6',
  storageBucket: 'moviedb-6dfc6.firebasestorage.app',
  messagingSenderId: '80585124414',
  appId: '1:80585124414:web:b24c1a0ffee6e605e9ff6f',
  measurementId: 'G-L53W23NQCM',
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
