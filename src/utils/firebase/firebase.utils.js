// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"; // doc is a function that creates a document reference (instance of a document), getDoc is a function that gets a document, and setDoc is a function that sets a document.
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWJ2SpxGqsB0NG1NGmpSbAIyG0RIQqeNA", 
  authDomain: "swed-clothing.firebaseapp.com",
  projectId: "swed-clothing",
  storageBucket: "swed-clothing.appspot.com",
  messagingSenderId: "843408077163",
  appId: "1:843408077163:web:28a7d5094f5b6663a09c2e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig); // Initialize the Firebase app with the provided configuration.

const googleProvider = new GoogleAuthProvider(); // Google authentication provider. its a class that provides the implementation for Google authentication.

googleProvider.setCustomParameters({
    prompt: "select_account" // This parameter is used to force the Google authentication popup to show the "Select Account" page, which allows the user to choose which Google account to use for authentication.
});

export const auth = getAuth(); // Get the authentication instance from the Firebase app.
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider); // Create a function to sign in with Google using the popup.

export const db = getFirestore(); // Get the Firestore instance from the Firebase app.

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid); // Create a document reference for the user in the Firestore database. The 'users' is the collection name and userAuth.uid is the unique identifier for the user. so we can use this to get the user document using the unique identifier.
 

    const userSnapshot = await getDoc(userDocRef); // Get the user document from the Firestore database.
 

    if (!userSnapshot.exists()) { // If the user document does not exist, create it.
        const { displayName, email } = userAuth; // Get the display name and email from the user authentication.
        const createdAt = new Date(); // Get the current date and time.

        try {
            await setDoc(userDocRef, { // Set the user document in the Firestore database. The first argument is the document reference and the second argument is the data to be stored in the document.
                displayName,
                email,
                createdAt,
            });
        } catch (error) {
            console.log("error creating the user", error.message);
        }
    }

    return userDocRef; // Return the user document reference if the user document exists.
}
