import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import './navigation.styles.scss';
import { UserContext } from "../../context/user.context";
import { ReactComponent as SwedLogo } from '../../assets/clothing_store_logo_for_website_that_represent_my_last_name_swed_more.svg'
import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext); // Destructuring the user context to get the currentUser.

  // Sign out the user from the authentication and set the current user to null.
  const signOutHandler = async () => {
    await signOutUser(); // Sign out the user from the authentication.
    setCurrentUser(null); // Set the current user to null.
  }
  return (
    <Fragment> {/** Fragment is used to wrap the child elements without adding extra nodes to the DOM. It is a generic wrapper component. */}
      <div className="navigation">
        <Link className="logo-container" to="/"> {/** Link is used to navigate to the specified path. its like an anchor tag but it has more functionality to takes advantage of react router */}
          <SwedLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          {currentUser ? (
            <Link className="nav-link" to="/auth" onClick={signOutHandler}>
              Sign Out
            </Link>
          ) : (
            <Link className="nav-link" to="/auth">
              Sign In
            </Link>
          )}
        </div>

      </div>
      <Outlet /> {/** Outlet is used to render the child routes */}
    </Fragment>
  )
}

export default Navigation;
