import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {SERVER_HOST} from "../config/global_constants"
import cart from "../../../server/models/cart"

export default class Cart extends component{
    constructor(props){
        super(props)
        this.state={
            cart:[]
        }
    }

    componentDidMount(){
        axios.get(`${SERVER_HOST}/cart`, {headers:{"authorization":localStorage.token}})
        .then(res => 
        {     
            this.setState({
                cart: res.data
            })            
        })
        .catch(err => 
        {
            // do nothing
        })
    }

    render(){

        return(
            cart.map((item, index) => {
                <div>
                    <h1>{item.title}</h1>
                    <h2>{item.brand}</h2>
                    <h2>{item.rating}</h2>
                    <h2>{item.price}</h2>
                </div>

            })
        )
    }
}