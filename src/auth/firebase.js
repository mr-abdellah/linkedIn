import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCMb-1yyKENwsv_2lnhjkbxadox0dmooIA",
  authDomain: "linkedin-a4c20.firebaseapp.com",
  projectId: "linkedin-a4c20",
  storageBucket: "linkedin-a4c20.appspot.com",
  messagingSenderId: "666055604355",
  appId: "1:666055604355:web:69fb19dcecff76370a03b6",
  measurementId: "G-270YLF48Q5",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();

export { db, auth };
