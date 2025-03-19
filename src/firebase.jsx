
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCrMcT1Ihq_4XJWOWi2baX_QTiI0L2iP3Q",
  authDomain: "login-8cd60.firebaseapp.com",
  projectId: "login-8cd60",
  storageBucket: "login-8cd60.firebasestorage.app",
  messagingSenderId: "415996504760",
  appId: "1:415996504760:web:f0e9e155bd122db1a0224d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore()
export {app, auth , db}