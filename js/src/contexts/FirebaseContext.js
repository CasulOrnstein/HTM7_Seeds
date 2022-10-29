import { initializeApp } from 'firebase/app';
import { createContext } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyBsHPkR60MfKx-O2Fx3qJIa3_uN6MEMn20",
  authDomain: "htm7-seeds.firebaseapp.com",
  projectId: "htm7-seeds",
  storageBucket: "htm7-seeds.appspot.com",
  messagingSenderId: "140868769509",
  appId: "1:140868769509:web:9773470e1eeff4a6cf660c"
};

export const FirebaseAppContext = createContext(null);

export const initializeFirebaseApp = () => initializeApp(firebaseConfig);