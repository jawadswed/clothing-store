import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import Button from "../../button/button.component";
import { auth, signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect } from "../../../utils/firebase/firebase.utils";

import SignUpForm from "../../sign-up-form/sign-up-form.component";

const SignIn = () => {
    
        // useEffect(async () => { // useEffect is used to call the function once when the component is mounted. mounted means the component is rendered in the DOM.
        //     const result = await getRedirectResult(auth); // getRedirectResult is used to get the redirect result from the authentication.
        //     if (result) { // if the result is not null, then create the user document from authentication.
        //         const userDocRef = await createUserDocumentFromAuth(result.user); // Create user document from authentication.
        //     }
        // }, []);
    
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup(); // Sign in with Google popup.


        const userDocRef = await createUserDocumentFromAuth(user); // Create user document from authentication.
    }



    return <div className="sign-in-container">
        <h1>Sign In</h1>
        <Button onClick={logGoogleUser} buttonType="google">Sign in with Google</Button>
        {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
        <SignUpForm />
    </div>
}

export default SignIn;