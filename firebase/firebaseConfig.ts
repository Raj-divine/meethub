import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAM10eHse_BRTR8DX1TbB02-mser2cMrpI",
  authDomain: "meethub-995d3.firebaseapp.com",
  projectId: "meethub-995d3",
  storageBucket: "meethub-995d3.appspot.com",
  messagingSenderId: "364939055100",
  appId: "1:364939055100:web:8abb319492863856526c79",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
