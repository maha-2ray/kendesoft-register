// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9W3vpPCiX1jm2OnqS_hZG0oepT8CG65o",
  authDomain: "kendesoft-register.firebaseapp.com",
  databaseURL: "https://kendesoft-register-default-rtdb.firebaseio.com",
  projectId: "kendesoft-register",
  storageBucket: "kendesoft-register.firebasestorage.app",
  messagingSenderId: "441042845095",
  appId: "1:441042845095:web:47f5e8045dc24a3cd44a82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);