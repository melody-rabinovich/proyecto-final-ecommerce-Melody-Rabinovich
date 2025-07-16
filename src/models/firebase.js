// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4trtJQjOLXoeqI0XW765vDSgi0e5um-w",
  authDomain: "api-talento-tech-7bc8f.firebaseapp.com",
  projectId: "api-talento-tech-7bc8f",
  storageBucket: "api-talento-tech-7bc8f.firebasestorage.app",
  messagingSenderId: "105241477830",
  appId: "1:105241477830:web:1b5dbd37ebec7dc1634dc7",
  measurementId: "G-CHMHLNV8WN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
export default db