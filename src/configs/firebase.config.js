import { initializeApp } from "firebase/app";

// Firebase configuration for my project
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY, // API key
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN, // Auth domain
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID, // Project ID
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET, // Storage bucket
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID, // Sender ID
  appId: process.env.REACT_APP_FIREBASE_APP_ID, // App ID
};

// Initialize Firebase
export const initializeFirebase = () => initializeApp(config); // Initialize Firebase
