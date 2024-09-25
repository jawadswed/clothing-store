import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
import './navigation.styles.scss';

import {ReactComponent as SwedLogo} from '../../../assets/clothing_store_logo_for_website_that_represent_my_last_name_swed_more.svg' 
import {ReactComponent as CrownLogo} from '../../../assets/crown.svg'
const Navigation = () => {
  return (
    <Fragment> {/** Fragment is used to wrap the child elements without adding extra nodes to the DOM. It is a generic wrapper component. */}
      <div className="navigation">
        <Link className="logo-container" to="/"> {/** Link is used to navigate to the specified path. its like an anchor tag but it has more functionality to takes advantage of react router */}
          <SwedLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            <span>Shop</span>
          </Link>
        </div>
      </div>
      <Outlet /> {/** Outlet is used to render the child routes */}
    </Fragment>
  )
}

export default Navigation;
