// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import * as firebaseui from 'firebaseui';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCu7Sv_Cbk_lDJjuiMFsOnOhdk-VtazyhA",
  authDomain: "cr-talleres-alberth.firebaseapp.com",
  projectId: "cr-talleres-alberth",
  storageBucket: "cr-talleres-alberth.appspot.com",
  messagingSenderId: "956310308888",
  appId: "1:956310308888:web:a217460567f88d51459b6d",
  measurementId: "G-XC03J230TD"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const FirebaseAnalytics = getAnalytics(FirebaseApp);

export const FirebaseAuth = getAuth(FirebaseApp)
// Initialize the FirebaseUI Widget using Firebase.
export const FirebaseUI = new firebaseui.auth.AuthUI(FirebaseAuth);

FirebaseAuth.languageCode = "es"