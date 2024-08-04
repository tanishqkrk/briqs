import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAxcqCZ3eaPrdmYfDOz5mOX_VBUBxBTDGA",
  authDomain: "briqs-ecfbc.firebaseapp.com",
  projectId: "briqs-ecfbc",
  storageBucket: "briqs-ecfbc.appspot.com",
  messagingSenderId: "380044104445",
  appId: "1:380044104445:web:3070e17e72f07691d4a494",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
