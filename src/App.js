import React from "react";

import { Switch, Route } from "react-router-dom";
import {connect} from 'react-redux';
import "./App.css";


import Header from "./components/header/header-component";
import ShopPage from "./pages/shop/shop-component";
import HomePage from "./pages/homepage/homepage.component";
import { auth, createUserProfileDocument } from "./firebase/firebase-utils";
import signinandsignup from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";

import { setCurrentUser } from './redux/user/user-actions';

class App extends React.Component {

  //AFTER USING MAPDISPATCHTOPROPS WE DONT NEED THIS

  /*constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }  */


  unsubscribeFromAuth = null;


 // REPLACING this.setstate WITH setcurrentuser so any changes happen action will know it and according the changes will happen

 /*
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
         this.setstate ({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });

          console.log(this.state);
        });
      }

      this.setState({ currentUser: userAuth });
    });
  }*/

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }

      setCurrentUser({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={signinandsignup} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps= dispatch =>({
  setCurrentUser:user => dispatch(setCurrentUser(user))
})
export default connect(null, mapDispatchToProps)(App);
