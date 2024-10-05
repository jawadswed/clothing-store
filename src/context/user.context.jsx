import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

// create context. this is where the state lives.
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const value = { currentUser, setCurrentUser };

    useEffect(() => { // useEffect is used to call the function once when the component is mounted.
        const unsubscribe = onAuthStateChangedListener((user) => { // Listen for changes in the authentication state.
            if (user) { // If the user is authenticated.
                createUserDocumentFromAuth(user); // Create a user document from the authentication object.
            }
            setCurrentUser(user); // Set the current user to the user authentication object.
        });
        return unsubscribe; // Return the unsubscribe function to stop listening for changes in the authentication state.
    }, []);

    // provide the context to the app. this is where the state is actually being used. 
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
