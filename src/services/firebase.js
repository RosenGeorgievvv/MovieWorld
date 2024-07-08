// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const auth = getAuth(app);