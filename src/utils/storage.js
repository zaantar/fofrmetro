import { doc, onSnapshot, setDoc, getDoc } from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";
import { db, auth } from "../firebase";
import initialData from '../data/initialData.json';

const DOC_REF = doc(db, "app", "data");

// Ensure user is signed in before interacting with Firestore
const ensureAuth = async () => {
    console.log("ensureAuth: checking user", auth.currentUser);
    if (!auth.currentUser) {
        console.log("ensureAuth: signing in anonymously...");
        try {
            await signInAnonymously(auth);
            console.log("ensureAuth: signed in", auth.currentUser.uid);
        } catch (e) {
            console.error("ensureAuth: sign in failed", e);
            throw e;
        }
    }
};

export const subscribeToData = async (callback) => {
    console.log("subscribeToData: starting...");
    await ensureAuth();
    console.log("subscribeToData: auth ensured, setting up snapshot listener");
    return onSnapshot(DOC_REF, (docSnap) => {
        console.log("subscribeToData: snapshot received", docSnap.exists());
        if (docSnap.exists()) {
            callback(docSnap.data());
        } else {
            // If document doesn't exist, initialize it
            console.log("subscribeToData: doc missing, initializing...");
            initializeData().then(() => {
                callback(initialData);
            });
        }
    }, (error) => {
        console.error("Error subscribing to data:", error);
    });
};

export const saveData = async (data) => {
    console.log("saveData: starting save...");
    await ensureAuth();
    try {
        console.log("saveData: calling setDoc...");
        await setDoc(DOC_REF, data);
        console.log("saveData: setDoc success");
    } catch (e) {
        console.error('Failed to save data', e);
        throw e;
    }
};

export const initializeData = async () => {
    await ensureAuth();
    const docSnap = await getDoc(DOC_REF);
    if (!docSnap.exists()) {
        await setDoc(DOC_REF, initialData);
    }
};

// Deprecated but kept for compatibility if needed, though we should switch to async
export const getStoredData = () => {
    console.warn("getStoredData is deprecated, use subscribeToData");
    return initialData;
};
