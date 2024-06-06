// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEyCqWPw6mmNlvH56FjWQ9CoqEjJpmHt8",
  authDomain: "vite-contact-26efa.firebaseapp.com",
  projectId: "vite-contact-26efa",
  storageBucket: "vite-contact-26efa.appspot.com",
  messagingSenderId: "905327432929",
  appId: "1:905327432929:web:bbb5de9d384f35c3cf13a0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);