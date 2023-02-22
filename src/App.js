import React, { Component } from "react";
import { BsFillBasket3Fill } from "react-icons/bs";
import { FcUnlock } from "react-icons/fc";
import { FcAssistant } from "react-icons/fc";
import { FcAbout } from "react-icons/fc";
import "./style/App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="header">
          <div className="logo">
            <img src={require("./logo.jpg")} alt="logo" />
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button>Search</button>
          </div>
          <div className="login-signup">
            <button>Login/Sign Up</button>
          </div>
          <div className="cart">
            <BsFillBasket3Fill className="basket" />
          </div>
        </div>

        <div className="showcase">
          <div className="showcase-text">
            <h1>Shop for your favourite products</h1>
            <p>Deals made easy all year round. Only at Fake Shop.</p>
            <button>Shop Now</button>
          </div>
        </div>

        <div className="Info">
          <div className="info-text">
            <FcUnlock className="info-1" />
            <h1>Secure Transactions</h1>
            <p>
              Feel confident each time you transact with us. GamerProtect comes
              with SSL protection and wide range of payment processors under a
              safe and secured platform.
            </p>
          </div>
          <div className="info-text">
            <FcAssistant className="info-2" />
            <h1>Customer Support</h1>
            <p>
              Get your products delivered to your doorstep in no time. We have
              partnered with the best delivery service providers to ensure that
              your products are delivered to you in the fastest time possible.
            </p>
          </div>
          <div className="info-text">
            <FcAbout className="info-3" />
            <h1>Easy Returns</h1>
            <p>
              Not satisfied with your purchase? No worries. We have a 30-day
              return policy. Just contact our customer support and we will take
              care of the rest.
            </p>
          </div>
        </div>

        <div className="tos">
          <div className="tos-text">
            <p>
              Registered names and trademarks are the copyright and property of
              their respective owners.
            </p>
            <div className="tos-text2">
                <p>© 2023 Fake.com</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
