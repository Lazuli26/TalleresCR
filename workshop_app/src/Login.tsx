import { EmailAuthProvider, GoogleAuthProvider, User } from 'firebase/auth';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import React, { useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import { FirebaseAuth, FirebaseUI } from './FirebaseConfig';
// import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AUTH_WIDGET_CONTAINER_ID = "firebaseui-auth-container";

type userInfo = { user: User, accessToken: string } | null
export const UserSessionProvider = React.createContext<{ session: userInfo, signOut: () => void, renderLogin: () =>void } | null>(null)

export const AuthContainer: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {

    const uiConfig = useRef<firebaseui.auth.Config>({
        signInSuccessUrl: window.location.origin,
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            GoogleAuthProvider.PROVIDER_ID,
            // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            // firebase.auth.GithubAuthProvider.PROVIDER_ID,
            EmailAuthProvider.PROVIDER_ID,
            // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            // firebase.auth.AnonymousAuthProvider.PROVIDER_ID
        ],
        signInFlow: "popup",
        autoUpgradeAnonymousUsers: true,

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


    const [userSession, setUserSession] = useState<userInfo | undefined>()


    const tryRenderLoginWidget = useCallback(
        () => {
            // The start method will wait until the DOM is loaded.
            if (userSession == null && document.getElementById(AUTH_WIDGET_CONTAINER_ID))
                FirebaseUI.start(`#${AUTH_WIDGET_CONTAINER_ID}`, uiConfig.current);
        },
        [userSession],
    )

    React.useEffect(() => {
        const unSubscribe = FirebaseAuth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                user.getIdToken().then(function (accessToken) {
                    var userSession = {
                        user,
                        accessToken
                    }
                    setUserSession(userSession)
                });
            } else {
                // User is signed out.
                setUserSession(null)
            }
        });

        return unSubscribe
    }, []);

    useEffect(() => {
        console.log(userSession)
        tryRenderLoginWidget()
    }, [tryRenderLoginWidget, userSession]);


    const signOut = useRef(() => FirebaseAuth.signOut().then(() => {
        window.location.replace(window.location.origin);
    })).current;

    if (userSession === undefined) return <></>

    return <>
        <UserSessionProvider.Provider value={{ session: userSession, signOut, renderLogin: tryRenderLoginWidget }}>
            {children}
            {
                // userSession && <Button onClick={signOut} style={{ position: "fixed", top: 0, right: 0 }} variant="contained" color="primary" children="Sign Out" />
            }
        </UserSessionProvider.Provider>
    </>
}