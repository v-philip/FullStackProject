import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  ACCESS_LEVEL_GUEST,
  ACCESS_LEVEL_ADMIN,
  SERVER_HOST,
} from "../config/global_constants";
export default class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="logo">
        <Link  to={"/ProductPage"}><img src={("../img/logo.jpg")} alt="logo"  /></Link>
        </div>
        <ul>
          <li>
            <Link className="green-button" to={"/Login"}>
              Login
            </Link>
          </li>
          <li>
            <Link className="blue-button" to={"/Register"}>
              Register
            </Link>
          </li>

          {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? (
            <li>
              <Link className="red-button" to={"/ResetDatabase"}>
                Reset Database
              </Link>
            </li>
          ) : null}
        </ul>
        <div className="cart">
        <Link to={"/Cart"}><img src={("C:/nodejs_projects/paypal/client/cart-icon.jpg")} alt="cart" /> </Link>

{
          localStorage.accessLevel > ACCESS_LEVEL_GUEST 
          ? <>
              {
                  localStorage.profilePhoto !== "null" 
                   ? //<img onClick={<Redirect to="/User"/>}id="profilePhoto" src={`data:;base64,${localStorage.profilePhoto}`} alt=""/>

                  <Link to="/User"><img id="profilePhoto" src={`data:;base64,${localStorage.profilePhoto}`} alt=""/></Link>
                  : null
              }                        

              </>
          : <div>
              {/* <Link className="green-button" to={"/Login"}>Login</Link>
              <Link className="blue-button" to={"/Register"}>Register</Link>  
              <Link className="red-button" to={"/ResetDatabase"}>Reset Database</Link>   */}
              <br/><br/><br/></div>
      }
        </div>
      </div>
    );
  }
}
