import { createContext, useState, useEffect } from "react";


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


// CART PROVIDER.
// This component provides the cart context to the children components.
export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);



    // Calculate the total number of items in the cart.
    useEffect(() => {
        // Calculate the total number of items in the cart.
        // The reduce function is used to sum up the quantity of each item in the cart.
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    // Calculate the total price of the items in the cart.
    useEffect(() => {
        // Calculate the total price of the items in the cart.
        // The reduce function is used to sum up the price of each item in the cart.
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        // Add the product to the cart.
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemFromCart = (cartItemToRemove) => {
        // Remove the product from the cart.
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    };

    const clearItemFromCart = (cartItemToClear) => {
        // Remove the product from the cart.
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    };

    // Provide the cart context to the children components.
    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, removeItemFromCart, cartTotal, setCartItems, clearItemFromCart };

    // Return the cart context provider with the value.
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

