import React from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase/compat/app';
import { AuthContainer } from './Login';
import { getAnalytics } from 'firebase/analytics';
import { firebaseConfig } from './FirebaseConfig';
import * as firebaseui from 'firebaseui';


// Initialize Firebase
const FirebaseApp = firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FirebaseAnalytics = getAnalytics(FirebaseApp);

// Initialize the FirebaseUI Widget using Firebase.
export const FirebaseUI = new firebaseui.auth.AuthUI(firebase.auth());

function App() {
  
  return (
    <AuthContainer>

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </AuthContainer>
  );
}

export default App;
