import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, orderBy, query } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";

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
const storage = getStorage(firebaseApp);

// get all posts function

  const getPosts = async (setPosts) => {
    await getDocs(
      query(collection(db, "posts"), orderBy("createdAt", "desc"))
    ).then((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
};

// upload image

const upload = async (file, email) => {
  const fileRef = await ref(storage, `${email}.png`);

  const snapshot = await uploadBytes(fileRef, file);

  alert("Uploaded file");
};

export { db, auth, storage, upload, getPosts };
