// firebaseConfig.js
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDF8OJtm1e4hRZpvYcDKJQ6j0Tk9UGdzHA",
  authDomain: "among-connect.firebaseapp.com",
  projectId: "among-connect",
  storageBucket: "among-connect.firebasestorage.app",
  messagingSenderId: "1075468292365",
  appId: "1:1075468292365:web:e53c1e70016a7cdfa1e044"
};

// Inicializa o app
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore
const db = getFirestore(app);

// Exporta ambos
export { app, db };
