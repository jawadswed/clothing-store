// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth, signInWithRedirect,
    GoogleAuthProvider, signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, onSnapshot, getDocs } from "firebase/firestore"; // doc is a function that creates a document reference (instance of a document), getDoc is a function that gets a document, and setDoc is a function that sets a document.


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
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider); // Create a function to sign in with Google using the redirect.
export const db = getFirestore(); // Get the Firestore instance from the Firebase app.


// HELPER FUNCTIONS.
// This function adds a collection and documents to the Firestore database.
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    // Create a collection reference for the collection key.
    const collectionRef = collection(db, collectionKey);
    // Create a batch to write the documents to the Firestore database. batch instance is used to write multiple documents to the Firestore database in a single operation.
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        // Create a document reference for the object. docRef is an instance of a document reference. doc is a function that creates a document reference.
        const docRef = doc(collectionRef, object.title.toLowerCase());
        // Add the document to the batch.
        batch.set(docRef, object);
    });

    // Commit the batch to the Firestore database.
    await batch.commit();
    console.log("done");
}


// This function gets the categories and documents from the Firestore database.
export const getCategoriesAndDocuments = async () => {
   
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});
    return categoryMap;
}


// export const getCategoriesMapFromFirestore = async () => {
//     const collectionRef = collection(db, 'categories');
//     const q = query(collectionRef);
//     const data = await getDocs(q);
//     return data.docs.map((doc) => doc.data());
// }


// // This function gets the categories and documents from the Firestore database.
// export const getCategoriesAndDocuments = async () => {
//     // Create a collection reference for the categories.
//     const collectionRef = collection(db, 'categories');
//     // Create a query for the collection.
//     const q = query(collectionRef);
//     // Get the data from the Firestore database. The onSnapshot function is used to listen for changes in the Firestore database. The callback function is called with the snapshot of the data as the argument.
//     const data = onSnapshot(q, (snapshot) => {
//         console.log(snapshot);
//     });
//     return data;
// }

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

    if (!userAuth) return; // If the user authentication is not provided, return.
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
                ...additionalInformation // Spread the additional information to add it to the user document. we do this because in the display name will not be in the userAuth object in the sign-up form.
            });
        } catch (error) {
            console.log("error creating the user", error.message);
        }
    }

    return userDocRef; // Return the user document reference if the user document exists.
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return; // If the email or password is not provided, return.

    return await createUserWithEmailAndPassword(auth, email, password); // Create a user with the provided email and password.
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return; // If the email or password is not provided, return.

    return await signInWithEmailAndPassword(auth, email, password); // Sign in with the provided email and password.
}

export const signOutUser = async () => await signOut(auth); // Sign out the user from the authentication.

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback); // Listen for changes in the authentication state. The callback function is called with the user authentication object as the argument.
