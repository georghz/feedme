/**
 * DB and backend config
 */

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhDmubaeHJ9BdcIL0qdWXcg_9ax14KZAY",
  authDomain: "pu-gruppe-38.firebaseapp.com",
  projectId: "pu-gruppe-38",
  storageBucket: "pu-gruppe-38.appspot.com",
  messagingSenderId: "759990388569",
  appId: "1:759990388569:web:39ab7c08816dbc64c22e48",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
