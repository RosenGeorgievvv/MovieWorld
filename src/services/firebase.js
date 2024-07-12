import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import { getApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbXjQAdhaHnt65rI8SX6kyVyuNm66lfwE",
  authDomain: "movieland-b9019.firebaseapp.com",
  projectId: "movieland-b9019",
  storageBucket: "movieland-b9019.appspot.com",
  messagingSenderId: "1051264093156",
  appId: "1:1051264093156:web:79f9beabc30f4aa25955f1" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app); 

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Get a non-default Storage bucket
export const firebaseApp = getApp();
export const storage = getStorage(firebaseApp, "gs://movieland-b9019.appspot.com");  
