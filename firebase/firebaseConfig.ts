import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAM10eHse_BRTR8DX1TbB02-mser2cMrpI",
  authDomain: "meethub-995d3.firebaseapp.com",
  projectId: "meethub-995d3",
  storageBucket: "meethub-995d3.appspot.com",
  messagingSenderId: "364939055100",
  appId: "1:364939055100:web:ba61c2e0fd4d7b55526c79",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
