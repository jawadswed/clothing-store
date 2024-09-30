import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields); // useState is used to create a state variable and a function to update it.

    const { displayName, email, password, confirmPassword } = formFields; // Destructuring the formFields object to get the values of the form fields.

    const resetFormFields = () => {
        setFormFields(defaultFormFields); // Resetting the formFields object to its initial value.
    }

    const handleChange = (event) => {
        const { name, value } = event.target; // Destructuring the event.target object to get the name and value of the input field.
        setFormFields({ ...formFields, [name]: value }); // Updating the formFields object with the new value of the input field.
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default behavior of the form. 

        if (password !== confirmPassword) { // If the password and confirm password do not match, return.
            alert("Passwords do not match"); // Show an alert to the user.
            return; // Return to stop the function.
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password); // Create a user with the provided email and password.
            
            await createUserDocumentFromAuth(user, { displayName }); // Create a user document from authentication.
            resetFormFields(); // Reset the form fields.
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') { // If the email is already in use, show an alert to the user.
                alert("Cannot create user, email already in use"); // Show an alert to the user.
            } else {
                console.log(error.message); // Log the error message to the console.
            }
        }
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span className="title">Sign Up Form with Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName} />
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
                <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;