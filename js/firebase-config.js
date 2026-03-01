import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAVB0-j6cQGsf_IQX1iren8xwqtv4YaG-g",
  authDomain: "mi-foro-portafolio.firebaseapp.com",
  projectId: "mi-foro-portafolio",
  storageBucket: "mi-foro-portafolio.firebasestorage.app",
  messagingSenderId: "988761302845",
  appId: "1:988761302845:web:5dc36156b5a98773584754"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
