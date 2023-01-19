import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import React, { useRef } from 'react';
import { useState } from 'react';
import { FirebaseUI } from './App';
// import { getAuth, onAuthStateChanged } from "firebase/auth";




export const AuthContainer: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const uiConfig = useRef<firebaseui.auth.Config>({
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
        signInFlow: "popup"

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


    const [userSession, setUserSession] = useState<{user: firebase.User, accessToken: string} | null>(null)


    console.log(userSession)
    React.useEffect(() => {
        const unSubscribe = firebase.auth().onAuthStateChanged((user) => {
            console.log(user)
            if (user) {
                // User is signed in.
                user.getIdToken().then(function (accessToken) {
                    var userSession = {
                        user,
                        accessToken
                    }

                    setUserSession(userSession)

                    document.getElementById('sign-in-status')!.textContent = 'Signed in';
                    document.getElementById('sign-in')!.textContent = 'Sign out';
                    document.getElementById('account-details')!.textContent = JSON.stringify(userSession, null, '  ');
                });
            } else {
                // User is signed out.
                document.getElementById('sign-in-status')!.textContent = 'Signed out';
                document.getElementById('sign-in')!.textContent = 'Sign in';
                document.getElementById('account-details')!.textContent = 'null';
            }
        });
        // The start method will wait until the DOM is loaded.
        FirebaseUI.start('#firebaseui-auth-container', uiConfig.current);

        return unSubscribe
    }, []);

    return <>
        <h1>Welcome to My Awesome App</h1>
        <div id="sign-in-status"></div>
        <div id="sign-in"></div>
        <pre id="account-details"></pre>

        <div id="firebaseui-auth-container" />
        {children}
    </>
}