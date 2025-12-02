import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "FIREBASE_API_KEY_REMOVED",
    authDomain: "fofrmetro.firebaseapp.com",
    projectId: "fofrmetro",
    storageBucket: "fofrmetro.firebasestorage.app",
    messagingSenderId: "FIREBASE_SENDER_ID_REMOVED",
    appId: "1:FIREBASE_SENDER_ID_REMOVED:web:6c035e3e592683f1b29efb"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
