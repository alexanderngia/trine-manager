import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYpfGPRmWy1eJ-8_Ot9o3F3bsXcvWNRoo",
  authDomain: "upload-image-trine.firebaseapp.com",
  projectId: "upload-image-trine",
  storageBucket: "upload-image-trine.appspot.com",
  messagingSenderId: "931253803205",
  appId: "1:931253803205:web:f28c2991fc20f1aec038ac",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const Storage = getStorage(app);
