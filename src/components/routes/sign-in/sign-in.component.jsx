import { signInWithGooglePopup } from "../../../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "../../../utils/firebase/firebase.utils";
const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup(); // Sign in with Google popup.
        

        const userDocRef = await createUserDocumentFromAuth(user); // Create user document from authentication.
    }

  return <div className="sign-in-container">
    <h1>Sign In</h1>
    <button onClick={logGoogleUser}>Sign in with Google</button>
  </div>
}

export default SignIn;