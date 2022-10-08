import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCmp_34xPS6m6Jc6mVDh2JR4-tv-q_VeTI",
  authDomain: "linkedin-28e3e.firebaseapp.com",
  projectId: "linkedin-28e3e",
  storageBucket: "linkedin-28e3e.appspot.com",
  messagingSenderId: "31825391595",
  appId: "1:31825391595:web:7919c0e88969601e82f3ae"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();

export { db, auth };
