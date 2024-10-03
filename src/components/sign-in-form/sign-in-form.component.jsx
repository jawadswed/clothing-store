import { useState, useContext } from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.styles.scss';
import { UserContext } from "../../context/user.context";

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
    const { setCurrentUser } = useContext(UserContext); // Destructuring the user context to get the setCurrentUser function.
    const resetFormFields = () => {
        setFormFields(defaultFormFields); // Resetting the formFields object to its initial value.
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
        setCurrentUser(user); // Set the current user in the user context.
    }

    const handleChange = (event) => {
        const { name, value } = event.target; // Destructuring the event.target object to get the name and value of the input field.
        setFormFields({ ...formFields, [name]: value }); // Updating the formFields object with the new value of the input field.
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default behavior of the form. 

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password); // Sign in with the provided email and password.
            setCurrentUser(user); // Set the current user in the user context.
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
        <div className="sign-in-container">
            <h2>I already have an account</h2>
            <span className="title">Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" onClick={signInWithGoogle} buttonType="google">Google Sign In</Button>
                    {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
                </div>
            </form>
        </div>
    )
}

export default SignInForm;