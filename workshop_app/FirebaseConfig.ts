// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCu7Sv_Cbk_lDJjuiMFsOnOhdk-VtazyhA",
  authDomain: "cr-talleres-alberth.firebaseapp.com",
  projectId: "cr-talleres-alberth",
  storageBucket: "cr-talleres-alberth.appspot.com",
  messagingSenderId: "956310308888",
  appId: "1:956310308888:web:a217460567f88d51459b6d",
  measurementId: "G-XC03J230TD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);