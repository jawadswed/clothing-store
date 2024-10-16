import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext, useState } from "react";
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';
import { UserContext } from "../../context/user.context";
import { ReactComponent as SwedLogo } from '../../assets/clothing_store_logo_for_website_that_represent_my_last_name_swed_more.svg'
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../context/cart.context";

const Navigation = () => {
  const { currentUser } = useContext(UserContext); // Destructuring the user context to get the currentUser.
  const { isCartOpen } = useContext(CartContext);
 


  // Sign out the user from the authentication and set the current user to null.
  const signOutHandler = async () => {
    await signOutUser(); // Sign out the user from the authentication.
  }


  return (
    <Fragment> {/** Fragment is used to wrap the child elements without adding extra nodes to the DOM. It is a generic wrapper component. */}
      <NavigationContainer>
        <LogoContainer to="/"> {/** Link is used to navigate to the specified path. its like an anchor tag but it has more functionality to takes advantage of react router */}
          <SwedLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">
            Shop
          </NavLink>
          {currentUser ? (
            <NavLink to="/auth" onClick={signOutHandler}>
              Sign Out
            </NavLink>
          ) : (
            <NavLink to="/auth">
              Sign In
            </NavLink>
          )}
          <CartIcon  />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet /> {/** Outlet is used to render the child routes */}
    </Fragment>
  )
}

export default Navigation;
