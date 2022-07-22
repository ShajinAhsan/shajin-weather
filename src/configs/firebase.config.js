import { initializeApp } from "firebase/app";

// Firebase configuration for my project
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // API key
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, // Auth domain
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID, // Project ID
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET, // Storage bucket
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, // Sender ID
  appId: import.meta.env.VITE_FIREBASE_APP_ID, // App ID
};
console.log(import.meta.env.VITE_FIREBASE_API_KEY);
// Initialize Firebase
export const initializeFirebase = () => initializeApp(config); // Initialize Firebase
