import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {SERVER_HOST} from "../config/global_constants"

export default class AddProduct extends Component
{
    constructor(props)
    {
        this.state={product : []
        }

    }

    componentDidMount(){
    
        axios.get(`${SERVER_HOST}/cars/${this.props.match.params.id}`, {headers:{"authorization":localStorage.token}})
        .then(res => 
        {     
            this.setState({
                product: res.data
            })            
        })
        .catch(err => 
        {
            // do nothing
        })}
    render()
    {
        return (
            <div>
                <h1>Product Details</h1>
                <h2>{this.state.product.title}</h2>
                <h2>{this.state.product.brand}</h2>
                <h2>{this.state.product.rating}</h2>
                <h2>{this.state.product.price}</h2>
                <h2>{this.state.product.description}</h2>
                <h2>{this.state.product.category}</h2>
                <h2>{this.state.product.image}</h2>
            </div>
        )
        
    }

}