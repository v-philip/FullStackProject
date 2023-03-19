
import React, {Component} from "react"
import {Link} from "react-router-dom"
import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"
export default  class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="logo">
          <img src={("../img/logo.jpg")} alt="logo" />
        </div> 
        <ul>
          <li><Link className="green-button" to={"/Login"}>Login</Link></li>
          <li><Link className="blue-button" to={"/Register"}>Register</Link></li>  
            
          {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <li><Link className="red-button" to={"/ResetDatabase"}>Reset Database</Link></li> : null}
        </ul>
        <div className="cart">
          <img src={("C:/nodejs_projects/paypal/client/cart-icon.jpg")} alt="cart" />
          <Link to={"/Cart"}>Go to </Link>
        </div>
      </div>
    );
  }
}
