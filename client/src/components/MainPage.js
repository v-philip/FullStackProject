import React, { Component } from "react";

import {Link} from "react-router-dom"

import axios from "axios"

import CarTable from "./CarTable"
import Logout from "./Logout"
export default class MainPage extends Component  {



  
  render() {
    return (
      <div className="main-body">
        <div className="showcase">
          <div className="showcase-text">
            <h1>Shop for your favourite products</h1>
            <p>Deals made easy all year round. Only at Fake Shop.</p>
            <button>Shop Now</button>
          </div>
        </div>

        <div className="Info">
          <div className="info-text">
            <h1>Secure Transactions</h1>
            <p>
              Feel confident each time you transact with us. GamerProtect comes
              with SSL protection and wide range of payment processors under a
              safe and secured platform.
            </p>
          </div>
          <div className="info-text">
            <h1>Customer Support</h1>
            <p>
              Get your products delivered to your doorstep in no time. We have
              partnered with the best delivery service providers to ensure that
              your products are delivered to you in the fastest time possible.
            </p>
          </div>
          <div className="info-text">
            <h1>Easy Returns</h1>
            <p>
              Not satisfied with your purchase? No worries. We have a 30-day
              return policy. Just contact our customer support and we will take
              care of the rest.Contact our support team for more information.
            </p>
          </div>
        </div>
      </div>
    );
  }
}


