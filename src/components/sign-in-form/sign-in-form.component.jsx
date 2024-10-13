import { useState } from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

// method to sign in with google redirect
// useEffect(async () => { // useEffect is used to call the function once when the component is mounted. mounted means the component is rendered in the DOM.
//     const result = await getRedirectResult(auth); // getRedirectResult is used to get the redirect result from the authentication.
//     if (result) { // if the result is not null, then create the user document from authentication.
//         const userDocRef = await createUserDocumentFromAuth(result.user); // Create user document from authentication.
//     }
// }, []);

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields); // useState is used to create a state variable and a function to update it.

    const { email, password, } = formFields; // Destructuring the formFields object to get the values of the form fields.
    const resetFormFields = () => {
        setFormFields(defaultFormFields); // Resetting the formFields object to its initial value.
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup(); // Sign in with Google popup.
    }

    const handleChange = (event) => {
        const { name, value } = event.target; // Destructuring the event.target object to get the name and value of the input field.
        setFormFields({ ...formFields, [name]: value }); // Updating the formFields object with the new value of the input field.
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default behavior of the form. 

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password); // Sign in with the provided email and password.
            resetFormFields(); // Reset the form fields.
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break;
            }
        }
    }

    return (
        <SignInContainer>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>Google Sign In</Button>
                    {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;