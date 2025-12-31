import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCL5WRKDpEruimTIazBXU3COdkEvqVMfyQ",
    authDomain: "hanogt-codev.firebaseapp.com",
    projectId: "hanogt-codev",
    storageBucket: "hanogt-codev.firebasestorage.app",
    messagingSenderId: "394996005984",
    appId: "1:394996005984:web:00cd09f1c00dce61a1d705",
    measurementId: "G-P6MRVZWEEB"
};

// Initialize Firebase only if not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { db };
