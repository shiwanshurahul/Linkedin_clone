// import firebase from "firebase";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";




const firebaseConfig = {
  apiKey: "AIzaSyDQ-wCugJfZFKDHkKLUPFBuuTq-IRQvw78",
  authDomain: "linkedin-clone-75eef.firebaseapp.com",
  projectId: "linkedin-clone-75eef",
  storageBucket: "linkedin-clone-75eef.firebasestorage.app",
  messagingSenderId: "895817155291",
  appId: "1:895817155291:web:1022942eeabba4900382fe"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;


