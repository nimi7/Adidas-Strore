// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from '@firebase/firestore'
import { collection, getDocs, addDoc } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyByCuurXk0EQD57NpORPoZA1L0wCDRlfiE",
    authDomain: "fir-auth-27364.firebaseapp.com",
    projectId: "fir-auth-27364",
    storageBucket: "fir-auth-27364.appspot.com",
    messagingSenderId: "1055242345628",
    appId: "1:1055242345628:web:28fd552d0fb14fac6ee159"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);


