import { doc, onSnapshot, setDoc, getDoc } from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";
import { db, auth } from "../firebase";
import initialData from '../data/initialData.json';

const DOC_REF = doc(db, "app", "data");

// Ensure user is signed in before interacting with Firestore
const ensureAuth = async () => {
    if (!auth.currentUser) {
        await signInAnonymously(auth);
    }
};

export const subscribeToData = async (callback) => {
    await ensureAuth();
    return onSnapshot(DOC_REF, (docSnap) => {
        if (docSnap.exists()) {
            callback(docSnap.data());
        } else {
            // If document doesn't exist, initialize it
            initializeData().then(() => {
                callback(initialData);
            });
        }
    }, (error) => {
        console.error("Error subscribing to data:", error);
    });
};

export const saveData = async (data) => {
    await ensureAuth();
    try {
        await setDoc(DOC_REF, data);
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
