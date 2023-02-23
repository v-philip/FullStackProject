import React from "react";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="logo">
          <img src={require("../img/logo.jpg")} alt="logo" />
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button>Search</button>
        </div>
        <div className="login-signup">
          <button>Login/Sign Up</button>
        </div>
        <div className="cart">
          <img src={require("../img/cart-icon.png")} alt="cart" />
        </div>
      </div>
    );
  }
}

export default Header;
