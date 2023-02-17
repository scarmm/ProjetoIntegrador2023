// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDq6ZwYapsTt1W0uTvjoP4xfKiHOvEJjcU",
  authDomain: "projetointegrador-86511.firebaseapp.com",
  projectId: "projetointegrador-86511",
  storageBucket: "projetointegrador-86511.appspot.com",
  messagingSenderId: "1044066829766",
  appId: "1:1044066829766:web:eb8ad883bab6a34f569ec7",
  measurementId: "G-8MTV8SPGLH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);