import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";







// HELPER FUNCTIONS. 
// These functions are used to add, remove, and clear items from the cart.

const addCartItem = (cartItems, productToAdd) => {
    // Check if the product already exists in the cart.
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
    if (existingCartItem) {
        // If it does, increment the quantity of that product.
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem);
    }
    // If it doesn't, add the product to the cart with a quantity of 1.
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
    // Check if the product exists in the cart.
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);
    // If the quantity is 1, remove the product from the cart.
    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }
    // If the quantity is greater than 1, decrement the quantity of that product.
    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem);
};

const clearCartItem = (cartItems, cartItemToClear) => {
    // Remove the product from the cart.
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartCount: 0,
    removeItemFromCart: () => { },
    cartTotal: 0,
    setCartItems: () => { },
    clearItemFromCart: () => { },
});

// to migrate to reducer we need to do the following:
// 1. create a reducer function
// 2. create a initial state
// 3. create a dispatch function
// 4. create a dispatch function for each action

const INITIAL_STATE = {
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
    isCartOpen: false,
}

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}


// CART REDUCER.
// This function is used to update the state of the cart.
// It takes in the state and the action and returns the new state.
// The state is the current state of the cart.
// The action is the action that is being performed.
const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return { ...state, ...payload };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return { ...state, isCartOpen: payload };
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
}


// CART PROVIDER.
// This component provides the cart context to the children components.
// It uses the useReducer hook to manage the state of the cart.
// It also uses the cartReducer function to update the state of the cart.
// It also uses the cartContext to provide the cart context to the children components.

export const CartProvider = ({ children }) => {
    /*
    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);



    // // Calculate the total number of items in the cart.
    // useEffect(() => {
    //     // Calculate the total number of items in the cart.
    //     // The reduce function is used to sum up the quantity of each item in the cart.
    //     const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    //     setCartCount(newCartCount);
    // }, [cartItems]);

    // // Calculate the total price of the items in the cart.
    // useEffect(() => {
    //     // Calculate the total price of the items in the cart.
    //     // The reduce function is used to sum up the price of each item in the cart.
    //     const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    //     setCartTotal(newCartTotal);
    // }, [cartItems]);
    */


    // userReducer hook to manage the state of the cart.
    // It takes in the cartReducer function and the initial state.
    // It returns the state and the dispatch function.
    // The dispatch function is used to dispatch actions to the reducer.
    const [{ cartItems, cartCount, cartTotal, isCartOpen }, dispatch] = useReducer(cartReducer, INITIAL_STATE);


    // This function is used to update the state of the cart.
    // It takes in the new cart items and updates the cart count and cart total.
    // It then dispatches the new cart items to the reducer.
    const updateCartItemsReducer = (newCartItems) => {

        // Calculate the total number of items in the cart.
        // The reduce function is used to sum up the quantity of each item in the cart.
        // The initial value is 0.
        const newCartCount = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity, 0);

        // Calculate the total price of the items in the cart.
        // The reduce function is used to sum up the price of each item in the cart.
        // The initial value is 0.
        const newCartTotal = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

        // Dispatch the new cart items to the reducer.
        // The createAction function is used to create an action.
        // The action is then dispatched to the reducer
        // it takes in the type and the payload.
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { cartItems: newCartItems, cartCount: newCartCount, cartTotal: newCartTotal }));
    }

    const addItemToCart = (productToAdd) => {
        // Add the product to the cart.
        const newCartItems = (addCartItem(cartItems, productToAdd));
        updateCartItemsReducer(newCartItems);
    };

    const removeItemFromCart = (cartItemToRemove) => {
        // Remove the product from the cart.
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    };

    const clearItemFromCart = (cartItemToClear) => {
        // Remove the product from the cart.
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    };

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    };

    // Provide the cart context to the children components.
    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, removeItemFromCart, cartTotal, clearItemFromCart };

    // Return the cart context provider with the value.
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

