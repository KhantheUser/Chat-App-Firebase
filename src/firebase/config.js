// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {connectAuthEmulator, getAuth} from "firebase/auth"
import {connectFirestoreEmulator, getFirestore} from 'firebase/firestore'
import { getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDABtSyuPb4Hl0Rl0fMWLUDVI1Rps7hrLE",
  authDomain: "chat-app2-5663b.firebaseapp.com",
  projectId: "chat-app2-5663b",
  storageBucket: "chat-app2-5663b.appspot.com",
  messagingSenderId: "833465024288",
  appId: "1:833465024288:web:04d64ceb2673d44f022145",
  measurementId: "G-W7BCPQ8YJC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth()

//  connectAuthEmulator(auth, "http://127.0.0.1:4001");
const db = getFirestore()
// if(window.location.hostname ==='localhost'){
//   connectFirestoreEmulator(db, '127.0.0.1', 4002);
// }
const storage = getStorage()
export {auth,db,storage}
