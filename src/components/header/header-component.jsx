import React from "react";
import { Link } from "react-router-dom";

import "./header-component-styles.scss";
import { ReactComponent as Logo } from "../../assets/crown.svg";

import { auth } from "./../../firebase/firebase-utils";
import { connect } from "react-redux";
const Header = ({ currentUser }) => (
  <div className="header">
    <Link className="logo-cotainer" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        Shop
      </Link>

      <Link className="option" to="/contact">
        Contact
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
    </div>
  </div>
);

const mapStateTOProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect()(Header);
