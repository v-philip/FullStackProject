import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css"
import "./css/App.css"

import Register from "./components/Register"
import ResetDatabase from "./components/ResetDatabase"
import Login from "./components/Login"
import Logout from "./components/Logout"
import AddCar from "./components/AddCar"
import EditCar from "./components/EditCar"
import DeleteCar from "./components/DeleteCar"
import EditProduct from "./components/EditProduct"
import User from "./components/User"
import Cart from "./components/Cart"
// import DisplayAllCars from "./components/DisplayAllCars"
import LoggedInRoute from "./components/LoggedInRoute"
import BuyCar from "./components/BuyCar"
import PayPalMessage from "./components/PayPalMessage"
import ProductPage from "./components/ProductPage"
import SeeMore from "./components/SeeMore"
import Header from "./components/Header"
import DeleteProduct from "./components/DeleteProduct"
import Footer from "./components/Footer"
// import ProductCard from "./components/ProductCard"

import {ACCESS_LEVEL_GUEST} from "./config/global_constants"


if (typeof localStorage.accessLevel === "undefined")
{
    localStorage.name = "GUEST"
    localStorage.accessLevel = ACCESS_LEVEL_GUEST
    localStorage.token = null
    localStorage.profilePhoto = null
}

    
export default class App extends Component 
{
    render() 
    {
        return (

            <BrowserRouter>
                <Header />
                <Switch>
                    <Route exact path="/Register" component={Register} />
                    <Route exact path="/ResetDatabase" component={ResetDatabase} />                    
                    <Route exact path="/" component={ProductPage} />
                    <Route exact path="/Login" component={Login} />
                    <Route exact path="/BuyCar/:id" component={BuyCar} />
                    <Route exact path="/SeeMore/:id" component={SeeMore} />
                    <Route exact path="/PayPalMessage/:messageType/:payPalPaymentID" component={PayPalMessage}/>                     
                    <LoggedInRoute exact path="/Logout" component={Logout} />
                    <LoggedInRoute exact path="/User" component={User} />
                    <LoggedInRoute exact path="/AddCar" component={AddCar} />
                    <LoggedInRoute exact path="/Cart" component={Cart} />
                    <LoggedInRoute exact path="/EditCar/:id" component={EditCar} />
                    <LoggedInRoute exact path="/EditProduct/:id" component={EditProduct} />
                    <LoggedInRoute exact path="/DeleteProduct/:id" component={DeleteProduct} />
                    <Route exact path="/ProductPage" component={ProductPage}/> 
                    <Route path="*" component={ProductPage}/>                            
                </Switch>
                <Footer />
            </BrowserRouter>
        )
    }
}