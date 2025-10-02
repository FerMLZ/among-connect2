import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDF8OJtme4hRZpVcDKJ6j0Tk9UGdzHA",
  authDomain: "among-connect.firebaseapp.com",
  projectId: "among-connect",
  storageBucket: "among-connect.appspot.com",
  messagingSenderId: "1075468292365",
  appId: "1:1075468292365:web:e53c1e70816a7cdfa1e044"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
