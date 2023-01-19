import { getAnalytics } from 'firebase/analytics';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import React, { useEffect, useRef } from 'react';
import { firebaseConfig } from './FirebaseConfig';

// Initialize Firebase
const FirebaseApp = firebase.initializeApp(firebaseConfig);
const FirebaseAnalytics = getAnalytics(FirebaseApp);


// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());

export const AuthContainer: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const uiConfig = useRef({
        signInSuccessUrl: '<url-to-redirect-to-on-success>',
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            // firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
        ],
        // tosUrl and privacyPolicyUrl accept either url string or a callback
        // function.

        // Terms of service url/callback.
        //tosUrl: '<your-tos-url>',

        // Privacy policy url/callback.
        /*privacyPolicyUrl: function () {
            window.location.assign('<your-privacy-policy-url>');
        }
        */
    });

    // The start method will wait until the DOM is loaded.
        debugger
    if (ui.isPendingRedirect()) {
        ui.start('#firebaseui-auth-container', uiConfig.current);
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var uid = user.uid;
                var phoneNumber = user.phoneNumber;
                var providerData = user.providerData;
                user.getIdToken().then(function (accessToken) {
                    document.getElementById('sign-in-status')!.textContent = 'Signed in';
                    document.getElementById('sign-in')!.textContent = 'Sign out';
                    document.getElementById('account-details')!.textContent = JSON.stringify({
                        displayName: displayName,
                        email: email,
                        emailVerified: emailVerified,
                        phoneNumber: phoneNumber,
                        photoURL: photoURL,
                        uid: uid,
                        accessToken: accessToken,
                        providerData: providerData
                    }, null, '  ');
                });
            } else {
                // User is signed out.
                document.getElementById('sign-in-status')!.textContent = 'Signed out';
                document.getElementById('sign-in')!.textContent = 'Sign in';
                document.getElementById('account-details')!.textContent = 'null';
            }
        })
    }, [])

    return <>
        <h1>Welcome to My Awesome App</h1>
        <div id="sign-in-status"></div>
        <div id="sign-in"></div>
        <pre id="account-details"></pre>

        <div id="firebaseui-auth-container" />
        {children}
    </>
}