import React from "react";

export default  class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="logo">
          <img src={("../img/logo.jpg")} alt="logo" />
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." onChange={this.props.handelChange} />
          <button>Search</button>
        </div>
        <div className="login-signup">
          <button>Login/Sign Up</button>
        </div>
        <div className="cart">
          <img src={("C:/nodejs_projects/paypal/client/cart-icon.jpg")} alt="cart" />
        </div>
      </div>
    );
  }
}
