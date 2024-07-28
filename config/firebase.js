// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore, collection } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYoyIcT4ewDpmw6abfV85NP9oIsfekuzE",
  authDomain: "expense-tracker-a836e.firebaseapp.com",
  projectId: "expense-tracker-a836e",
  storageBucket: "expense-tracker-a836e.appspot.com",
  messagingSenderId: "40372121276",
  appId: "1:40372121276:web:cbc45dfe0483e083116ab9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// export const auth = getAuth(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const tripsRef = collection(db, 'trips');
export const expensesRef = collection(db, 'expenses');

export default app