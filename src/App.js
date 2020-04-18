import React from "react";
import ShopPage from "./pages/shop/shop-component";
import HomePage from "./pages/homepage/homepage.component";
import { Route } from "react-router-dom";
import "./App.css";

// eslint-disable-next-line


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop" component={ShopPage} />
      </div>
    );
  }
}
export default App;
