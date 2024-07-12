import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "orange-estate-b28e1.firebaseapp.com",
  projectId: "orange-estate-b28e1",
  storageBucket: "orange-estate-b28e1.appspot.com",
  messagingSenderId: "910823899431",
  appId: "1:910823899431:web:985d5e412f4c349ab32902"
};

export const app = initializeApp(firebaseConfig);
