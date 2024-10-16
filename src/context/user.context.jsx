import { createContext, useState, useEffect, useReducer } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer/reducer.utils";
// create context. this is where the state lives.
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});


const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
}

const INITIAL_STATE = {
    currentUser: null,
}

// this is the reducer. it takes the state and the action and returns the new state.
const userReducer = (state, action) => {
    const { type, payload } = action; // type is the action type, payload is the data.

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return { ...state, currentUser: payload }; // return the new state.
        default:
            throw new Error(`Unhandled type ${type} in userReducer`); // throw an error if the action type is not handled.
    }
}   


export const UserProvider = ({ children }) => {
    // if we want to use useState, we can do it like this:
    // const [currentUser, setCurrentUser] = useState(null);

    // if we want to use useReducer, we can do it like this:
    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

    // this is the action that will be dispatched to the reducer.
    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    }

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
