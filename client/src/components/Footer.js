import React, {Component} from "react"
import {Link} from "react-router-dom"
import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"
export default  class Footer extends React.Component {
  render() {
    return (
        
        <footer className="footer">
        <div className="container">
          <div className="smallAboutUs">
            <div className="aboutUs">
              <h3>About Us</h3>
              <p>We are a leading e-commerce website that offers a wide range of products at competitive prices.</p>
            </div>
            <div className="quickLinks">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/products">Laptops</Link></li>
                <li><Link to="/products">SkinCare</Link></li>
                <li><Link to="/products">SmartPhone</Link></li>
              </ul>
            </div>
            <div className="connectWithUs">
              <h3>Connect With Us</h3>
              <ul>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
      
    