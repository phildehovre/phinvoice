// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBS-LMG7fs86NX76gUPGWFVijJVHxTzspg",
  authDomain: "phin-6b0ce.firebaseapp.com",
  projectId: "phin-6b0ce",
  storageBucket: "phin-6b0ce.appspot.com",
  messagingSenderId: "1084751255322",
  appId: "1:1084751255322:web:bc4cb9035617340c4f3ea3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default getFirestore(app)
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();