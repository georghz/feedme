import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsuyz_p0rDBV8Wb5BaL_VmPIPZW_CNkCM",
  authDomain: "test-72317.firebaseapp.com",
  projectId: "test-72317",
  storageBucket: "test-72317.appspot.com",
  messagingSenderId: "55554050503",
  appId: "1:55554050503:web:c4ccddd784d50a9393b1e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();