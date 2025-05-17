// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACSczuTo9EMl4Hc2Wf94iDcYQSZMRePeo",
  authDomain: "myfirstapp-aa777.firebaseapp.com",
  projectId: "myfirstapp-aa777",
  storageBucket: "myfirstapp-aa777.firebasestorage.app",
  messagingSenderId: "437488844774",
  appId: "1:437488844774:web:5ce9e2776f0d1870246027"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);

const auth = getAuth(app);

export {fireDB,auth} 